"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Activity, LocationType } from "@/data";

type BranchOption = {
  slug: string;
  name: string;
  city: string;
  type: LocationType;
  activityIds: string[];
};

type ActivitiesFiltersContextValue = {
  branches: BranchOption[];
  selectedBranchSlug: string;
  selectedBranch: BranchOption | undefined;
  filteredActivities: Activity[];
  openFilters: () => void;
  closeFilters: () => void;
  filtersOpen: boolean;
};

const ActivitiesFiltersContext = createContext<ActivitiesFiltersContextValue | null>(
  null,
);

export function useActivitiesFilters() {
  const ctx = useContext(ActivitiesFiltersContext);
  if (!ctx) throw new Error("useActivitiesFilters must be used within provider");
  return ctx;
}

export function ActivitiesFiltersProvider({
  branches,
  activities,
  children,
}: {
  branches: BranchOption[];
  activities: Activity[];
  children: React.ReactNode;
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedBranchSlug, setSelectedBranchSlug] = useState<string>("all");
  const [draftBranchSlug, setDraftBranchSlug] = useState<string>("all");
  const branchSelectRef = useRef<HTMLSelectElement | null>(null);

  const branchBySlug = useMemo(
    () => new Map(branches.map((b) => [b.slug, b] as const)),
    [branches],
  );

  const activityById = useMemo(
    () => new Map(activities.map((a) => [a.id, a] as const)),
    [activities],
  );

  const selectedBranch =
    selectedBranchSlug === "all" ? undefined : branchBySlug.get(selectedBranchSlug);

  const filteredActivities = useMemo(() => {
    if (selectedBranchSlug === "all") return activities;

    const branch = branchBySlug.get(selectedBranchSlug);
    if (!branch) return activities.filter((a) => a.availableAt.includes(selectedBranchSlug));

    const ordered = branch.activityIds
      .map((id) => activityById.get(id))
      .filter((activity): activity is Activity => Boolean(activity));

    const extras = activities.filter(
      (activity) =>
        activity.availableAt.includes(selectedBranchSlug) &&
        !branch.activityIds.includes(activity.id),
    );

    return [...ordered, ...extras];
  }, [activities, activityById, branchBySlug, selectedBranchSlug]);

  const openFilters = useCallback(() => {
    setDraftBranchSlug(selectedBranchSlug);
    setFiltersOpen(true);
  }, [selectedBranchSlug]);

  useEffect(() => {
    if (!filtersOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFiltersOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const raf = window.requestAnimationFrame(() => {
      branchSelectRef.current?.focus();
    });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
      window.cancelAnimationFrame(raf);
    };
  }, [filtersOpen]);

  const applyFilters = () => {
    setSelectedBranchSlug(draftBranchSlug);
    setFiltersOpen(false);

    const target = document.getElementById("year-round");
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const clearFilters = () => {
    setDraftBranchSlug("all");
    setSelectedBranchSlug("all");
    setFiltersOpen(false);
  };

  const value = useMemo<ActivitiesFiltersContextValue>(
    () => ({
      branches,
      selectedBranchSlug,
      selectedBranch,
      filteredActivities,
      openFilters,
      closeFilters: () => setFiltersOpen(false),
      filtersOpen,
    }),
    [
      branches,
      filteredActivities,
      filtersOpen,
      openFilters,
      selectedBranch,
      selectedBranchSlug,
    ],
  );

  return (
    <ActivitiesFiltersContext.Provider value={value}>
      {children}

      {filtersOpen ? (
        <div className="fixed inset-0 z-[70]">
          <button
            type="button"
            className="absolute inset-0 bg-black/30"
            onClick={() => setFiltersOpen(false)}
            aria-label="Close filters"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            className="absolute right-4 top-24 w-[min(28rem,calc(100%-2rem))] rounded-2xl border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-[#1e2e37]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-extrabold">Filters</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Choose a branch to see only what&apos;s available there.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:text-gray-200 dark:hover:bg-white/10 dark:focus-visible:ring-offset-[#1e2e37]"
                aria-label="Close filters"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  close
                </span>
              </button>
            </div>

            <div className="mt-6">
              <label htmlFor="activities_branch_filter" className="text-sm font-bold">
                Branch
              </label>
              <select
                ref={branchSelectRef}
                id="activities_branch_filter"
                className="mt-2 h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-[#0d171c] shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 dark:border-gray-700 dark:bg-[#0f1820] dark:text-white"
                value={draftBranchSlug}
                onChange={(e) => setDraftBranchSlug(e.target.value)}
              >
                <option value="all">All branches</option>
                {branches.map((branch) => (
                  <option key={branch.slug} value={branch.slug}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-[#0d171c] transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:bg-[#1e2e37] dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-offset-[#1e2e37]"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={applyFilters}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1e2e37]"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </ActivitiesFiltersContext.Provider>
  );
}
