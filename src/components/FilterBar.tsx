"use client";

import type { LocationType } from "@/data";
import { Button } from "@/components/Button";
import { cn } from "@/lib/cn";

export type LocationFilters = {
  type: LocationType | "all";
  city: string | "all";
  activity: string | "all";
};

export function FilterBar({
  cities,
  activities,
  value,
  onChange,
}: {
  cities: string[];
  activities: Array<{ id: string; name: string }>;
  value: LocationFilters;
  onChange: (next: LocationFilters) => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground/70"
            >
              1
            </span>
            <p className="text-xs font-semibold text-foreground/60">Choose a type</p>
          </div>

          <div className="inline-flex h-11 w-full items-center gap-1 rounded-xl border border-border bg-background p-1">
            {(
              [
                { id: "all", label: "All" },
                { id: "playground", label: "Playgrounds" },
                { id: "sports", label: "Sports" },
              ] as const
            ).map((opt) => {
              const isActive = value.type === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onChange({ ...value, type: opt.id })}
                  className={cn(
                    "h-9 flex-1 rounded-lg px-3 text-xs font-semibold transition",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-foreground/70 hover:bg-muted/60 hover:text-foreground",
                  )}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          <p className="text-xs leading-5 text-foreground/60">
            Start broad, then narrow down.
          </p>
        </div>

        <label className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground/70"
            >
              2
            </span>
            <span className="text-xs font-semibold text-foreground/60">
              Choose an area
            </span>
          </div>
          <select
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary/40"
            value={value.city}
            onChange={(e) => onChange({ ...value, city: e.target.value })}
          >
            <option value="all">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <p className="text-xs leading-5 text-foreground/60">
            Helpful when you want the nearest branch.
          </p>
        </label>

        <label className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground/70"
            >
              3
            </span>
            <span className="text-xs font-semibold text-foreground/60">
              Pick an activity
            </span>
          </div>
          <select
            className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary/40"
            value={value.activity}
            onChange={(e) => onChange({ ...value, activity: e.target.value })}
          >
            <option value="all">All activities</option>
            {activities.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
          <p className="text-xs leading-5 text-foreground/60">
            Great when kids already know what they want.
          </p>
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-foreground/60">
          Tip: use Compare to quickly pick between 2–3 branches.
        </p>
        <Button
          variant="outline"
          size="md"
          onClick={() => onChange({ type: "all", city: "all", activity: "all" })}
        >
          Clear filters
        </Button>
      </div>
    </div>
  );
}
