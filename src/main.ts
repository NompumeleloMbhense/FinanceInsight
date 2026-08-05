import "./style.css";
import type { Expense } from "./models/Expense";
import type { Budget } from "./models/Budget";


import { renderLayout } from "./app/layout";

import { dom, initializeDom } from "./app/dom";
import { state } from "./app/state";
import { saveBudget as saveBudgetToStorage } from "./services/StorageService";
import { refreshApp } from "./app/render";

const app = document.querySelector<HTMLDivElement>("#app")!;


// Render the initial layout of the application
renderLayout(app);

initializeDom();

// Function to save a new expense or update an existing one based on the editingExpenseId
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

  refreshApp({
  saveExpense,
  editExpense,
  deleteExpense,
  cancelEdit,
  saveBudget,
});
}

// Function to edit an existing expense by its id and render the expense form with the expense data
function editExpense(id: number): void {
  state.editingExpenseId = id;

  refreshApp({
  saveExpense,
  editExpense,
  deleteExpense,
  cancelEdit,
  saveBudget,
});
}

// Function to save the new budget and update the UI accordingly
function saveBudget(newBudget: Budget): void {
  state.budget = newBudget;

  saveBudgetToStorage(state.budget);

  refreshApp({
  saveExpense,
  editExpense,
  deleteExpense,
  cancelEdit,
  saveBudget,
});
}

function cancelEdit(): void {
  state.editingExpenseId = null;

  refreshApp({
  saveExpense,
  editExpense,
  deleteExpense,
  cancelEdit,
  saveBudget,
});
}




// When the user changes the dropdown, remember the selected category then
// update the expense list to show only expenses from that category
dom.categoryFilter.addEventListener("change", () => {
  state.selectedCategory = dom.categoryFilter.value;

  refreshApp({
    saveExpense,
    editExpense,
    deleteExpense,
    cancelEdit,
    saveBudget,
  });
});

dom.searchInput.addEventListener("input", () => {
  state.searchText = dom.searchInput.value;

  refreshApp({
    saveExpense,
    editExpense,
    deleteExpense,
    cancelEdit,
    saveBudget,
  });
});


// Function to delete an expense by its id and update the UI accordingly
function deleteExpense(id: number): void {
  // Find the position of the expense with the given id in the expenses array
  const index = state.expenses.findIndex((expense) => expense.id === id);

  if (index === -1) return;

  state.expenses.splice(index, 1);

  refreshApp({
  saveExpense,
  editExpense,
  deleteExpense,
  cancelEdit,
  saveBudget,
});
}

// Initial rendering of the expense form, dashboard, expense list, and category breakdown
refreshApp({
  saveExpense,
  editExpense,
  deleteExpense,
  cancelEdit,
  saveBudget,
});

