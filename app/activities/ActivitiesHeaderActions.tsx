"use client";

import { useActivitiesFilters } from "./ActivitiesFiltersProvider";

export function ActivitiesHeaderActions() {
  const { openFilters, filtersOpen, selectedBranchSlug } = useActivitiesFilters();

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:border-gray-700 dark:bg-[#1e2e37] dark:text-gray-200 dark:hover:bg-white/10 dark:focus-visible:ring-offset-background-dark"
        aria-label="Open calendar"
      >
        <span className="material-symbols-outlined text-xl" aria-hidden="true">
          calendar_month
        </span>
      </button>

      <button
        type="button"
        onClick={openFilters}
        className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-gray-200 bg-white text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:border-gray-700 dark:bg-[#1e2e37] dark:text-gray-200 dark:hover:bg-white/10 dark:focus-visible:ring-offset-background-dark"
        aria-label="Open filters"
        aria-haspopup="dialog"
        aria-expanded={filtersOpen}
      >
        <span className="material-symbols-outlined text-xl" aria-hidden="true">
          filter_list
        </span>
        {selectedBranchSlug !== "all" ? (
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary ring-2 ring-background-light dark:ring-background-dark" />
        ) : null}
      </button>
    </div>
  );
}

