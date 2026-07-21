import { categories } from "../models/Category";
import type { Expense } from "../models/Expense";


// Renders the expense form and handles form submission
export function renderExpenseForm(
    container: HTMLElement,
    onSaveExpense: (expense: Expense) => void,
    expense?: Expense,
    onCancelEdit?: () => void
): void {

  // Create the form HTML structure
  container.innerHTML = `
        <h2>${expense ? "Edit Expense" : "Add Expense"}</h2>

        <form id="expense-form-form">

            <label for="description">Description</label>

            <input
                id="description"
                type="text"
                placeholder="Enter description"
                value="${expense?.description ?? ""}"
            />

            <label for="category">Category</label>

              <select id="category">

                ${categories
                  .map(
                    (category) => `
                        <option
                            value="${category}"
                            ${expense?.category === category ? "selected" : ""}
                        >
                            ${category}
                        </option>
                    `,
                  )
                  .join("")}

              </select>

            <label for="amount">Amount</label>

            <input
                id="amount"
                type="number"
                placeholder="0.00"
                value="${expense?.amount ?? ""}"
            />

            <label for="date">Date</label>

            <input
                id="date"
                type="date"
                value="${expense?.date ?? ""}"
            />

            <p id="error-message" class="error-message"></p>

            <div class="form-actions"> 
                <button type="submit">
                    ${expense ? "Update Expense" : "Add Expense"}
                </button>
                
                ${
                  expense ? ` 
                  <button 
                      type="button" 
                      id="cancel-edit" 
                      class="secondary-button">
                      
                      Cancel 
                  </button> 
                  ` : "" 
                }
            </div>

        </form>
    `;


  // Add event listener for form submission
  const form = container.querySelector<HTMLFormElement>("#expense-form-form")!;

  const errorMessage =
    container.querySelector<HTMLParagraphElement>("#error-message")!;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = (
      document.querySelector("#description") as HTMLInputElement
    ).value;
    const category = (document.querySelector("#category") as HTMLSelectElement)
      .value;
    const amount = Number(
      (document.querySelector("#amount") as HTMLInputElement).value,
    );
    const date = (document.querySelector("#date") as HTMLInputElement).value;

    errorMessage.textContent = "";

    // Form validation
    if (description.trim() === "") {
      errorMessage.textContent = "Description is required";
      return;
    }

    if (amount <= 0) {
      errorMessage.textContent = "Amount must be greater than 0";
      return;
    }

    if (date === "") {
      errorMessage.textContent = "Please select a date";
      return;
    }

    // Create a new expense object
    const newExpense: Expense = {
      id: expense?.id ?? Date.now(),
      description,
      category: category as any,
      amount,
      date,
    };

    onSaveExpense(newExpense);

    form.reset();
  });

  const cancelButton = 
    container.querySelector<HTMLButtonElement>("#cancel-edit");

  cancelButton?.addEventListener("click", () => { onCancelEdit?.(); });
}
