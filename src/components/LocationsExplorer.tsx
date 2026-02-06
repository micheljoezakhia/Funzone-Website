"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Location } from "@/data";
import { Badge } from "@/components/Badge";
import { Button, ButtonLink } from "@/components/Button";
import { FilterBar, type LocationFilters } from "@/components/FilterBar";
import { LocationCard } from "@/components/LocationCard";
import { LocationOpenStatus } from "@/components/LocationOpenStatus";
import { cn } from "@/lib/cn";
import { directionsHref, formatLocationType, hoursSummary } from "@/lib/format";

type NeighborhoodId = "near-beirut" | "mountain-day" | "bekaa-outing" | "sports-training";

const NEIGHBORHOODS: Array<{
  id: NeighborhoodId;
  title: string;
  description: string;
  filter: (location: Location) => boolean;
}> = [
  {
    id: "near-beirut",
    title: "Near Beirut",
    description:
      "Quick drive and easy drop-ins. Great for after-school plans and short visits.",
    filter: (l) => ["Beit Mery", "Antelias", "Dbayeh"].includes(l.city),
  },
  {
    id: "mountain-day",
    title: "Mountain day out",
    description:
      "A change of scenery with a calmer pace. Ideal for weekends and longer playtime.",
    filter: (l) => ["Rayfoun", "Beit Mery"].includes(l.city),
  },
  {
    id: "bekaa-outing",
    title: "Bekaa outing",
    description:
      "Planning a Zahle day? Pick this when you want a simple, family-friendly stop.",
    filter: (l) => l.city === "Zahle",
  },
  {
    id: "sports-training",
    title: "Sports training",
    description:
      "Fields, courts, and structured training. Best for teams, practice, and active sessions.",
    filter: (l) => l.type === "sports",
  },
];

function getHighlight(location: Location) {
  if (location.type === "sports") return { label: "Fields & courts", iconName: "soccer" as const };
  if (location.hasBirthdays) return { label: "Birthdays", iconName: "cake" as const };
  return { label: location.tags[0] ?? "Family-friendly", iconName: "sparkles" as const };
}

