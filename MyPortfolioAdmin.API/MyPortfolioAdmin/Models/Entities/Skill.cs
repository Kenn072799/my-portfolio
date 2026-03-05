namespace MyPortfolioAdmin.Models.Entities;
public class Skill
{
    public Guid Id { get; set; }

    public string Name { get; set; } = null!;

    public string Category { get; set; } = null!;

    public int Proficiency { get; set; }

    public DateTime CreatedAt { get; set; }
}
