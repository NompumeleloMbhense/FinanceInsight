import type { Expense } from "../models/Expense";

// Renders the dashboard summary as an HTML string
export function renderDashboard(expenses: Expense[]): string {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return `
     <h2>Dashboard Summary</h2>

        <p><strong>Total Expenses:</strong> R${total.toFixed(2)}</p>

        <p><strong>Number of Expenses:</strong> ${expenses.length}</p>
    `;
}
