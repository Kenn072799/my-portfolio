using Microsoft.EntityFrameworkCore;
using MyPortfolioAdmin.Models.Analytics;
using MyPortfolioAdmin.Models.Entities;

namespace MyPortfolioAdmin.Data;

public class PortfolioDbContext : DbContext
{
    public PortfolioDbContext(DbContextOptions<PortfolioDbContext> options) : base(options)
    {
    }

    public DbSet<Project> Projects { get; set; }

    public DbSet<Experience> Experiences { get; set; }

    public DbSet<Skill> Skills { get; set; }

    public DbSet<Certification> Certifications { get; set; }

    public DbSet<ChatQuestion> ChatQuestions { get; set; }

    public DbSet<Visitor> Visitors { get; set; }
}
