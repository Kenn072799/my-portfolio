namespace MyPortfolioAdmin.Models.Analytics;

public class ChatQuestion
{
    public Guid Id { get; set; }

    public string Question { get; set; } = null!;

    public int Count { get; set; }

    public DateTime LastAsked { get; set; }
}
