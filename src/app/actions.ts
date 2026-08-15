import type { Expense } from "../models/Expense";
import type { Budget } from "../models/Budget";
import { saveBudget as saveBudgetToStorage } from "../services/StorageService";
import { state } from "./state";
import { refreshApp } from "./render";

// Function to save a new expense or update an existing one based on the editingExpenseId
export interface AppActions {
  saveExpense: (expense: Expense) => void;
  editExpense: (id: number) => void;
  deleteExpense: (id: number) => void;
  cancelEdit: () => void;
  saveBudget: (budget: Budget) => void;
}

// Functions to be used in the main.ts file to handle actions and refresh the app state
export function createActions(): AppActions {
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

    refreshApp(actions);
  }

  function editExpense(id: number): void {
    state.editingExpenseId = id;

    refreshApp(actions);
  }

  function deleteExpense(id: number): void {
    const index = state.expenses.findIndex((expense) => expense.id === id);

    if (index === -1) return;

    state.expenses.splice(index, 1);

    refreshApp(actions);
  }

  function cancelEdit(): void {
    state.editingExpenseId = null;

    refreshApp(actions);
  }

  function saveBudget(newBudget: Budget): void {
    state.budget = newBudget;

    saveBudgetToStorage(state.budget);

    refreshApp(actions);
  }

  // Object to hold the action functions
  const actions: AppActions = {
    saveExpense,
    editExpense,
    deleteExpense,
    cancelEdit,
    saveBudget,
  };

  return actions;
}
