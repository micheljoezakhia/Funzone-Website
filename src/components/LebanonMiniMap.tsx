"use client";

import Image from "next/image";
import Link from "next/link";
import type { Location } from "@/data";
import { cn } from "@/lib/cn";

const LEBANON_BOUNDS = {
  // Approx geographic bounds of Lebanon (used only for pin projection).
  latMin: 33.05,
  latMax: 34.7,
  lngMin: 35.1,
  lngMax: 36.65,
} as const;

const MAP_IMAGE_CONTENT_BOUNDS = {
  // Calibrated to `public/images/locations/lebanon.png` (860x1145):
  // non-white pixel bounds: x=[30..829], y=[40..1067]
  leftPct: 3.49,
  rightPct: 96.4,
  topPct: 3.49,
  bottomPct: 93.2,
} as const;

const PIN_SAFE_INSET_PCT = 2.25;
const COLLISION_DISTANCE_PCT = 3.25;
const COLLISION_OFFSET_PCT = 2.35;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getSafeBounds() {
  return {
    xMin: MAP_IMAGE_CONTENT_BOUNDS.leftPct + PIN_SAFE_INSET_PCT,
    xMax: MAP_IMAGE_CONTENT_BOUNDS.rightPct - PIN_SAFE_INSET_PCT,
    yMin: MAP_IMAGE_CONTENT_BOUNDS.topPct + PIN_SAFE_INSET_PCT,
    yMax: MAP_IMAGE_CONTENT_BOUNDS.bottomPct - PIN_SAFE_INSET_PCT,
  };
}

function project(lat: number, lng: number) {
  const nx =
    (lng - LEBANON_BOUNDS.lngMin) /
    (LEBANON_BOUNDS.lngMax - LEBANON_BOUNDS.lngMin);
  const ny =
    (LEBANON_BOUNDS.latMax - lat) /
    (LEBANON_BOUNDS.latMax - LEBANON_BOUNDS.latMin);

  const x =
    MAP_IMAGE_CONTENT_BOUNDS.leftPct +
    nx * (MAP_IMAGE_CONTENT_BOUNDS.rightPct - MAP_IMAGE_CONTENT_BOUNDS.leftPct);
  const y =
    MAP_IMAGE_CONTENT_BOUNDS.topPct +
    ny *
      (MAP_IMAGE_CONTENT_BOUNDS.bottomPct - MAP_IMAGE_CONTENT_BOUNDS.topPct);

  const safe = getSafeBounds();
  return { x: clamp(x, safe.xMin, safe.xMax), y: clamp(y, safe.yMin, safe.yMax) };
}

export function LebanonMiniMap({
  locations,
  activeSlug,
  onActiveChange,
  className,
}: {
  locations: Location[];
  activeSlug?: string | null;
  onActiveChange?: (slug: string | null) => void;
  className?: string;
}) {
  const safe = getSafeBounds();
  const placedPins = locations.reduce<
    Array<{ location: Location; x: number; y: number; index: number }>
  >((acc, location, index) => {
    const projected = project(location.coordinates.lat, location.coordinates.lng);
    let x = projected.x;
    let y = projected.y;

    for (let attempt = 0; attempt < 10; attempt += 1) {
      const overlaps = acc.some((pin) => {
        const dx = pin.x - x;
        const dy = pin.y - y;
        return Math.hypot(dx, dy) < COLLISION_DISTANCE_PCT;
      });

      if (!overlaps) break;

      const angle = (attempt * Math.PI) / 4; // 0,45,90,... degrees
      x = projected.x + Math.cos(angle) * COLLISION_OFFSET_PCT;
      y = projected.y + Math.sin(angle) * COLLISION_OFFSET_PCT;
    }

    acc.push({
      location,
      x: clamp(x, safe.xMin, safe.xMax),
      y: clamp(y, safe.yMin, safe.yMax),
      index,
    });

    return acc;
  }, []);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-1">
        <p className="text-sm font-semibold tracking-tight">Lebanon map</p>
        <p className="text-xs leading-5 text-foreground/60">
          Pins use GPS coordinates. Tap a pin to open the location page.
        </p>
      </div>

      <div
        className="relative aspect-[172/229] w-full"
        onMouseLeave={() => onActiveChange?.(null)}
      >
        <Image
          src="/images/locations/lebanon.png"
          alt="Lebanon map outline"
          fill
          className="pointer-events-none object-contain"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />

        {placedPins.map((pin) => {
          const l = pin.location;
          const x = pin.x;
          const y = pin.y;
          const index = pin.index + 1;
          const pinTone = l.type === "sports" ? "secondary" : "primary";
          const isActive = activeSlug ? l.slug === activeSlug : false;
          const label = `${l.name} (${l.city}) - ${l.coordinates.lat}, ${l.coordinates.lng}`;

          return (
            <Link
              key={l.id}
              href={`/locations/${l.slug}`}
              className={cn(
                "group absolute -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                isActive ? "z-20" : "z-10",
              )}
              style={{ left: `${x}%`, top: `${y}%` }}
              aria-label={label}
              title={label}
              onMouseEnter={() => onActiveChange?.(l.slug)}
              onFocus={() => onActiveChange?.(l.slug)}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-background text-[11px] font-semibold text-white shadow-sm transition-transform duration-200 group-hover:scale-110",
                  pinTone === "secondary" ? "bg-secondary" : "bg-primary",
                  isActive ? "scale-110 ring-4 ring-primary/20" : undefined,
                )}
              >
                {index}
              </span>

              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-[calc(100%+10px)] whitespace-nowrap rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground shadow-sm opacity-0 transition-opacity duration-200",
                  isActive
                    ? "opacity-100"
                    : "group-hover:opacity-100 group-focus-visible:opacity-100",
                )}
              >
                {l.name} - {l.city}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3 text-xs text-foreground/70">
        <span className="inline-flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
          Kids playgrounds
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="h-2 w-2 rounded-full bg-secondary"
            aria-hidden="true"
          />
          Sports park
        </span>
      </div>
    </div>
  );
}

