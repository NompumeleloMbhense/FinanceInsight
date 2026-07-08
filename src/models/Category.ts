export const categories = [
  "Food",
  "Transport",
  "Utilities",
  "Shopping",
  "Entertainment",
  "Health",
  "Other",
] as const;

export type Category = (typeof categories)[number];
