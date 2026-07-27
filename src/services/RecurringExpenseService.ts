import type { Expense } from "../models/Expense";

export function generateRecurringExpenses(expenses: Expense[]): Expense[] {
  const today = new Date();

  const newExpenses: Expense[] = [];

  expenses.forEach((expense) => {
    if (!expense.isRecurring) {
      return;
    }

    const expenseDate = new Date(expense.date);

    let nextDate = new Date(expenseDate);

    switch (expense.recurringFrequency) {
      case "Weekly":
        nextDate.setDate(nextDate.getDate() + 7);
        break;

      case "Monthly":
        nextDate.setMonth(nextDate.getMonth() + 1);
        break;

      case "Yearly":
        nextDate.setFullYear(nextDate.getFullYear() + 1);
        break;

      default:
        return;
    }

    if (nextDate > today) {
      return;
    }

    const alreadyExists = expenses.some(
      (existing) =>
        existing.description === expense.description &&
        existing.amount === expense.amount &&
        existing.category === expense.category &&
        existing.date === nextDate.toISOString().split("T")[0],
    );

    if (alreadyExists) {
      return;
    }

    newExpenses.push({
      ...expense,
      id: Date.now() + Math.random(),
      date: nextDate.toISOString().split("T")[0],
    });
  });

  return newExpenses;
}
