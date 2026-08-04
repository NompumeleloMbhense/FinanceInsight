import { Chart, registerables } from "chart.js";
import type { Expense } from "../models/Expense";

Chart.register(...registerables);

let categoryChart: Chart | null = null;

export function renderCategoryChart(
  container: HTMLElement,
  expenses: Expense[],
): void {

  const totalSpent = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  container.innerHTML = `
  <h2>Spending by Category</h2>

  ${
    expenses.length === 0
      ? `<p>No expenses available.</p>`
      : `
        <div class="chart-container">
          <canvas id="category-chart"></canvas>
        </div>

        <div class="chart-total">
          <span>Total Spent</span>
          <strong>R${totalSpent.toFixed(2)}</strong>
        </div>
      `
  }
`;

  if (expenses.length === 0) {
    return;
  }

  // Calculate totals per category
  const totals: Record<string, number> = {};

  for (const expense of expenses) {
    totals[expense.category] =
      (totals[expense.category] ?? 0) + expense.amount;
  }

  const labels = Object.keys(totals);
  const data = Object.values(totals);

  const canvas =
    container.querySelector<HTMLCanvasElement>("#category-chart");

  if (!canvas) return;

  // Destroy previous chart before rendering a new one
  if (categoryChart) {
    categoryChart.destroy();
  }

  categoryChart = new Chart(canvas, {
    type: "pie",

    data: {
      labels,

      datasets: [
        {
          label: "Spending",
          data,
          borderWidth: 2,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,

      plugins: {
        legend: {
          position: "bottom",
        },

        tooltip: {
          callbacks: {
            label(context) {
              const value = context.parsed;
              const percentage = ((value / totalSpent) * 100).toFixed(1);

              return `${context.label}: R${value.toFixed(2)} (${percentage}%)`;
            },
          },
        },
      },
    },
  });
}