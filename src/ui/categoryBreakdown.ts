import type { Expense } from "../models/Expense";

export function renderCategoryBreakdown(
  container: HTMLElement,
  expenses: Expense[],
): void {
  if (expenses.length === 0) {
    container.innerHTML = `
            <h2>Category Breakdown</h2>
            <p>No expenses yet</p>
        `;

    return;
  }

  
  // Calculate totals for each category, creating a record where the
  // key is the category and the value is the total amount for that category
  const totals: Record<string, number> = {};

  for (const expense of expenses) {
    totals[expense.category] = (totals[expense.category] ?? 0) + expense.amount;
  }

  container.innerHTML = `
        <h2>Category Breakdown</h2>

        <ul>

            ${Object.entries(totals)
              .map(
                ([category, total]) => `
                        <li>

                            ${category}: R${total.toFixed(2)}

                        </li>
                    `,
              )
              .join("")}

            </ul>
        `;
}
