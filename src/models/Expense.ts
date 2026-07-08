import type { Category } from "./Category";

export interface Expense {
  id: number;
  description: string;
  category: Category;
  amount: number;
  date: string;
}
