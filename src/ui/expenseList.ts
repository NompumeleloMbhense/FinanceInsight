import type { Expense } from "../models/Expense";

// Renders the expense list in the given container and sets up delete functionality
export function renderExpenseList(
  container: HTMLElement,
  expenses: Expense[],
  onDeleteExpense: (id: number) => void,
  emptyMessage: string,
): void {

  if (expenses.length === 0) {
    container.innerHTML = `
          <h2>Expense List</h2>
          <p>${emptyMessage}</p>
      `;
    return;
  }

  container.innerHTML = `
     <h2>Expense List</h2>

      <ul>

        ${expenses
          .map(
            (expense) => `
           <li class="expense-item">

              <div>

                  <strong>
                      ${expense.description}
                  </strong>

                  <small>
                      ${expense.category}
                  </small>

              </div>

              <div class="expense-right">

                  <span class="expense-amount">
                      R${expense.amount.toFixed(2)}
                  </span>

                  <button
                      class="delete-expense"
                      data-id="${expense.id}">

                      Delete

                  </button>

              </div>

            </li>
        `,
          )
          .join("")}

    </ul>
`;

  const deleteButtons =
    container.querySelectorAll<HTMLButtonElement>(".delete-expense");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);

      onDeleteExpense(id);
    });
  });
}
