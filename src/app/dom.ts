/*
* This file is responsible for initializing and managing the DOM elements used in the 
* application. It defines the structure of the DOM elements and provides a function to
* initialize them by querying the document for the required elements. 
**/



export interface Dom {
  dashboard: HTMLElement;
  expenseForm: HTMLElement;
  expenseList: HTMLElement;
  categoryBreakdown: HTMLElement;
  categoryChart: HTMLElement;
  budgetForm: HTMLElement;
  monthlyReport: HTMLElement;
  categoryFilter: HTMLSelectElement;
  searchInput: HTMLInputElement;
}

export let dom: Dom;

export function initializeDom(): void {
  dom = {
    dashboard: document.querySelector<HTMLElement>("#dashboard")!,

    expenseForm: document.querySelector<HTMLElement>("#expense-form")!,

    expenseList: document.querySelector<HTMLElement>("#expense-list")!,

    categoryBreakdown:
      document.querySelector<HTMLElement>("#category-breakdown")!,

    categoryChart:
      document.querySelector<HTMLElement>("#category-chart")!,

    budgetForm:
      document.querySelector<HTMLElement>("#budget-form")!,

    monthlyReport:
      document.querySelector<HTMLElement>("#monthly-report")!,

    categoryFilter:
      document.querySelector<HTMLSelectElement>("#category-filter")!,

    searchInput:
      document.querySelector<HTMLInputElement>("#expense-search-input")!,
  };
}