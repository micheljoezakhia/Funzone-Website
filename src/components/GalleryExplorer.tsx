"use client";

import { useMemo, useState } from "react";
import type { Location } from "@/data";
import { Button } from "@/components/Button";
import { GalleryGrid, type GalleryItem } from "@/components/GalleryGrid";

type GalleryFilters = {
  location: string | "all";
  activity: string | "all";
};

export function GalleryExplorer({
  locations,
  activities,
}: {
  locations: Location[];
  activities: Array<{ id: string; name: string }>;
}) {
  const [filters, setFilters] = useState<GalleryFilters>({
    location: "all",
    activity: "all",
  });

  const items = useMemo(() => {
    const allowedLocationSlugs =
      filters.activity === "all"
        ? null
        : new Set(
            locations
              .filter((l) => l.activities.includes(filters.activity))
              .map((l) => l.slug),
          );

    const all: Array<GalleryItem & { locationSlug: string }> = locations.flatMap(
      (l) =>
        l.gallery.map((src, idx) => ({
          src,
          alt: `${l.name} photo ${idx + 1} (placeholder)`,
          caption: l.city,
          locationSlug: l.slug,
        })),
    );

    return all
      .filter((i) =>
        filters.location === "all" ? true : i.locationSlug === filters.location,
      )
      .filter((i) => (allowedLocationSlugs ? allowedLocationSlugs.has(i.locationSlug) : true));
  }, [locations, filters]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="space-y-1">
            <span className="text-xs font-semibold text-foreground/60">
              Location
            </span>
            <select
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary/40"
              value={filters.location}
              onChange={(e) => setFilters((p) => ({ ...p, location: e.target.value }))}
            >
              <option value="all">All</option>
              {locations.map((l) => (
                <option key={l.id} value={l.slug}>
                  {l.city}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-1">
            <span className="text-xs font-semibold text-foreground/60">
              Activity
            </span>
            <select
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm text-foreground shadow-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary/40"
              value={filters.activity}
              onChange={(e) => setFilters((p) => ({ ...p, activity: e.target.value }))}
            >
              <option value="all">All</option>
              {activities.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-end">
            <Button
              variant="outline"
              size="md"
              className="w-full"
              onClick={() => setFilters({ location: "all", activity: "all" })}
            >
              Clear filters
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-foreground/70">
        <p>
          Showing <span className="font-semibold text-foreground">{items.length}</span>{" "}
          photos (placeholders)
        </p>
      </div>

      <GalleryGrid items={items} />
    </div>
  );
}

