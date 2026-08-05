import "./style.css";
import type { Expense } from "./models/Expense";
import type { Budget } from "./models/Budget";

import { renderExpenseForm } from "./ui/expenseForm";
import { renderBudgetForm } from "./ui/budgetForm";
import { renderExpenseList } from "./ui/expenseList";
import { renderDashboard } from "./ui/dashboard";
import { renderCategoryBreakdown } from "./ui/categoryBreakdown";
import { renderMonthlyReport } from "./ui/monthlyReport";
import { getCurrentMonthExpenses } from "./analytics/currentMonth";
import { renderCategoryChart } from "./ui/categoryChart";
import { renderLayout } from "./app/layout";

import { initializeDom } from "./app/dom";
import { state } from "./app/state";
import { saveExpenses, saveBudget as saveBudgetToStorage } from "./services/StorageService";


const app = document.querySelector<HTMLDivElement>("#app")!;


// Render the initial layout of the application
renderLayout(app);

const dom = initializeDom();

// Function to save a new expense or update an existing one based on the editingExpenseId
function saveExpense(expense: Expense): void {
  if (state.editingExpenseId === null) {
    state.expenses.push(expense);
  } else {
    const index = state.expenses.findIndex(
      (expense) => expense.id === state.editingExpenseId,
    );

    if (index !== -1) {
      state.expenses[index] = expense;
    }

    state.editingExpenseId = null;
  }

  refreshApp();
}

// Function to edit an existing expense by its id and render the expense form with the expense data
function editExpense(id: number): void {
  state.editingExpenseId = id;

  refreshApp();
}

// Function to save the new budget and update the UI accordingly
function saveBudget(newBudget: Budget): void {
  state.budget = newBudget;

  saveBudgetToStorage(state.budget);

  refreshApp();
}

function cancelEdit(): void {
  state.editingExpenseId = null;

  refreshApp();
}




// When the user changes the dropdown, remember the selected category then
// update the expense list to show only expenses from that category
dom.categoryFilter.addEventListener("change", () => {
  state.selectedCategory = dom.categoryFilter.value;

  updateExpenseList();
});

dom.searchInput.addEventListener("input", () => {
  state.searchText = dom.searchInput.value;

  updateExpenseList();
});

// ----------------------------------- UI Update Functions ---------------------------------------------//

// Function to update the expense list based on the selected category and search text
function updateExpenseList() {
  const filteredExpenses = state.expenses.filter((expense) => {
    const matchesCategory =
      state.selectedCategory === "All" || expense.category === state.selectedCategory;

    const matchesSearch = expense.description
      .toLowerCase()
      .includes(state.searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const emptyMessage =
    state.expenses.length === 0 ? "No expenses yet" : "No matching expenses found";

  // Render the filtered expense list in the expenseListSection to
  // show only expenses that match the selected category and search text
  renderExpenseList(
    dom.expenseList,
    filteredExpenses,
    editExpense,
    deleteExpense,
    state.editingExpenseId,
    emptyMessage,
    state.searchText,
  );
}

// Function to update the dashboard with the latest expenses and budget
function updateDashboard() {
  const currentMonthExpenses = getCurrentMonthExpenses(state.expenses);

  dom.dashboard.innerHTML = renderDashboard(currentMonthExpenses, state.budget);
}

// Function to update the budget form with the latest budget
function updateBudgetForm(): void {
  renderBudgetForm(dom.budgetForm, state.budget, saveBudget);
}

// Function to update the category breakdown with the latest expenses
function updateCategoryBreakdown() {
  const currentMonthExpenses = getCurrentMonthExpenses(state.expenses);

  renderCategoryBreakdown(dom.categoryBreakdown, currentMonthExpenses);
}

// Function to delete an expense by its id and update the UI accordingly
function deleteExpense(id: number): void {
  // Find the position of the expense with the given id in the expenses array
  const index = state.expenses.findIndex((expense) => expense.id === id);

  if (index === -1) return;

  state.expenses.splice(index, 1);

  refreshApp();
}

// Function to update the monthly report with the latest expenses
function updateMonthlyReport() {
  renderMonthlyReport(dom.monthlyReport, state.expenses);
}

// Function to update the category chart with the latest expenses
function updateCategoryChart(): void {
  const currentMonthExpenses = getCurrentMonthExpenses(state.expenses);

  renderCategoryChart(
    dom.categoryChart,
    currentMonthExpenses,
  );
}


// Function to update the expense form based on the current editingExpenseId
function updateExpenseForm(): void {
  const expense = state.expenses.find((expense) => expense.id === state.editingExpenseId);

  renderExpenseForm(dom.expenseForm, saveExpense, expense, cancelEdit);
}

// Initial rendering of the expense form, dashboard, expense list, and category breakdown
refreshApp();

// Function to refresh the app by saving expenses and updating all relevant sections of the UI
function refreshApp(): void {
  saveExpenses(state.expenses);

  updateDashboard();
  updateExpenseForm();
  updateExpenseList();
  updateCategoryBreakdown();
  updateBudgetForm();
  updateMonthlyReport();
  updateCategoryChart();
}