export function LocationsExplorer({
  locations,
  cities,
  activities,
}: {
  locations: Location[];
  cities: string[];
  activities: Array<{ id: string; name: string }>;
}) {
  const [query, setQuery] = useState("");
  const [neighborhood, setNeighborhood] = useState<NeighborhoodId | null>(null);
  const [filters, setFilters] = useState<LocationFilters>({
    type: "all",
    city: "all",
    activity: "all",
  });
  const [compareMode, setCompareMode] = useState(false);
  const [compareSlugs, setCompareSlugs] = useState<string[]>([]);
  const [compareHint, setCompareHint] = useState<string | null>(null);

  const locationBySlug = useMemo(() => {
    return new Map(locations.map((l) => [l.slug, l] as const));
  }, [locations]);

  const activityNameById = useMemo(() => {
    return new Map(activities.map((a) => [a.id, a.name] as const));
  }, [activities]);

  const neighborhoodCounts = useMemo(() => {
    return NEIGHBORHOODS.reduce<Record<NeighborhoodId, number>>((acc, n) => {
      acc[n.id] = locations.filter(n.filter).length;
      return acc;
    }, {} as Record<NeighborhoodId, number>);
  }, [locations]);

  const filtered = useMemo(() => {
    let list = locations
      .filter((l) => (filters.type === "all" ? true : l.type === filters.type))
      .filter((l) => (filters.city === "all" ? true : l.city === filters.city))
      .filter((l) =>
        filters.activity === "all" ? true : l.activities.includes(filters.activity),
      );

    if (neighborhood) {
      const rule = NEIGHBORHOODS.find((n) => n.id === neighborhood);
      if (rule) list = list.filter(rule.filter);
    }

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((l) => {
        const activityNames = l.activities
          .map((id) => activityNameById.get(id) ?? id)
          .join(" ");
        const haystack = [
          l.name,
          l.city,
          l.addressText,
          activityNames,
          l.tags.join(" "),
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      });
    }

    return list;
  }, [locations, filters, neighborhood, query, activityNameById]);

  const compareLocations = useMemo(() => {
    return compareSlugs
      .map((slug) => locationBySlug.get(slug))
      .filter(Boolean) as Location[];
  }, [compareSlugs, locationBySlug]);

  function resetAll() {
    setQuery("");
    setNeighborhood(null);
    setFilters({ type: "all", city: "all", activity: "all" });
    setCompareMode(false);
    setCompareSlugs([]);
    setCompareHint(null);
  }

  function toggleCompare(slug: string) {
    if (!compareMode) return;
    setCompareHint(null);
    setCompareSlugs((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) {
        setCompareHint("Compare up to 3 locations at a time.");
        return prev;
      }
      return [...prev, slug];
    });
  }

  return (
    <div className="space-y-10">
      <section className="-mx-4 border-b border-border bg-muted/20 pt-12 pb-10 sm:-mx-6 lg:-mx-16">
        <div className="px-4 sm:px-6 lg:px-16">
          <div className="space-y-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary">{locations.length} locations</Badge>
                  <Badge variant="soft">Playgrounds + sports</Badge>
                </div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Find your nearest branch
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-foreground/70 sm:text-base">
                  Search by city, branch, or activity, then open a location page for
                  directions, hours, and quick actions.
                </p>
              </div>

              <Link
                href="/contact"
                className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
              >
                Need help choosing? WhatsApp →
              </Link>
            </div>

            <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
              <label className="space-y-2">
                <span className="text-xs font-semibold text-foreground/60">
                  Search
                </span>
                <div className="relative">
                  <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Try “Antelias”, “Zahle”, “football”, “toddler”…"
                    className={cn(
                      "h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground shadow-sm outline-none transition",
                      "focus-visible:ring-2 focus-visible:ring-primary/40",
                    )}
                  />
                  {query ? (
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-3 py-2 text-xs font-semibold text-foreground/70 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      Clear
                    </button>
                  ) : null}
                </div>
              </label>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full lg:w-auto"
                  onClick={resetAll}
                  disabled={
                    !query &&
                    !neighborhood &&
                    filters.type === "all" &&
                    filters.city === "all" &&
                    filters.activity === "all" &&
                    !compareMode
                  }
                >
                  Reset
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-foreground/60">
                Quick:
              </span>
              {(
                [
                  { id: "playground", label: "Playgrounds" },
                  { id: "sports", label: "Sports Zone" },
                ] as const
              ).map((opt) => {
                const isActive = filters.type === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, type: isActive ? "all" : opt.id }))
                    }
                    className={cn(
                      "h-9 rounded-full border border-border bg-background px-4 text-sm font-medium transition",
                      "hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                      isActive ? "border-primary/20 bg-primary/10 text-primary" : "text-foreground/80",
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold tracking-tight">Quick picks</h2>
            <p className="text-sm text-foreground/70">
              Choose a vibe to narrow down, then refine with filters.
            </p>
          </div>

          {neighborhood ? (
            <button
              type="button"
              onClick={() => setNeighborhood(null)}
              className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Clear quick pick
            </button>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {NEIGHBORHOODS.map((n) => {
            const isActive = neighborhood === n.id;
            const count = neighborhoodCounts[n.id];
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => setNeighborhood((prev) => (prev === n.id ? null : n.id))}
                className={cn(
                  "group flex h-full flex-col rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition",
                  "hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive ? "border-primary/20 bg-primary/5" : undefined,
                )}
              >
                <p className="text-sm font-semibold tracking-tight">{n.title}</p>
                <p className="mt-2 text-sm leading-6 text-foreground/70">
                  {n.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant="outline">
                    {count} {count === 1 ? "location" : "locations"}
                  </Badge>
                  <span className="text-sm font-medium text-primary transition-colors group-hover:text-primary/80">
                    Show →
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-6">
        <FilterBar cities={cities} activities={activities} value={filters} onChange={setFilters} />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-foreground/70">
            Showing{" "}
            <span className="font-semibold text-foreground">{filtered.length}</span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">{locations.length}</span>
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {compareHint ? (
              <span className="text-xs font-medium text-foreground/70">
                {compareHint}
              </span>
            ) : null}

            <button
              type="button"
              aria-pressed={compareMode}
              onClick={() => {
                setCompareMode((v) => {
                  const next = !v;
                  if (!next) {
                    setCompareSlugs([]);
                    setCompareHint(null);
                  }
                  return next;
                });
              }}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium transition",
                "hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                compareMode ? "border-primary/20 bg-primary/10 text-primary" : "text-foreground/80",
              )}
            >
              {compareMode ? "Exit compare" : "Compare"}
              {compareMode ? (
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold text-foreground/70">
                  {compareSlugs.length}/3
                </span>
              ) : null}
            </button>
          </div>
        </div>

        {compareMode ? (
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <p className="text-sm font-semibold tracking-tight">
                  Compare locations
                </p>
                <p className="text-sm text-foreground/70">
                  Select 2–3 locations to compare hours, age range, and what each
                  branch is best for.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCompareSlugs([]);
                    setCompareHint(null);
                  }}
                  disabled={!compareSlugs.length}
                >
                  Clear
                </Button>
              </div>
            </div>

            <div className="mt-5">
              {compareLocations.length < 2 ? (
                <p className="text-sm text-foreground/70">
                  Pick at least two cards below to see a side-by-side comparison.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {compareLocations.map((l) => {
                    const highlight = getHighlight(l);
                    return (
                      <div
                        key={l.id}
                        className="overflow-hidden rounded-xl border border-border bg-muted"
                      >
                        <div className="relative aspect-[16/10] w-full bg-muted">
                          <Image
                            src={l.gallery[0] ?? "/images/locations/Story.jpg"}
                            alt={`${l.name} photo`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 33vw"
                            className="object-cover"
                          />
                        </div>

                        <div className="space-y-3 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 space-y-1">
                              <Badge variant="primary">{formatLocationType(l.type)}</Badge>
                              <p className="truncate text-sm font-semibold tracking-tight">
                                {l.name}
                              </p>
                              <p className="truncate text-sm text-foreground/70">
                                {l.city}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                setCompareSlugs((prev) => prev.filter((s) => s !== l.slug))
                              }
                              className="rounded-lg px-2 py-1 text-xs font-semibold text-foreground/70 transition hover:bg-background/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                            >
                              Remove
                            </button>
                          </div>

                          <div className="space-y-2 text-sm text-foreground/80">
                            <p className="inline-flex items-center gap-2">
                              <span className="text-foreground/60">Status:</span>
                              <LocationOpenStatus hours={l.hours} />
                            </p>
                            <p className="inline-flex items-center gap-2">
                              <span className="text-foreground/60">Age:</span>
                              <span>{l.ageRange}</span>
                            </p>
                            <p className="inline-flex items-center gap-2">
                              <span className="text-foreground/60">Hours:</span>
                              <span className="truncate">{hoursSummary(l.hours)}</span>
                            </p>
                            <p className="inline-flex items-center gap-2">
                              <span className="text-foreground/60">Best for:</span>
                              <span className="inline-flex items-center gap-2">
                                <span>{highlight.label}</span>
                                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-background text-foreground/70 ring-1 ring-border">
                                  <span className="sr-only">{highlight.label}</span>
                                  <span aria-hidden="true">•</span>
                                </span>
                              </span>
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-2 pt-1">
                            <ButtonLink href={`/locations/${l.slug}`} size="sm">
                              View
                            </ButtonLink>
                            <a
                              href={directionsHref(l.coordinates.lat, l.coordinates.lng)}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex h-9 items-center justify-center rounded-full border border-border bg-background px-4 text-sm font-medium text-foreground transition hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                              Directions
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : null}

        {filtered.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((l) => (
              <LocationCard
                key={l.id}
                location={l}
                compareMode={compareMode}
                selected={compareSlugs.includes(l.slug)}
                onToggleSelect={toggleCompare}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
            <p className="text-base font-semibold tracking-tight">No results</p>
            <p className="mt-2 text-sm text-foreground/70">
              Try clearing filters or searching by city (for example: Antelias,
              Zahle).
            </p>
            <div className="mt-5 flex justify-center">
              <Button variant="outline" size="md" onClick={resetAll}>
                Reset
              </Button>
            </div>
          </div>
        )}

        <div className="-mx-4 rounded-none border-t border-border bg-muted/20 px-4 py-8 sm:-mx-6 sm:px-6 lg:-mx-16 lg:px-16">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-base font-semibold tracking-tight">Next step</p>
              <p className="text-sm text-foreground/70">
                Tap any location to view hours, WhatsApp, and directions.
              </p>
            </div>
            <ButtonLink href="/contact" variant="secondary">
              WhatsApp us
            </ButtonLink>
          </div>
        </div>
      </section>
    </div>
  );
}
