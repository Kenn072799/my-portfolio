using System.ComponentModel.DataAnnotations;

namespace MyPortfolioAdmin.Models.DTOs;

public class ChatRequest
{
    [Required]
    [StringLength(1000, MinimumLength = 1)]
    public string Message { get; set; } = null!;
}
