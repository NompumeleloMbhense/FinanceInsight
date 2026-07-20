import type { Expense } from "../models/Expense";



/**
 * Returns every month that exists in the expense list.
 * Example:
 * ["All Months", "July 2026", "August 2026"]
 */
export function getAvailableMonths(expenses: Expense[]): string[] {
    const months = expenses.map(expense =>
        new Date(expense.date).toLocaleString("default", {
            month: "long",
            year: "numeric",
        })
    );

    return ["All Months", ...new Set(months)];
}

/**
 * Returns only expenses from the selected month.
 */
export function filterByMonth(
    expenses: Expense[],
    selectedMonth: string
): Expense[] {

    if (selectedMonth === "All Months")
        return expenses;

    return expenses.filter(expense => {

        const month = new Date(expense.date)
            .toLocaleString("default", {
                month: "long",
                year: "numeric",
            });

        return month === selectedMonth;
    });
}

/**
 * Total spent.
 */
export function calculateMonthlyTotal(
    expenses: Expense[]
): number {

    return expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );
}

/**
 * Returns totals grouped by category.
 */
export function calculateCategoryTotals(
    expenses: Expense[]
): Record<string, number> {

    const totals: Record<string, number> = {};

    expenses.forEach(expense => {

        totals[expense.category] =
            (totals[expense.category] || 0) + expense.amount;

    });

    return totals;
}

/**
 * Returns the single biggest expense.
 */
export function getHighestExpense(
    expenses: Expense[]
): Expense | null {

    if (expenses.length === 0)
        return null;

    return expenses.reduce((highest, expense) =>
        expense.amount > highest.amount
            ? expense
            : highest
    );
}

/**
 * Returns the category with the highest spending.
 */
export function getHighestCategory(
    expenses: Expense[]
): { category: string; amount: number } | null {

    const totals = calculateCategoryTotals(expenses);

    let highestCategory = "";
    let highestAmount = 0;

    for (const category in totals) {

        if (totals[category] > highestAmount) {

            highestCategory = category;
            highestAmount = totals[category];

        }

    }

    if (!highestCategory)
        return null;

    return {
        category: highestCategory,
        amount: highestAmount
    };
}

/**
 * Number of transactions.
 */
export function getTransactionCount(
    expenses: Expense[]
): number {

    return expenses.length;

}

/**
 * Percentage difference between months.
 */
export function compareMonths(
    current: number,
    previous: number
): number {

    if (previous === 0)
        return 0;

    return ((current - previous) / previous) * 100;

}