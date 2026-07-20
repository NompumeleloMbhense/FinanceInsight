import type { Expense } from "../models/Expense";
import {
    getAvailableMonths,
    filterByMonth,
    calculateMonthlyTotal,
    calculateCategoryTotals,
    getHighestExpense,
    getHighestCategory,
    getTransactionCount,
} from "../analytics/monthlyAnalytics";



export function renderMonthlyReport(
  container: HTMLElement,
  expenses: Expense[],
): void {

  const months = getAvailableMonths(expenses);

    container.innerHTML = `
        <h2>Monthly Report</h2>

        <div class="report-filter">
            <label for="monthFilter">Month</label>

            <select id="monthFilter">
                ${months
                    .map(
                        month => `
                            <option value="${month}">
                                ${month}
                            </option>
                        `
                    )
                    .join("")}
            </select>
        </div>

        <div id="monthlyContent"></div>
    `;


     const monthFilter =
        container.querySelector<HTMLSelectElement>("#monthFilter")!;

    const monthlyContent =
        container.querySelector<HTMLElement>("#monthlyContent")!;

    function updateReport(selectedMonth: string): void {

        const filteredExpenses =
            filterByMonth(expenses, selectedMonth);

        const total =
            calculateMonthlyTotal(filteredExpenses);

        const categoryTotals =
            calculateCategoryTotals(filteredExpenses);

        const highestExpense =
            getHighestExpense(filteredExpenses);

        const highestCategory =
            getHighestCategory(filteredExpenses);

        const transactionCount =
            getTransactionCount(filteredExpenses);

        monthlyContent.innerHTML = `
            <div class="report-section">

                <h3>Total Spent</h3>

                <p class="report-total">
                    R${total.toFixed(2)}
                </p>

            </div>

            <div class="report-section">

                <h3>Category Breakdown</h3>

                ${
                    Object.keys(categoryTotals).length === 0
                        ? "<p>No data available.</p>"
                        : `
                            <ul class="report-list">
                                ${Object.entries(categoryTotals)
                                    .map(
                                        ([category, amount]) => `
                                            <li>
                                                <span>${category}</span>
                                                <strong>R${amount.toFixed(2)}</strong>
                                            </li>
                                        `
                                    )
                                    .join("")}
                            </ul>
                        `
                }

            </div>

            <div class="report-section">

                <h3>Highest Expense</h3>

                ${
                    highestExpense
                        ? `
                            <p>${highestExpense.description}</p>
                            <strong>
                                R${highestExpense.amount.toFixed(2)}
                            </strong>
                        `
                        : "<p>No expenses.</p>"
                }

            </div>

            <div class="report-section">

                <h3>Highest Category</h3>

                ${
                    highestCategory
                        ? `
                            <p>${highestCategory.category}</p>
                            <strong>
                                R${highestCategory.amount.toFixed(2)}
                            </strong>
                        `
                        : "<p>No data.</p>"
                }

            </div>

            <div class="report-section">

                <h3>Transactions</h3>

                <p>${transactionCount}</p>

            </div>
        `;
    }

    updateReport("All Months");

    monthFilter.addEventListener("change", () => {
        updateReport(monthFilter.value);
    });
}

