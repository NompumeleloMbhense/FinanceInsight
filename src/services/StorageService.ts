import type { Expense } from "../models/Expense";
import type { Budget } from "../models/Budget";
import { generateRecurringExpenses } from "./RecurringExpenseService";

// Keys used to store data in localStorage
const EXPENSES_STORAGE_KEY = "expenses";
const BUDGET_STORAGE_KEY = "budget";

// Convert the expenses array into a JSON string
// then save it under the key "expenses"
export function saveExpenses(expenses: Expense[]): void {
  const json = JSON.stringify(expenses);

  localStorage.setItem(EXPENSES_STORAGE_KEY, json);
}


// Load the expenses from localStorage if they exist,
// otherwise return an empty array
export function loadExpenses(): Expense[] {
    const json = localStorage.getItem(EXPENSES_STORAGE_KEY);

    const expenses =
        json === null
            ? []
            : (JSON.parse(json) as Expense[]);

    const recurring = generateRecurringExpenses(expenses);

    if (recurring.length > 0) {
        expenses.push(...recurring);
        saveExpenses(expenses);
    }

    return expenses;
}


// Convert the budget object into a JSON string
// then save it under the key "budget"
export function saveBudget(budget: Budget): void{
    const json = JSON.stringify(budget);

    localStorage.setItem(BUDGET_STORAGE_KEY, json);
}


// Load the budget from localStorage if it exists,
// otherwise return a default budget object with amount set to 0
export function loadBudget(){
    const json = localStorage.getItem(BUDGET_STORAGE_KEY);

    if(json === null){
        return {
            amount: 0,
        };
    }

    return JSON.parse(json) as Budget;
}
