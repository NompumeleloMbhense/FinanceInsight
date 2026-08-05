import { state } from "./state";
import { dom } from "./dom";

import { saveExpenses } from "../services/StorageService";

import { renderDashboard } from "../ui/dashboard";
import { renderBudgetForm } from "../ui/budgetForm";
import { renderExpenseForm } from "../ui/expenseForm";
import { renderExpenseList } from "../ui/expenseList";
import { renderCategoryBreakdown } from "../ui/categoryBreakdown";
import { renderCategoryChart } from "../ui/categoryChart";
import { renderMonthlyReport } from "../ui/monthlyReport";

import { getCurrentMonthExpenses } from "../analytics/currentMonth";

import type { Expense } from "../models/Expense";
import type { Budget } from "../models/Budget";

interface RenderCallbacks {
  saveExpense: (expense: Expense) => void;
  editExpense: (id: number) => void;
  deleteExpense: (id: number) => void;
  cancelEdit: () => void;
  saveBudget: (budget: Budget) => void;
}

export function refreshApp(callbacks: RenderCallbacks): void {
  saveExpenses(state.expenses);

  updateDashboard();
  updateExpenseForm(callbacks);
  updateExpenseList(callbacks);
  updateCategoryBreakdown();
  updateBudgetForm(callbacks);
  updateMonthlyReport();
  updateCategoryChart();
}

function updateDashboard(): void {
  const currentMonthExpenses =
    getCurrentMonthExpenses(state.expenses);

  dom.dashboard.innerHTML = renderDashboard(
    currentMonthExpenses,
    state.budget,
  );
}

function updateBudgetForm(
  callbacks: RenderCallbacks,
): void {
  renderBudgetForm(
    dom.budgetForm,
    state.budget,
    callbacks.saveBudget,
  );
}

function updateExpenseForm(
  callbacks: RenderCallbacks,
): void {
  const expense = state.expenses.find(
    expense => expense.id === state.editingExpenseId,
  );

  renderExpenseForm(
    dom.expenseForm,
    callbacks.saveExpense,
    expense,
    callbacks.cancelEdit,
  );
}

function updateExpenseList(
  callbacks: RenderCallbacks,
): void {

  const filteredExpenses = state.expenses.filter(expense => {

    const matchesCategory =
      state.selectedCategory === "All" ||
      expense.category === state.selectedCategory;

    const matchesSearch =
      expense.description
        .toLowerCase()
        .includes(state.searchText.toLowerCase());

    return matchesCategory && matchesSearch;

  });

  const emptyMessage =
    state.expenses.length === 0
      ? "No expenses yet"
      : "No matching expenses found";

  renderExpenseList(
    dom.expenseList,
    filteredExpenses,
    callbacks.editExpense,
    callbacks.deleteExpense,
    state.editingExpenseId,
    emptyMessage,
    state.searchText,
  );
}

function updateCategoryBreakdown(): void {

  const currentMonthExpenses =
    getCurrentMonthExpenses(state.expenses);

  renderCategoryBreakdown(
    dom.categoryBreakdown,
    currentMonthExpenses,
  );
}

function updateCategoryChart(): void {

  const currentMonthExpenses =
    getCurrentMonthExpenses(state.expenses);

  renderCategoryChart(
    dom.categoryChart,
    currentMonthExpenses,
  );
}

function updateMonthlyReport(): void {
  renderMonthlyReport(
    dom.monthlyReport,
    state.expenses,
  );
}