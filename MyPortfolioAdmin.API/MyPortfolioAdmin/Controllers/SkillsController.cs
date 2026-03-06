using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyPortfolioAdmin.Filters;
using MyPortfolioAdmin.Models.Common;
using MyPortfolioAdmin.Models.DTOs;
using MyPortfolioAdmin.Models.Entities;

namespace MyPortfolioAdmin.Controllers;

[ApiController]
[Route("api/skills")]
public class SkillsController : ControllerBase
{
    private readonly PortfolioDbContext _db;
    private readonly ILogger<SkillsController> _logger;

    public SkillsController(PortfolioDbContext db, ILogger<SkillsController> logger)
    {
        _db = db;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] PaginationParams pagination)
    {
        var query = _db.Skills.OrderBy(s => s.Category).ThenBy(s => s.Name);
        var totalCount = await query.CountAsync();
        var data = await query
            .Skip((pagination.Page - 1) * pagination.PageSize)
            .Take(pagination.PageSize)
            .ToListAsync();

        return Ok(new PagedResult<Skill>
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
        var skill = await _db.Skills.FindAsync(id);

        if (skill is null)
        {
            _logger.LogWarning("Skill not found: {Id}", id);
            return NotFound();
        }

        return Ok(skill);
    }

    [HttpPost]
    [ApiKey]
    public async Task<IActionResult> Create([FromBody] SkillRequest request)
    {
        var skill = new Skill
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Category = request.Category,
            Proficiency = request.Proficiency,
            CreatedAt = DateTime.UtcNow
        };

        _db.Skills.Add(skill);
        await _db.SaveChangesAsync();

        _logger.LogInformation("Skill created: {Name} ({Id})", skill.Name, skill.Id);

        return CreatedAtAction(nameof(GetById), new { id = skill.Id }, skill);
    }

    [HttpPut("{id:guid}")]
    [ApiKey]
    public async Task<IActionResult> Update(Guid id, [FromBody] SkillRequest request)
    {
        var skill = await _db.Skills.FindAsync(id);

        if (skill is null)
        {
            _logger.LogWarning("Skill not found for update: {Id}", id);
            return NotFound();
        }

        skill.Name = request.Name;
        skill.Category = request.Category;
        skill.Proficiency = request.Proficiency;

        await _db.SaveChangesAsync();

        _logger.LogInformation("Skill updated: {Name} ({Id})", skill.Name, skill.Id);

        return Ok(skill);
    }

    [HttpDelete("{id:guid}")]
    [ApiKey]
    public async Task<IActionResult> Delete(Guid id)
    {
        var skill = await _db.Skills.FindAsync(id);

        if (skill is null)
        {
            _logger.LogWarning("Skill not found for delete: {Id}", id);
            return NotFound();
        }

        _db.Skills.Remove(skill);
        await _db.SaveChangesAsync();

        _logger.LogInformation("Skill deleted: {Name} ({Id})", skill.Name, skill.Id);

        return NoContent();
    }
}
