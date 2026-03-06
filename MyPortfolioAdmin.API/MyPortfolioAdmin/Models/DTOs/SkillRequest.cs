using System.ComponentModel.DataAnnotations;

namespace MyPortfolioAdmin.Models.DTOs;

public class SkillRequest
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; } = null!;

    [Required]
    [StringLength(50)]
    public string Category { get; set; } = null!;

    [Range(1, 100)]
    public int Proficiency { get; set; }
}
