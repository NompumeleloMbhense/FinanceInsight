using FinanceInsight.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FinanceInsight.Api.Data;

public class FinanceDbContext : DbContext
{
    public FinanceDbContext(DbContextOptions<FinanceDbContext> options)
        : base(options)
    {
    }

    public DbSet<Expense> Expenses { get; set; }
}