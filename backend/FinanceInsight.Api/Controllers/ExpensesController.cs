using Microsoft.AspNetCore.Mvc;
using FinanceInsight.Api.Models;
using FinanceInsight.Api.Data;
using Microsoft.EntityFrameworkCore;
using FinanceInsight.Api.DTOs;

namespace FinanceInsight.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpensesController : ControllerBase
{
    private readonly FinanceDbContext _context;
    public ExpensesController(FinanceDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetExpenses()
    {
        var expenses = await _context.Expenses.ToListAsync();

        return Ok(expenses);
    }

    [HttpPost]
    public async Task<IActionResult> CreateExpense(CreateExpenseDto dto)
    {
        var expense = new Expense
        {
            Id = Guid.NewGuid(),
            Description = dto.Description,
            Amount = dto.Amount,
            Category = dto.Category,
            Date = dto.Date
        };

        _context.Expenses.Add(expense);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetExpenses),
            new { id = expense.Id },
            expense);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> UpdateExpense(Guid id, UpdateExpenseDto dto)
    {
        var expense = await _context.Expenses.FindAsync(id);

        if (expense is null)
            return NotFound();

        expense.Description = dto.Description;
        expense.Amount = dto.Amount;
        expense.Category = dto.Category;
        expense.Date = dto.Date;

        await _context.SaveChangesAsync();

        return NoContent();
    }


    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> DeleteExpense(Guid id)
    {
        var expense = await _context.Expenses.FindAsync(id);

        if (expense is null)
            return NotFound();

        _context.Expenses.Remove(expense);

        await _context.SaveChangesAsync();

        return NoContent();
    }
}