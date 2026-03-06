using System.ComponentModel.DataAnnotations;

namespace MyPortfolioAdmin.Models.DTOs;

public class ExperienceRequest
{
    [Required]
    [StringLength(100)]
    public string Title { get; set; } = null!;

    [Required]
    [StringLength(100)]
    public string Company { get; set; } = null!;

    [StringLength(100)]
    public string? Location { get; set; }

    [Required]
    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string? Description { get; set; }

    public List<string>? Technologies { get; set; }

    public bool Current { get; set; }
}
