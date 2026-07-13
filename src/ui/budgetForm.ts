import type { Budget } from "../models/Budget";

export function renderBudgetForm(
  container: HTMLElement,
  budget: Budget,
  onSaveBudget: (budget: Budget) => void,
): void {
  container.innerHTML = `
        <h2>Monthly Budget</h2>

        <form id="budget-form">

            <label for="budget-amount">
                Budget Amount
            </label>

            <input
                id="budget-amount"
                type="number"
                value="${budget.amount}"
                placeholder="e.g. 5000"
            />

            <button type="submit">
                Save Budget
            </button>

            <p id="error-message" class="error-message"></p>

        </form>
`;

  const form = container.querySelector<HTMLFormElement>("#budget-form")!;
  const errorMessage =
    container.querySelector<HTMLParagraphElement>("#error-message")!;

  


  form.addEventListener("submit", (e) => {
    e.preventDefault();

    errorMessage.textContent = "";

    // read amount
    const amount = Number(
      (container.querySelector("#budget-amount") as HTMLInputElement).value,
    );

    // validate
    if (amount <= 0) {
      // show error
      errorMessage.textContent = "Amount must be greater than 0";
      return;
    }

    // create Budget
    const updatedBudget: Budget = {
        amount
    };

    // Call onSaveBudget()
    onSaveBudget(updatedBudget);

    // reset form
    errorMessage.textContent = "";
    
  });
}
