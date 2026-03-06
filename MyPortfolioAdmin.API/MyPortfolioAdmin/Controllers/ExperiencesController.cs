using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyPortfolioAdmin.Filters;
using MyPortfolioAdmin.Models.Common;
using MyPortfolioAdmin.Models.DTOs;
using MyPortfolioAdmin.Models.Entities;

namespace MyPortfolioAdmin.Controllers;

[ApiController]
[Route("api/experiences")]
public class ExperiencesController : ControllerBase
{
    private readonly PortfolioDbContext _db;
    private readonly ILogger<ExperiencesController> _logger;

    public ExperiencesController(PortfolioDbContext db, ILogger<ExperiencesController> logger)
    {
        _db = db;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] PaginationParams pagination)
    {
        var query = _db.Experiences.OrderByDescending(e => e.StartDate);
        var totalCount = await query.CountAsync();
        var data = await query
            .Skip((pagination.Page - 1) * pagination.PageSize)
            .Take(pagination.PageSize)
            .ToListAsync();

        return Ok(new PagedResult<Experience>
        {
            Data = data,
            Page = pagination.Page,
            PageSize = pagination.PageSize,
            TotalCount = totalCount
        });
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var experience = await _db.Experiences.FindAsync(id);

        if (experience is null)
        {
            _logger.LogWarning("Experience not found: {Id}", id);
            return NotFound();
        }

        return Ok(experience);
    }

    private static DateTime ToUtc(DateTime dt) =>
        dt.Kind == DateTimeKind.Utc ? dt : DateTime.SpecifyKind(dt, DateTimeKind.Utc);

    private static DateTime? ToUtc(DateTime? dt) =>
        dt.HasValue ? ToUtc(dt.Value) : null;

    [HttpPost]
    [ApiKey]
    public async Task<IActionResult> Create([FromBody] ExperienceRequest request)
    {
        var experience = new Experience
        {
            Id = Guid.NewGuid(),
            Title = request.Title,
            Company = request.Company,
            Location = request.Location,
            StartDate = ToUtc(request.StartDate),
            EndDate = ToUtc(request.EndDate),
            Description = request.Description,
            Technologies = request.Technologies,
            Current = request.Current
        };

        _db.Experiences.Add(experience);
        await _db.SaveChangesAsync();

        _logger.LogInformation("Experience created: {Title} at {Company} ({Id})", experience.Title, experience.Company, experience.Id);

        return CreatedAtAction(nameof(GetById), new { id = experience.Id }, experience);
    }

    [HttpPut("{id:guid}")]
    [ApiKey]
    public async Task<IActionResult> Update(Guid id, [FromBody] ExperienceRequest request)
    {
        var experience = await _db.Experiences.FindAsync(id);

        if (experience is null)
        {
            _logger.LogWarning("Experience not found for update: {Id}", id);
            return NotFound();
        }

        experience.Title = request.Title;
        experience.Company = request.Company;
        experience.Location = request.Location;
        experience.StartDate = ToUtc(request.StartDate);
        experience.EndDate = ToUtc(request.EndDate);
        experience.Description = request.Description;
        experience.Technologies = request.Technologies;
        experience.Current = request.Current;

        await _db.SaveChangesAsync();

        _logger.LogInformation("Experience updated: {Title} at {Company} ({Id})", experience.Title, experience.Company, experience.Id);

        return Ok(experience);
    }

    [HttpDelete("{id:guid}")]
    [ApiKey]
    public async Task<IActionResult> Delete(Guid id)
    {
        var experience = await _db.Experiences.FindAsync(id);

        if (experience is null)
        {
            _logger.LogWarning("Experience not found for delete: {Id}", id);
            return NotFound();
        }

        _db.Experiences.Remove(experience);
        await _db.SaveChangesAsync();

        _logger.LogInformation("Experience deleted: ({Id})", id);

        return NoContent();
    }
}
