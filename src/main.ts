import "./style.css";
import type { Expense } from "./models/Expense";
import type { Budget } from "./models/Budget";
import { renderExpenseForm } from "./ui/expenseForm";
import { renderBudgetForm } from "./ui/budgetForm";
import { renderExpenseList } from "./ui/expenseList";
import { renderDashboard } from "./ui/dashboard";
import { renderCategoryBreakdown } from "./ui/categoryBreakdown";
import { categories } from "./models/Category";
import {
  saveExpenses,
  loadExpenses,
  loadBudget,
  saveBudget as saveBudgetToStorage,
} from "./services/StorageService";
import { renderMonthlyReport } from "./ui/monthlyReport";

const expenses: Expense[] = loadExpenses(); // Array to hold all expenses
let selectedCategory = "All"; // Variable to hold the selected category for filtering
let searchText = "";

let budget: Budget = loadBudget();

let editingExpenseId: number | null = null;

const app = document.querySelector<HTMLDivElement>("#app")!;

// Function to save a new expense or update an existing one based on the editingExpenseId
function saveExpense(expense: Expense): void {
  if (editingExpenseId === null) {
    expenses.push(expense);
  } else {
    const index = expenses.findIndex(
      (expense) => expense.id === editingExpenseId,
    );

    if (index !== -1) {
      expenses[index] = expense;
    }

    editingExpenseId = null;
  }

  refreshApp();
}

// Function to edit an existing expense by its id and render the expense form with the expense data
function editExpense(id: number): void {
  editingExpenseId = id;

  refreshApp();
}

// Function to save the new budget and update the UI accordingly
function saveBudget(newBudget: Budget): void {
  budget = newBudget;

  saveBudgetToStorage(budget);

  refreshApp();
}

function cancelEdit(): void {
  editingExpenseId = null;

  refreshApp();
}

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

    <!-- Category Breakdown + Search -->
    <div class="two-column">

        <section id="category-breakdown" class="card"></section>

        <section id="expense-search" class="card">

            <h2>Search Expenses</h2>

            <input
                id="expense-search-input"
                type="text"
                placeholder="Search description..."
            />

        </section>

    </div>

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
const budgetFormSection = document.querySelector<HTMLElement>("#budget-form")!;
const searchInput = document.querySelector<HTMLInputElement>(
  "#expense-search-input",
)!;
const monthlyReportSection =
  document.querySelector<HTMLElement>("#monthly-report")!;

// When the user changes the dropdown, remember the selected category then
// update the expense list to show only expenses from that category
categoryFilter.addEventListener("change", () => {
  selectedCategory = categoryFilter.value;

  updateExpenseList();
});

searchInput.addEventListener("input", () => {
  searchText = searchInput.value;

  updateExpenseList();
});

// ----------------------------------- UI Update Functions ---------------------------------------------//

// Function to update the expense list based on the selected category and search text
function updateExpenseList() {
  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      selectedCategory === "All" || expense.category === selectedCategory;

    const matchesSearch = expense.description
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const emptyMessage =
    expenses.length === 0 ? "No expenses yet" : "No matching expenses found";

  // Render the filtered expense list in the expenseListSection to
  // show only expenses that match the selected category and search text
  renderExpenseList(
    expenseListSection,
    filteredExpenses,
    editExpense,
    deleteExpense,
    editingExpenseId,
    emptyMessage,
    searchText,
  );
}

// Function to update the dashboard with the latest expenses and budget
function updateDashboard() {
  dashboardSection.innerHTML = renderDashboard(expenses, budget);
}

// Function to update the budget form with the latest budget
function updateBudgetForm(): void {
  renderBudgetForm(budgetFormSection, budget, saveBudget);
}

// Function to update the category breakdown with the latest expenses
function updateCategoryBreakdown() {
  renderCategoryBreakdown(categoryBreakdownSection, expenses);
}

// Function to delete an expense by its id and update the UI accordingly
function deleteExpense(id: number): void {
  // Find the position of the expense with the given id in the expenses array
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) return;

  expenses.splice(index, 1);

  refreshApp();
}

// Function to update the monthly report with the latest expenses
function updateMonthlyReport() {
  renderMonthlyReport(monthlyReportSection, expenses);
}

// Function to update the expense form based on the current editingExpenseId
function updateExpenseForm(): void {
  const expense = expenses.find((expense) => expense.id === editingExpenseId);

  renderExpenseForm(expenseFormSection, saveExpense, expense, cancelEdit);
}

// Initial rendering of the expense form, dashboard, expense list, and category breakdown
refreshApp();

// Function to refresh the app by saving expenses and updating all relevant sections of the UI
function refreshApp(): void {
  saveExpenses(expenses);

  updateDashboard();
  updateExpenseForm();
  updateExpenseList();
  updateCategoryBreakdown();
  updateBudgetForm();
  updateMonthlyReport();
}
