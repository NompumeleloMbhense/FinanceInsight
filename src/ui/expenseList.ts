import type { Expense } from "../models/Expense";


function highlightMatch(text: string, searchText: string): string {
  if (searchText.trim() === "") {
    return text;
  }

  const regex = new RegExp(`(${searchText})`, "gi");

  return text.replace(regex, `<mark>$1</mark>`);
}

// Renders the expense list in the given container and sets up delete functionality
export function renderExpenseList(
  container: HTMLElement,
  expenses: Expense[],
  onEditExpense: (id: number) => void,
  onDeleteExpense: (id: number) => void,
  editingExpenseId: number | null,
  emptyMessage: string,
  searchText: string,
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
           <li class="expense-item ${editingExpenseId === expense.id ? "editing" : ""}">

              <div>

                <strong>
                    ${highlightMatch(expense.description, searchText)}
                </strong>

                <br>

                <small>
                    ${expense.category}
                </small>

                ${
                  editingExpenseId === expense.id
                    ? `
                    <div class="editing-label">
                        ✏ Editing...
                    </div>
                    `
                    : ""
                }

              </div>

              <div class="expense-right">

                  <span class="expense-amount">
                      R${expense.amount.toFixed(2)}
                  </span>

                  <button 
                    class="edit-expense" 
                    data-id="${expense.id}">
                    
                    Edit 
                  </button>
                  
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


// Event listeners for edit and delete buttons
  const deleteButtons =
    container.querySelectorAll<HTMLButtonElement>(".delete-expense");
  const editButtons =
    container.querySelectorAll<HTMLButtonElement>(".edit-expense");

  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);
      onEditExpense(id);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.dataset.id);

      onDeleteExpense(id);
    });
  });
}
