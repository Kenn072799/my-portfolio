namespace MyPortfolioAdmin.Models.Entities;

public class Project
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string LongDescription { get; set; } = null!;

    public List<string>? Technologies { get; set; }

    public string? RepositoryUrl { get; set; }

    public string? DemoUrl { get; set; }

    public bool Featured { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}
