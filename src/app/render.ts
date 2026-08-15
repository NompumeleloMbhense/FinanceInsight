/*
 * This file is responsible for rendering the application based on the
 * current state.
 *
 * It coordinates the different UI components and ensures that the
 * interface reflects the latest application state.
 */

import { state } from "./state";
import { dom } from "./dom";
import type { AppActions } from "./actions";

import { saveExpenses } from "../services/StorageService";

import { renderDashboard } from "../ui/dashboard";
import { renderBudgetForm } from "../ui/budgetForm";
import { renderExpenseForm } from "../ui/expenseForm";
import { renderExpenseList } from "../ui/expenseList";
import { renderCategoryBreakdown } from "../ui/categoryBreakdown";
import { renderCategoryChart } from "../ui/categoryChart";
import { renderMonthlyReport } from "../ui/monthlyReport";

import { getCurrentMonthExpenses } from "../analytics/currentMonth";


export function refreshApp(actions: AppActions): void {
  saveExpenses(state.expenses);

  updateDashboard();
  updateExpenseForm(actions);
  updateExpenseList(actions);
  updateCategoryBreakdown();
  updateBudgetForm(actions);
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


function updateBudgetForm(actions: AppActions): void {
  renderBudgetForm(
    dom.budgetForm,
    state.budget,
    actions.saveBudget,
  );
}


function updateExpenseForm(actions: AppActions): void {
  const expense = state.expenses.find(
    expense => expense.id === state.editingExpenseId,
  );

  renderExpenseForm(
    dom.expenseForm,
    actions.saveExpense,
    expense,
    actions.cancelEdit,
  );
}


function updateExpenseList(actions: AppActions): void {
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
    actions.editExpense,
    actions.deleteExpense,
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