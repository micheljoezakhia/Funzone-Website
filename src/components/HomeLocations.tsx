"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Location, LocationType } from "@/data";
import { Badge } from "@/components/Badge";
import { Icon } from "@/components/Icon";
import { LebanonMiniMap } from "@/components/LebanonMiniMap";
import { LocationOpenStatus } from "@/components/LocationOpenStatus";
import { cn } from "@/lib/cn";
import { formatLocationType } from "@/lib/format";

type TypeFilter = LocationType | "all";

function ToggleButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "h-9 rounded-full px-4 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active
          ? "bg-muted text-foreground"
          : "text-foreground/70 hover:bg-muted hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function typeBadgeClassName(type: LocationType) {
  return type === "sports"
    ? "border-secondary/20 bg-secondary/10 text-secondary"
    : undefined;
}

export function HomeLocations({ locations }: { locations: Location[] }) {
  const [type, setType] = useState<TypeFilter>("all");
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (type === "all") return locations;
    return locations.filter((l) => l.type === type);
  }, [locations, type]);

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="space-y-5" onMouseLeave={() => setActiveSlug(null)}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex w-fit items-center gap-1 rounded-full border border-border bg-background p-1">
            <ToggleButton active={type === "all"} onClick={() => setType("all")}>
              All
            </ToggleButton>
            <ToggleButton
              active={type === "playground"}
              onClick={() => setType("playground")}
            >
              Playgrounds
            </ToggleButton>
            <ToggleButton active={type === "sports"} onClick={() => setType("sports")}>
              Sports Park
            </ToggleButton>
          </div>

          <p className="text-sm text-foreground/60">
            Showing{" "}
            <span className="font-semibold text-foreground">{filtered.length}</span>
          </p>
        </div>

        <ul className="divide-y divide-border">
          {filtered.map((l, idx) => {
            const isActive = activeSlug ? activeSlug === l.slug : false;
            const label = `${l.name} - ${l.city}`;

            return (
              <li key={l.id}>
                <Link
                  href={`/locations/${l.slug}`}
                  aria-label={label}
                  onMouseEnter={() => setActiveSlug(l.slug)}
                  onFocus={() => setActiveSlug(l.slug)}
                  className={cn(
                    "group flex items-start justify-between gap-4 rounded-2xl px-3 py-5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive ? "bg-muted" : "hover:bg-muted",
                  )}
                >
                  <div className="flex min-w-0 flex-1 gap-3">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-background text-xs font-semibold text-foreground/80 ring-1 ring-border",
                        isActive ? "text-primary ring-primary" : undefined,
                      )}
                    >
                      {idx + 1}
                    </span>

                    <div className="min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="primary" className={typeBadgeClassName(l.type)}>
                          {formatLocationType(l.type)}
                        </Badge>
                        <span className="inline-flex items-center gap-2 text-xs text-foreground/60">
                          <Icon name="clock" className="h-3.5 w-3.5" />
                          <LocationOpenStatus hours={l.hours} />
                        </span>
                      </div>

                      <div className="space-y-1">
                        <p className="truncate text-sm font-semibold tracking-tight text-foreground sm:text-base">
                          {l.name}
                        </p>
                        <p className="inline-flex items-center gap-2 text-sm text-foreground/70">
                          <Icon name="map" className="h-4 w-4 text-foreground/60" />
                          <span className="truncate">{l.city}</span>
                        </p>
                      </div>

                      <p className="text-sm font-medium text-primary">View location</p>
                    </div>
                  </div>

                  <Icon
                    name="arrow-right"
                    className="mt-1 h-5 w-5 text-foreground/60 transition-colors group-hover:text-primary"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <LebanonMiniMap
        locations={filtered}
        activeSlug={activeSlug}
        onActiveChange={setActiveSlug}
      />
    </div>
  );
}
