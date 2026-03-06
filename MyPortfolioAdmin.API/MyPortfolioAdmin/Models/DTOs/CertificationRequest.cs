using System.ComponentModel.DataAnnotations;

namespace MyPortfolioAdmin.Models.DTOs;

public class CertificationRequest
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = null!;

    [Required]
    [StringLength(100)]
    public string Issuer { get; set; } = null!;

    [Required]
    public string Description { get; set; } = null!;

    [Required]
    public DateTime IssueDate { get; set; }

    [Url]
    public string? CredentialUrl { get; set; }
}
