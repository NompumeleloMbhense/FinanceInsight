using Microsoft.AspNetCore.Mvc;
using FinanceInsight.Api.Models;

namespace FinanceInsight.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{

    [HttpGet]
    public IActionResult GetExpenses()
    {
        var expense = new Expense
        {
            Id = Guid.NewGuid(),
            Description = "Netflix",
            Amount = 199.00m,
            Category = "Entertainment",
            Date = new DateTime(2026, 8, 31)
        };

        return Ok(expense);
    }
}