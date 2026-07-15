import type { Expense } from "../models/Expense";


function highlightMatch(text:string, searchText: string): string {
  
  if(searchText.trim() === ""){
    return text;
  }

  const regex = new RegExp(`(${searchText})`, "gi");

  return text.replace(
    regex, 
    `<mark>$1</mark>`
  );
}


// Renders the expense list in the given container and sets up delete functionality
export function renderExpenseList(
  container: HTMLElement,
  expenses: Expense[],
  onDeleteExpense: (id: number) => void,
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
           <li class="expense-item">

              <div>

                  <strong>
                    ${highlightMatch(
                      expense.description,
                      searchText,
                    )}
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
