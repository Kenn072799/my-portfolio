namespace MyPortfolioAdmin.Models.Entities;

public class Certification
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Issuer { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateTime IssueDate { get; set; }

    public string? CredentialUrl { get; set; }

    public DateTime CreatedAt { get; set; }
}
