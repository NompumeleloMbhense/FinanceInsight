import type { Budget } from "../models/Budget";
import type { Expense } from "../models/Expense";

// Renders the dashboard summary as an HTML string
export function renderDashboard(expenses: Expense[], budget: Budget): string {
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = budget.amount - totalSpent;
  const percentageSpent =
    budget.amount > 0 ? (totalSpent / budget.amount) * 100 : 0;

  let budgetStatus = "";
  let budgetStatusClass = "";

  if (percentageSpent < 80) {
    budgetStatus = "🟢 Great! You're managing your budget well.";
    budgetStatusClass = "status-good";
  } else if (percentageSpent <= 100) {
    budgetStatus = "🟡 Careful! You're approaching your budget limit.";
    budgetStatusClass = "status-warning";
  } else {
    const overBudget = totalSpent - budget.amount;

    budgetStatus = `🔴 You've exceeded your budget by R${overBudget.toFixed(2)}.`;
    budgetStatusClass = "status-danger";
  }

  return `
        <h2>Dashboard Summary</h2>

        <div class="dashboard-grid">

            <div class="summary-card">
                <span class="summary-title">Monthly Budget</span>
                <span class="summary-value">
                    R${budget.amount.toFixed(2)}
                </span>
            </div>

            <div class="summary-card">
                <span class="summary-title">Total Spent</span>
                <span class="summary-value">
                    R${totalSpent.toFixed(2)}
                </span>
            </div>

            <div class="summary-card">
                <span class="summary-title">Remaining Budget</span>
                <span class="summary-value">
                    R${remainingBudget.toFixed(2)}
                </span>
            </div>

        </div>

        <div class="progress-section">

            <div class="progress-header">
                <span>Budget Used</span>
                <span>${percentageSpent.toFixed(0)}%</span>
            </div>

            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width: ${Math.min(percentageSpent, 100)}%;"
                ></div>

            </div>

        </div>

        <div class="budget-status ${budgetStatusClass}">
            ${budgetStatus}
        </div>
    `;
}
