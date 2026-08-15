/*
* This file defines the actions that can be performed in the application, such 
* as saving, editing, and deleting expenses, as well as saving the budget.
* It also provides a function to create these actions and refresh the app 
* state after each action is performed.
**/

import type { Expense } from "../models/Expense";
import type { Budget } from "../models/Budget";
import { saveBudget as saveBudgetToStorage } from "../services/StorageService";
import { state } from "./state";

export interface AppActions {
  saveExpense: (expense: Expense) => void;
  editExpense: (id: number) => void;
  deleteExpense: (id: number) => void;
  cancelEdit: () => void;
  saveBudget: (budget: Budget) => void;
}

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
  }

  function editExpense(id: number): void {
    state.editingExpenseId = id;
  }

  function deleteExpense(id: number): void {
    const index = state.expenses.findIndex(
      (expense) => expense.id === id,
    );

    if (index === -1) return;

    state.expenses.splice(index, 1);
  }

  function cancelEdit(): void {
    state.editingExpenseId = null;
  }

  function saveBudget(newBudget: Budget): void {
    state.budget = newBudget;

    saveBudgetToStorage(state.budget);
  }

  return {
    saveExpense,
    editExpense,
    deleteExpense,
    cancelEdit,
    saveBudget,
  };
}