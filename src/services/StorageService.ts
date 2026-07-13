import type { Expense } from "../models/Expense";

const STORAGE_KEY = "expenses";

export function saveExpenses(expenses: Expense[]): void {
  const json = JSON.stringify(expenses);

  localStorage.setItem(STORAGE_KEY, json);
}

export function loadExpenses(): Expense[] {
  const json = localStorage.getItem(STORAGE_KEY);

  if (json === null) return [];

  return JSON.parse(json) as Expense[];
}
