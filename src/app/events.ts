import { dom } from "./dom";
import { state } from "./state";
import type { AppActions } from "./actions";
import { refreshApp } from "./render";

export function initializeEvents(actions: AppActions): void {
  // Handle category filter  channges
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
