using Microsoft.AspNetCore.Mvc;

namespace FinanceInsight.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{
    [HttpGet]
    public IActionResult GetExpenses()
    {
        return Ok("Expenses endpoint is working!");
    }
}