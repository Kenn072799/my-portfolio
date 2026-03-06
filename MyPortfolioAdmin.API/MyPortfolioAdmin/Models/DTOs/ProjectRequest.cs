using System.ComponentModel.DataAnnotations;

namespace MyPortfolioAdmin.Models.DTOs;

public class ProjectRequest
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; } = null!;

    [StringLength(300)]
    public string? Description { get; set; }

    public string? LongDescription { get; set; }

    public List<string>? Technologies { get; set; }

    [Url]
    public string? RepositoryUrl { get; set; }

    [Url]
    public string? DemoUrl { get; set; }

    public bool Featured { get; set; }
}
