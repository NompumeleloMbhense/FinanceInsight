import { categories } from "../models/Category";

export function renderLayout(app: HTMLDivElement): void {
  app.innerHTML = `
    <main class="container">

        <header class="page-header">
            <h1>Finance Insight</h1>
            <p>Know where every rand goes.</p>
        </header>

        <!-- Dashboard -->
        <section id="dashboard" class="card"></section>

        <!-- Budget + Expense Form -->
        <div class="two-column">

            <section id="budget-form" class="card"></section>

            <section id="expense-form" class="card"></section>

        </div>

        <!-- Category Breakdown + Chart -->
        <div class="two-column">

            <section id="category-breakdown" class="card"></section>

            <section id="category-chart" class="card"></section>

        </div>

        <!-- Search -->
        <section id="expense-search" class="card">

            <h2>Search Expenses</h2>

            <input
                id="expense-search-input"
                type="text"
                placeholder="Search description..."
            />

        </section>

        <!-- Filter + Monthly Report -->
        <div class="two-column">

            <section id="expense-filter" class="card">

                <h2>Filter Expenses</h2>

                <label for="category-filter">
                    Category
                </label>

                <select id="category-filter">

                    <option value="All">All</option>

                    ${categories
                      .map(
                        (category) => `
                            <option value="${category}">
                                ${category}
                            </option>
                        `,
                      )
                      .join("")}

                </select>

            </section>

            <section id="monthly-report" class="card"></section>

        </div>

        <!-- Expense List -->
        <section id="expense-list" class="card"></section>

    </main>
  `;
}