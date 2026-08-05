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

export function initializeDom(): Dom {
  return {
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