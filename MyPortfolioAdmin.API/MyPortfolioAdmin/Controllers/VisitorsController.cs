using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyPortfolioAdmin.Filters;
using MyPortfolioAdmin.Models.Analytics;
using MyPortfolioAdmin.Models.DTOs;
using MyPortfolioAdmin.Services;

namespace MyPortfolioAdmin.Controllers;

[ApiController]
[Route("api/visitors")]
public class VisitorsController : ControllerBase
{
    private readonly PortfolioDbContext _db;
    private readonly IpGeolocationService _geo;
    private readonly ILogger<VisitorsController> _logger;

    public VisitorsController(PortfolioDbContext db, IpGeolocationService geo, ILogger<VisitorsController> logger)
    {
        _db = db;
        _geo = geo;
        _logger = logger;
    }

    [HttpPost]
    public async Task<IActionResult> Track([FromBody] VisitorRequest request)
    {
        // Resolve real IP: check X-Forwarded-For first (reverse proxy), then connection IP
        var ip = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
        if (Request.Headers.TryGetValue("X-Forwarded-For", out var forwarded))
        {
            var firstIp = forwarded.ToString().Split(',')[0].Trim();
            if (!string.IsNullOrEmpty(firstIp))
                ip = firstIp;
        }

        // Resolve country from IP
        var geo = await _geo.LookupAsync(ip);

        var visitor = new Visitor
        {
            Id = Guid.NewGuid(),
            IpAddress = ip,
            Country = geo?.Country,
            UserAgent = request.UserAgent,
            VisitedAt = DateTime.UtcNow
        };

        _db.Visitors.Add(visitor);
        await _db.SaveChangesAsync();

        _logger.LogInformation("Visitor tracked from {Country} ({IpAddress})", visitor.Country, visitor.IpAddress);

        return Ok();
    }

    [HttpGet]
    [ApiKey]
    public async Task<IActionResult> GetAll()
    {
        var visitors = await _db.Visitors
            .OrderByDescending(v => v.VisitedAt)
            .ToListAsync();

        return Ok(visitors);
    }
}
