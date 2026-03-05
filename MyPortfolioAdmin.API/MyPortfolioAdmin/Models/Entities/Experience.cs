namespace MyPortfolioAdmin.Models.Entities;

public class Experience
{
    public Guid Id { get; set; }

    public string Title { get; set; } = null!;

    public string Company { get; set; } = null!;

    public string? Location { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string? Description { get; set; }

    public List<string>? Technologies { get; set; }

    public bool Current { get; set; }
}
