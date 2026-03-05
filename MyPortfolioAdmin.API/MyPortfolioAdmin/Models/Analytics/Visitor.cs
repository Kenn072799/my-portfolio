namespace MyPortfolioAdmin.Models.Analytics;

public class Visitor
{
    public Guid Id { get; set; }

    public string? IpAddress { get; set; }

    public string? Country { get; set; }

    public string? UserAgent { get; set; }

    public DateTime VisitedAt { get; set; }
}
