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

const expenses: Expense[] = loadExpenses(); // Array to hold all expenses
let selectedCategory = "All"; // Variable to hold the selected category for filtering

let budget: Budget = loadBudget();

const app = document.querySelector<HTMLDivElement>("#app")!;

// Function to add a new expense to the expenses array and update the UI accordingly
function addExpense(expense: Expense) {
  expenses.push(expense);

  refreshApp();
}

function saveBudget(newBudget: Budget): void {
  budget = newBudget;

  saveBudgetToStorage(budget);

  refreshApp();
}

app.innerHTML = `
  <main class="container">

    <header class="page-header">
        <h1>Finance Insight</h1>
        <p>Know where every rand goes.</p>
    </header>

    <section id="dashboard" class="card"></section>

    <div class="two-column">

        <section id="budget-form" class="card"></section>

        <section id="expense-form" class="card"></section>

    </div>

    <div class="two-column">

        <section id="category-breakdown" class="card"></section>

        <section id="expense-filter" class="card">

            <h2>Filter Expenses</h2>

            <label for="category-filter">
                Category
            </label>

            <select id="category-filter">

                <option value="All">All</option>

                ${categories
                    .map(category => `
                        <option value="${category}">
                            ${category}
                        </option>
                    `)
                    .join("")}

            </select>

        </section>

    </div>

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
  dashboardSection.innerHTML = renderDashboard(expenses, budget);
}

function updateBudgetForm(): void {
  renderBudgetForm(budgetFormSection, budget, saveBudget);
}

function updateCategoryBreakdown() {
  renderCategoryBreakdown(categoryBreakdownSection, expenses);
}

function deleteExpense(id: number): void {
  // Find the position of the expense with the given id in the expenses array
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) return;

  expenses.splice(index, 1);

  refreshApp();
}

// Initial rendering of the expense form, dashboard, expense list, and category breakdown
renderExpenseForm(expenseFormSection, addExpense);
updateDashboard();
updateExpenseList();
updateCategoryBreakdown();
renderBudgetForm(budgetFormSection, budget, saveBudget);

function refreshApp(): void {
  saveExpenses(expenses);
  
  updateDashboard();
  updateExpenseList();
  updateCategoryBreakdown();
  updateBudgetForm();
}
