"use client";

import { useMemo, useState } from "react";
import type { Activity, EnergyLevel, Location } from "@/data";
import { ActivityCard } from "@/components/ActivityCard";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";

type AgeFilterKey = "all" | "1-3" | "3-6" | "6-12" | "12+";

type ActivityFilters = {
  age: AgeFilterKey;
  energy: EnergyLevel | "all";
  location: string | "all";
};

const AGE_FILTERS: Array<{
  key: AgeFilterKey;
  label: string;
  min: number | null;
  max: number | null;
}> = [
  { key: "all", label: "All ages", min: null, max: null },
  { key: "1-3", label: "Toddlers (1-3)", min: 1, max: 3 },
  { key: "3-6", label: "Ages 3-6", min: 3, max: 6 },
  { key: "6-12", label: "Ages 6-12", min: 6, max: 12 },
  { key: "12+", label: "Teens & adults (12+)", min: 12, max: null },
];

const ENERGY_FILTERS: Array<{ key: ActivityFilters["energy"]; label: string }> = [
  { key: "all", label: "All energy levels" },
  { key: "low", label: "Low energy" },
  { key: "medium", label: "Medium energy" },
  { key: "high", label: "High energy" },
];

const ENERGY_SECTIONS: Array<{
  key: EnergyLevel;
  title: string;
  description: string;
}> = [
  {
    key: "low",
    title: "Low energy / Toddlers",
    description: "Calmer options for little ones, breaks, and parent-friendly pacing.",
  },
  {
    key: "medium",
    title: "Medium energy / Play & explore",
    description: "Balanced activities that mix movement, discovery, and confidence-building.",
  },
  {
    key: "high",
    title: "High energy / Action & challenge",
    description: "Fast, active options for older kids, teams, and high-energy sessions.",
  },
];

function matchAgeFilter(activity: Activity, age: AgeFilterKey) {
  const band = AGE_FILTERS.find((a) => a.key === age);
  if (!band || (band.min == null && band.max == null)) return true;

  const min = band.min ?? 0;
  const max = band.max ?? Number.POSITIVE_INFINITY;

  const activityMin = activity.ageRange.min;
  const activityMax = activity.ageRange.max ?? Number.POSITIVE_INFINITY;

  return activityMin <= max && activityMax >= min;
}

export function ActivitiesExplorer({
  activities,
  locations,
}: {
  activities: Activity[];
  locations: Location[];
}) {
  const [filters, setFilters] = useState<ActivityFilters>({
    age: "all",
    energy: "all",
    location: "all",
  });

  const filtered = useMemo(() => {
    return activities
      .filter((a) => (filters.energy === "all" ? true : a.energyLevel === filters.energy))
      .filter((a) => matchAgeFilter(a, filters.age))
      .filter((a) =>
        filters.location === "all" ? true : a.availableAt.includes(filters.location),
      );
  }, [activities, filters]);

  const grouped = useMemo(() => {
    const map: Record<EnergyLevel, Activity[]> = { low: [], medium: [], high: [] };
    for (const activity of filtered) {
      map[activity.energyLevel].push(activity);
    }
    return map;
  }, [filtered]);

  const locationOptions = useMemo(() => {
    const opts = [
      { value: "all", label: "All locations" },
      ...locations.map((l) => ({ value: l.slug, label: l.city })),
    ];
    const seen = new Set<string>();
    return opts.filter((o) => {
      if (seen.has(o.value)) return false;
      seen.add(o.value);
      return true;
    });
  }, [locations]);

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-4">
          <label className="space-y-1">
            <span className="text-xs font-semibold text-foreground/60">
              Age range
            </span>
            <select
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary/40"
              value={filters.age}
              onChange={(e) => setFilters((f) => ({ ...f, age: e.target.value as AgeFilterKey }))}
            >
              {AGE_FILTERS.map((a) => (
                <option key={a.key} value={a.key}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-xs font-semibold text-foreground/60">
              Energy level
            </span>
            <select
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary/40"
              value={filters.energy}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  energy: e.target.value as ActivityFilters["energy"],
                }))
              }
            >
              {ENERGY_FILTERS.map((e) => (
                <option key={e.key} value={e.key}>
                  {e.label}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-xs font-semibold text-foreground/60">
              Location
            </span>
            <select
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary/40"
              value={filters.location}
              onChange={(e) =>
                setFilters((f) => ({ ...f, location: e.target.value }))
              }
            >
              {locationOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-end">
            <Button
              variant="outline"
              size="md"
              className="w-full"
              onClick={() => setFilters({ age: "all", energy: "all", location: "all" })}
            >
              Clear filters
            </Button>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4 text-sm text-foreground/70">
          <p>
            Showing{" "}
            <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "activity" : "activities"}
          </p>
          <p className="hidden sm:block">
            Tip: tap a city chip to open that location&apos;s page (hours, directions, and
            contact).
          </p>
        </div>
      </div>

      <div className="space-y-12">
        {ENERGY_SECTIONS.map((section) => {
          const items = grouped[section.key];
          if (!items.length) return null;

          return (
            <section key={section.key} className="space-y-5">
              <div className="flex items-end justify-between gap-6">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {section.title}
                  </h2>
                  <p className="text-sm leading-6 text-foreground/70">
                    {section.description}
                  </p>
                </div>
                <Badge variant="soft">
                  {items.length} {items.length === 1 ? "activity" : "activities"}
                </Badge>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                {items.map((activity) => (
                  <ActivityCard
                    key={activity.id}
                    activity={activity}
                    availableLocations={locations.filter((l) =>
                      activity.availableAt.includes(l.slug),
                    )}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {!filtered.length ? (
          <div className="rounded-2xl border border-border bg-muted/25 p-8 text-sm text-foreground/70">
            No activities match these filters. Try clearing filters or choosing a
            different age range.
          </div>
        ) : null}
      </div>
    </div>
  );
}
