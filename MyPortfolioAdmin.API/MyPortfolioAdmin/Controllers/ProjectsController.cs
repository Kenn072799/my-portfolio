using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyPortfolioAdmin.Filters;
using MyPortfolioAdmin.Models.Common;
using MyPortfolioAdmin.Models.DTOs;
using MyPortfolioAdmin.Models.Entities;

namespace MyPortfolioAdmin.Controllers;

[ApiController]
[Route("api/projects")]
public class ProjectsController : ControllerBase
{
    private readonly PortfolioDbContext _db;
    private readonly ILogger<ProjectsController> _logger;

    public ProjectsController(PortfolioDbContext db, ILogger<ProjectsController> logger)
    {
        _db = db;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] PaginationParams pagination)
    {
        var query = _db.Projects.OrderByDescending(p => p.CreatedAt);
        var totalCount = await query.CountAsync();
        var data = await query
            .Skip((pagination.Page - 1) * pagination.PageSize)
            .Take(pagination.PageSize)
            .ToListAsync();

        return Ok(new PagedResult<Project>
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
        var project = await _db.Projects.FindAsync(id);

        if (project is null)
        {
            _logger.LogWarning("Project not found: {Id}", id);
            return NotFound();
        }

        return Ok(project);
    }

    [HttpPost]
    [ApiKey]
    public async Task<IActionResult> Create([FromBody] ProjectRequest request)
    {
        var project = new Project
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Description = request.Description,
            LongDescription = request.LongDescription,
            Technologies = request.Technologies,
            RepositoryUrl = request.RepositoryUrl,
            DemoUrl = request.DemoUrl,
            Featured = request.Featured,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _db.Projects.Add(project);
        await _db.SaveChangesAsync();

        _logger.LogInformation("Project created: {Name} ({Id})", project.Name, project.Id);

        return CreatedAtAction(nameof(GetById), new { id = project.Id }, project);
    }

    [HttpPut("{id:guid}")]
    [ApiKey]
    public async Task<IActionResult> Update(Guid id, [FromBody] ProjectRequest request)
    {
        var project = await _db.Projects.FindAsync(id);

        if (project is null)
        {
            _logger.LogWarning("Project not found for update: {Id}", id);
            return NotFound();
        }

        project.Name = request.Name;
        project.Description = request.Description;
        project.LongDescription = request.LongDescription;
        project.Technologies = request.Technologies;
        project.RepositoryUrl = request.RepositoryUrl;
        project.DemoUrl = request.DemoUrl;
        project.Featured = request.Featured;
        project.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        _logger.LogInformation("Project updated: {Name} ({Id})", project.Name, project.Id);

        return Ok(project);
    }

    [HttpDelete("{id:guid}")]
    [ApiKey]
    public async Task<IActionResult> Delete(Guid id)
    {
        var project = await _db.Projects.FindAsync(id);

        if (project is null)
        {
            _logger.LogWarning("Project not found for delete: {Id}", id);
            return NotFound();
        }

        _db.Projects.Remove(project);
        await _db.SaveChangesAsync();

        _logger.LogInformation("Project deleted: {Name} ({Id})", project.Name, project.Id);

        return NoContent();
    }
}
