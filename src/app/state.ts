/*
* This file is responsible for managing the application state. It defines the structure of 
* the state and provides a default state object that can be used throughout the application.
**/


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