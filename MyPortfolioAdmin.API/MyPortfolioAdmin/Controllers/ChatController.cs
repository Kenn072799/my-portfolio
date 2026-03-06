using FuzzySharp;
using Markdig;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using MyPortfolioAdmin.Models.Analytics;
using MyPortfolioAdmin.Models.DTOs;
using MyPortfolioAdmin.Services;
using System.Text.RegularExpressions;

namespace MyPortfolioAdmin.Controllers;

[ApiController]
[Route("api/chat")]
public class ChatController : ControllerBase
{
    private readonly PortfolioDbContext _db;
    private readonly GroqService _groq;
    private readonly IMemoryCache _cache;
    private readonly ILogger<ChatController> _logger;

    public ChatController(PortfolioDbContext db, GroqService groq, IMemoryCache cache, ILogger<ChatController> logger)
    {
        _db = db;
        _groq = groq;
        _cache = cache;
        _logger = logger;
    }

    [HttpPost]
    [EnableRateLimiting("ChatPolicy")]
    public async Task<IActionResult> Chat([FromBody] ChatRequest request)
    {
        _logger.LogInformation("Chat request received: {Message}", request.Message);

        try
        {
            var cacheHit = true;
            var context = await _cache.GetOrCreateAsync("portfolio_context", async entry =>
            {
                cacheHit = false;
                entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10);

                _logger.LogInformation("Cache miss - loading portfolio context from database");

                var skills = await _db.Skills.Select(s => s.Name).ToListAsync();
                var projects = await _db.Projects
                    .Select(p => $"{p.Name} - {p.Description}")
                    .ToListAsync();
                var experiences = await _db.Experiences
                    .Select(e => $"{e.Title} at {e.Company}")
                    .ToListAsync();
                var certifications = await _db.Certifications
                    .Select(c => c.Name)
                    .ToListAsync();

                _logger.LogInformation(
                    "Portfolio context loaded - Skills: {SkillCount}, Projects: {ProjectCount}, Experiences: {ExperienceCount}, Certifications: {CertCount}",
                    skills.Count, projects.Count, experiences.Count, certifications.Count);

                return $"""
                Skills:
                {string.Join(", ", skills)}

                Projects:
                {string.Join("\n", projects)}

                Experience:
                {string.Join("\n", experiences)}

                Certifications:
                {string.Join(", ", certifications)}
                """;
            });

            if (cacheHit)
                _logger.LogDebug("Cache hit - using cached portfolio context");

            var reply = await _groq.AskAI(context, request.Message);
            var replyHtml = Markdown.ToHtml(reply, new MarkdownPipelineBuilder().UseAdvancedExtensions().Build());

            var allQuestions = await _db.ChatQuestions.ToListAsync();
            var normalizedInput = Normalize(request.Message);

            var match = allQuestions
                .Select(q => new { Entry = q, Score = Fuzz.TokenSetRatio(normalizedInput, Normalize(q.Question)) })
                .Where(x => x.Score >= 80)
                .MaxBy(x => x.Score);

            if (match is not null)
            {
                match.Entry.Count++;
                match.Entry.LastAsked = DateTime.UtcNow;
                _logger.LogInformation("Similar question matched (Score: {Score}): '{Stored}' ← '{Asked}'", match.Score, match.Entry.Question, request.Message);
            }
            else
            {
                _db.ChatQuestions.Add(new ChatQuestion
                {
                    Id = Guid.NewGuid(),
                    Question = request.Message,
                    Count = 1,
                    LastAsked = DateTime.UtcNow
                });
                _logger.LogInformation("New question tracked: {Question}", request.Message);
            }

            await _db.SaveChangesAsync();

            _logger.LogInformation("Chat reply generated successfully");

            return Ok(new ChatResponse { Reply = replyHtml });
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, "Groq API request failed for message: {Message}", request.Message);
            return StatusCode(502, "AI service is currently unavailable.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unexpected error processing chat request for message: {Message}", request.Message);
            return StatusCode(500, "An unexpected error occurred.");
        }
    }

    private static string Normalize(string text) =>
        Regex.Replace(text.Trim().ToLowerInvariant(), @"[^\w\s]", string.Empty).Trim();
}