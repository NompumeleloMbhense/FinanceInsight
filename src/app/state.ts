import type { Budget } from "../models/Budget";
import type { Expense } from "../models/Expense";
import {
  loadBudget,
  loadExpenses,
} from "../services/StorageService";

export interface AppState {
  expenses: Expense[];
  budget: Budget;
  selectedCategory: string;
  searchText: string;
  editingExpenseId: number | null;
}

export const state: AppState = {
  expenses: loadExpenses(),
  budget: loadBudget(),
  selectedCategory: "All",
  searchText: "",
  editingExpenseId: null,
};