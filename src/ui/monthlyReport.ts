import type { Expense } from "../models/Expense";

export function renderMonthlyReport(
  container: HTMLElement,
  expenses: Expense[],
): void {
    
  container.innerHTML = `
        <h2>Monthly Report</h2>

        <label>Month</label>

        <select id="monthFilter">
            <option>All Months</option>
        </select>

        <div id="monthlyContent">

            Total Spent

            R0

        </div>
    `;
}
