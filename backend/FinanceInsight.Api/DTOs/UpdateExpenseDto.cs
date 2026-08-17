using System.ComponentModel.DataAnnotations;

namespace FinanceInsight.Api.DTOs;

public class UpdateExpenseDto
{
    [Required]
    public string Description { get; set; } = string.Empty;

    [Range(0.01, double.MaxValue)]
    public decimal Amount { get; set; }

    [Required]
    public string Category { get; set; } = string.Empty;

    public DateTime Date { get; set; }
}