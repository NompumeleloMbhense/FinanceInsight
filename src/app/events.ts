/*
 * This file is responsible for handling user interactions.
 * It initializes event listeners for the category filter
 * and expense search input.
 */

import { dom } from "./dom";
import { state } from "./state";
import type { AppActions } from "./actions";
import { refreshApp } from "./render";

export function initializeEvents(actions: AppActions): void {
  // Handle category filter changes
  dom.categoryFilter.addEventListener("change", () => {
    state.selectedCategory = dom.categoryFilter.value;

    refreshApp(actions);
  });

  // Handle expense search
  dom.searchInput.addEventListener("input", () => {
    state.searchText = dom.searchInput.value;

    refreshApp(actions);
  });
}