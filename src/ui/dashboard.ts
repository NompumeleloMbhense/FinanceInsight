import type { Budget } from "../models/Budget";
import type { Expense } from "../models/Expense";

// Renders the dashboard summary as an HTML string
export function renderDashboard(expenses: Expense[], budget: Budget): string {
  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBudget = budget.amount - totalSpent;

  return `
     <h2>Dashboard Summary</h2>

        <p>
            Monthly Budget:
            R${budget.amount.toFixed(2)}
        </p>

        <p>
            Total Spent:
            R${totalSpent.toFixed(2)}
        </p>

        <p>
            Remaining Budget:
            R${remainingBudget.toFixed(2)}
        </p>
    `;
}
