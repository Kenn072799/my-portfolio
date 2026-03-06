using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyPortfolioAdmin.Filters;

namespace MyPortfolioAdmin.Controllers;

[ApiController]
[Route("api/analytics")]
[ApiKey]
public class AnalyticsController : ControllerBase
{
    private readonly PortfolioDbContext _db;
    private readonly ILogger<AnalyticsController> _logger;

    public AnalyticsController(PortfolioDbContext db, ILogger<AnalyticsController> logger)
    {
        _db = db;
        _logger = logger;
    }

    [HttpGet("questions")]
    public async Task<IActionResult> GetTopQuestions()
    {
        var questions = await _db.ChatQuestions
            .OrderByDescending(q => q.Count)
            .ToListAsync();

        return Ok(questions);
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary()
    {
        var totalVisitors = await _db.Visitors.CountAsync();
        var totalMessages = await _db.ChatQuestions.SumAsync(q => q.Count);
        var topQuestion = await _db.ChatQuestions
            .OrderByDescending(q => q.Count)
            .FirstOrDefaultAsync();

        _logger.LogInformation("Analytics summary requested");

        return Ok(new
        {
            TotalVisitors = totalVisitors,
            TotalChatMessages = totalMessages,
            TopQuestion = topQuestion?.Question,
            TopQuestionCount = topQuestion?.Count ?? 0
        });
    }
}
