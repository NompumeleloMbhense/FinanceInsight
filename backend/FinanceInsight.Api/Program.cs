using FinanceInsight.Api.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<FinanceDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("FinanceDb")));


builder.Services.AddControllers();

var app = builder.Build();


app.MapControllers();

app.Run();

