import type { Expense } from "../models/Expense";

export function generateRecurringExpenses(
  expenses: Expense[],
): Expense[] {

  const today = new Date();

  const newExpenses: Expense[] = [];

  expenses.forEach((expense) => {

    if (!expense.isRecurring || !expense.recurringFrequency) {
      return;
    }

    let nextDate = new Date(expense.date);

    while (true) {

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

      }

      if (nextDate > today) {
        break;
      }

      const formattedDate =
        nextDate.toISOString().split("T")[0];

      const alreadyExists = expenses.some(existing =>
        existing.description === expense.description &&
        existing.category === expense.category &&
        existing.amount === expense.amount &&
        existing.date === formattedDate
      );

      if (!alreadyExists) {

        newExpenses.push({
          ...expense,
          id: Date.now() + Math.random(),
          date: formattedDate,
        });

      }

    }

  });

  return newExpenses;

}