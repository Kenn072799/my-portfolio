using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyPortfolioAdmin.Filters;
using MyPortfolioAdmin.Models.Common;
using MyPortfolioAdmin.Models.DTOs;
using MyPortfolioAdmin.Models.Entities;

namespace MyPortfolioAdmin.Controllers;

[ApiController]
[Route("api/certifications")]
public class CertificationsController : ControllerBase
{
    private readonly PortfolioDbContext _db;
    private readonly ILogger<CertificationsController> _logger;

    public CertificationsController(PortfolioDbContext db, ILogger<CertificationsController> logger)
    {
        _db = db;
        _logger = logger;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] PaginationParams pagination)
    {
        var query = _db.Certifications.OrderByDescending(c => c.IssueDate);
        var totalCount = await query.CountAsync();
        var data = await query
            .Skip((pagination.Page - 1) * pagination.PageSize)
            .Take(pagination.PageSize)
            .ToListAsync();

        return Ok(new PagedResult<Certification>
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
        var certification = await _db.Certifications.FindAsync(id);

        if (certification is null)
        {
            _logger.LogWarning("Certification not found: {Id}", id);
            return NotFound();
        }

        return Ok(certification);
    }

    private static DateTime ToUtc(DateTime dt) =>
        dt.Kind == DateTimeKind.Utc ? dt : DateTime.SpecifyKind(dt, DateTimeKind.Utc);

    private static DateTime? ToUtc(DateTime? dt) =>
        dt.HasValue ? ToUtc(dt.Value) : null;

    [HttpPost]
    [ApiKey]
    public async Task<IActionResult> Create([FromBody] CertificationRequest request)
    {
        var certification = new Certification
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Issuer = request.Issuer,
            Description = request.Description,
            IssueDate = ToUtc(request.IssueDate),
            CredentialUrl = request.CredentialUrl,
            CreatedAt = DateTime.UtcNow
        };

        _db.Certifications.Add(certification);
        await _db.SaveChangesAsync();

        _logger.LogInformation("Certification created: {Name} ({Id})", certification.Name, certification.Id);

        return CreatedAtAction(nameof(GetById), new { id = certification.Id }, certification);
    }

    [HttpPut("{id:guid}")]
    [ApiKey]
    public async Task<IActionResult> Update(Guid id, [FromBody] CertificationRequest request)
    {
        var certification = await _db.Certifications.FindAsync(id);

        if (certification is null)
        {
            _logger.LogWarning("Certification not found for update: {Id}", id);
            return NotFound();
        }

        certification.Name = request.Name;
        certification.Issuer = request.Issuer;
        certification.Description = request.Description;
        certification.IssueDate = ToUtc(request.IssueDate);
        certification.CredentialUrl = request.CredentialUrl;

        await _db.SaveChangesAsync();

        _logger.LogInformation("Certification updated: {Name} ({Id})", certification.Name, certification.Id);

        return Ok(certification);
    }

    [HttpDelete("{id:guid}")]
    [ApiKey]
    public async Task<IActionResult> Delete(Guid id)
    {
        var certification = await _db.Certifications.FindAsync(id);

        if (certification is null)
        {
            _logger.LogWarning("Certification not found for delete: {Id}", id);
            return NotFound();
        }

        _db.Certifications.Remove(certification);
        await _db.SaveChangesAsync();

        _logger.LogInformation("Certification deleted: ({Id})", id);

        return NoContent();
    }
}
