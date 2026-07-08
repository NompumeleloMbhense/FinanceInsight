import "./style.css";
import type { Expense } from "./models/Expense";
import { renderExpenseForm } from "./ui/expenseForm";
import { renderExpenseList } from "./ui/expenseList";
import { renderDashboard } from "./ui/dashboard";
import { renderCategoryBreakdown } from "./ui/categoryBreakdown";
import { categories } from "./models/Category";

const expenses: Expense[] = []; // Array to hold all expenses
let selectedCategory = "All"; // Variable to hold the selected category for filtering

const app = document.querySelector<HTMLDivElement>("#app")!;

function addExpense(expense: Expense) {
  expenses.push(expense);

  updateDashboard();
  updateExpenseList();
  updateCategoryBreakdown();

  console.log("All expenses: ", expenses);
}

app.innerHTML = `
  <main class="container">

    <header>
        <h1>Finance Insight</h1>
    </header>   

    <section id="dashboard">
        <h2>Dashboard Summary</h2>
    </section>

    <section id="expense-form">
    </section>

    <section id="category-breakdown">
        <h2>Category Breakdown</h2>
    </section>

    <section id="expense-filter">

      <label for="category-filter">Filter by Category</label>

      <select id="category-filter">
          <option value="All">All</option>
          ${categories
              .map(
                  category => `
                      <option value="${category}">
                          ${category}
                      </option>
                  `
              )
              .join("")}
      </select>

    </section>

    <section id="expense-list">
        <h2>Expense List</h2>
    </section>

  </main>
`;


// Query the necessary sections from the DOM for later use
const dashboardSection = document.querySelector<HTMLElement>("#dashboard")!;
const expenseFormSection =
  document.querySelector<HTMLElement>("#expense-form")!;
const expenseListSection =
  document.querySelector<HTMLElement>("#expense-list")!;
const categoryBreakdownSection = document.querySelector<HTMLElement>(
  "#category-breakdown",
)!;
const categoryFilter =
  document.querySelector<HTMLSelectElement>("#category-filter")!;


// When the user changes the dropdown, remember the selected category then
// update the expense list to show only expenses from that category
categoryFilter.addEventListener("change", () => {
  selectedCategory = categoryFilter.value;

  updateExpenseList();
});


function updateExpenseList() {
  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  renderExpenseList(expenseListSection, filteredExpenses, deleteExpense);
}

function updateDashboard() {

  dashboardSection.innerHTML = renderDashboard(expenses);
}

function updateCategoryBreakdown() {
  renderCategoryBreakdown(categoryBreakdownSection, expenses);
}

function deleteExpense(id: number): void {
  // Find the position of the expense with the given id in the expenses array
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) return;

  expenses.splice(index, 1);

  updateDashboard();
  updateExpenseList();
  updateCategoryBreakdown();
}

// Initial rendering of the expense form, dashboard, expense list, and category breakdown
renderExpenseForm(expenseFormSection, addExpense);
updateDashboard();
updateExpenseList();
updateCategoryBreakdown();
