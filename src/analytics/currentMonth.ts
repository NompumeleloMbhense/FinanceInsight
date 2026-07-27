import type { Expense } from "../models/Expense";

export function getCurrentMonthExpenses(
  expenses: Expense[]
): Expense[] {
  const today = new Date();

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  return expenses.filter(expense => {
    const expenseDate = new Date(expense.date);

    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });
}