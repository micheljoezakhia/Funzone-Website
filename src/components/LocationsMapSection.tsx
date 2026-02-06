"use client";

import { useEffect, useState } from "react";
import type { Location } from "@/data";
import { directionsHref } from "@/lib/format";
import { LocationsLiveMap } from "@/components/LocationsLiveMap";

const MAP_BG_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBG4Cr9ZxC099zXF3GCqQ586x5_M5xZm6K90fB4gwn8IHIDBO1u5S8k1gP5e-xS0bQQvamiUfUMAODDhmgf8vxjKRLk6NYn4FGiNU_aKOlsPR2cwpP2aoq8Oy9oVHMuEr-63_sOjO6bslTl67vJ5jDOI5ahhkXIoXnLSm3VVYOPmvJGBiMx6bTxEwWp8y-lvCHk8tlMc1B-F0XncTByCZZDHUmGOwM6nOyeuro2znh44vggIL7OndYewQ_uLaWIMv0ymsK2DxqJt_Q";

function appleMapsHref(lat: number, lng: number, label: string) {
  const q = encodeURIComponent(label);
  return `https://maps.apple.com/?q=${q}&ll=${lat},${lng}`;
}

function googleAllBranchesHref(locations: Location[]) {
  if (locations.length === 0) return "https://www.google.com/maps";
  if (locations.length === 1) {
    const { lat, lng } = locations[0].coordinates;
    return directionsHref(lat, lng);
  }

  const origin = locations[0].coordinates;
  const destination = locations[locations.length - 1].coordinates;
  const waypoints = locations
    .slice(1, -1)
    .map((l) => `${l.coordinates.lat},${l.coordinates.lng}`)
    .join("|");

  const params = new URLSearchParams({
    api: "1",
    origin: `${origin.lat},${origin.lng}`,
    destination: `${destination.lat},${destination.lng}`,
  });

  if (waypoints) params.set("waypoints", waypoints);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function appleAllBranchesHref(locations: Location[]) {
  if (locations.length === 0) return "https://maps.apple.com/";
  if (locations.length === 1) {
    const l = locations[0];
    return appleMapsHref(l.coordinates.lat, l.coordinates.lng, l.name);
  }

  const daddr = locations
    .map((l) => `${l.coordinates.lat},${l.coordinates.lng}`)
    .join("+to:");
  return `https://maps.apple.com/?daddr=${encodeURIComponent(daddr)}`;
}

const VARIANTS = {
  green: {
    container: "bg-[#e7f4ef] dark:bg-[#152e25]",
    overlayOpacity: "opacity-40 dark:opacity-20",
    card: "bg-white/80 dark:bg-black/60",
    accentBg: "bg-[#0df2a6]",
    accentText: "text-[#0d1c17]",
    pin: "text-[#0df2a6]",
    button:
      "bg-[#0d1c17] text-white hover:opacity-90 dark:bg-white dark:text-[#0d1c17]",
    ringOffset: "ring-offset-white dark:ring-offset-[#152e25]",
  },
  blue: {
    container: "bg-[#f3f4f6] dark:bg-[#101d22]",
    overlayOpacity: "opacity-35 dark:opacity-15",
    card: "bg-white/90 dark:bg-black/50",
    accentBg: "bg-primary",
    accentText: "text-white",
    pin: "text-primary",
    button: "bg-primary text-white hover:bg-sky-700",
    ringOffset: "ring-offset-white dark:ring-offset-[#101d22]",
  },
  orange: {
    container: "bg-[#f3f4f6] dark:bg-[#101d22]",
    overlayOpacity: "opacity-35 dark:opacity-15",
    card: "bg-white/90 dark:bg-black/50",
    accentBg: "bg-orange-500",
    accentText: "text-white",
    pin: "text-orange-500",
    button: "bg-orange-500 text-white hover:bg-orange-500/90",
    ringOffset: "ring-offset-white dark:ring-offset-[#101d22]",
  },
} as const;

export function LocationsMapSection({
  locations,
  variant = "blue",
}: {
  locations: Location[];
  variant?: keyof typeof VARIANTS;
}) {
  const [open, setOpen] = useState(false);
  const styles = VARIANTS[variant];

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <section className="w-full pb-24">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div
          className={`relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-3xl p-4 sm:p-6 lg:p-8 ${styles.container}`}
        >
          <div
            aria-hidden="true"
            className={`absolute inset-0 ${styles.overlayOpacity}`}
            style={{
              backgroundImage: `url('${MAP_BG_IMAGE}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <div className="relative z-10 flex w-full flex-col items-center">
            <div
              className={`flex max-w-lg flex-col items-center gap-6 rounded-2xl p-8 text-center shadow-lg backdrop-blur-md ${styles.card}`}
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-full shadow-lg ${styles.accentBg} ${styles.accentText}`}
              >
                <span
                  className="material-symbols-outlined text-3xl"
                  aria-hidden="true"
                >
                  map
                </span>
              </div>

              <div>
                <h3 className="mb-2 text-2xl font-bold text-[#0d1c17] dark:text-white">
                  Explore Interactive Map
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  View all our branches on the map to find the easiest route to
                  fun.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(true)}
                className={`h-12 w-full rounded-full font-bold transition-all ${styles.button}`}
              >
                Launch Map View
              </button>
            </div>
          </div>

          <div
            className="absolute left-1/4 top-1/4 animate-bounce"
            style={{ animationDuration: "2000ms" }}
            aria-hidden="true"
          >
            <span className={`material-symbols-outlined text-4xl drop-shadow-md ${styles.pin}`}>
              location_on
            </span>
          </div>
          <div
            className="absolute bottom-1/3 right-1/4 animate-bounce"
            style={{ animationDuration: "2500ms" }}
            aria-hidden="true"
          >
            <span className={`material-symbols-outlined text-4xl drop-shadow-md ${styles.pin}`}>
              location_on
            </span>
          </div>
          <div
            className="absolute left-2/3 top-1/2 animate-bounce"
            style={{ animationDuration: "3000ms" }}
            aria-hidden="true"
          >
            <span className={`material-symbols-outlined text-4xl drop-shadow-md ${styles.pin}`}>
              location_on
            </span>
          </div>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Locations map"
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white p-4 shadow-2xl dark:border-gray-800 dark:bg-[#0c1a15] sm:p-6"
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-[#0d1c17] dark:text-white">
                  Lebanon map
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-300">
                  All branches are shown at once. Tap a pin to open links.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className={`inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white p-2 text-[#0d1c17] transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-[#10221c] dark:text-white dark:hover:bg-[#152e25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 ${styles.ringOffset}`}
                aria-label="Close map"
              >
                <span className="material-symbols-outlined text-xl" aria-hidden="true">
                  close
                </span>
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-[#10221c]">
              <div className="h-[60vh] min-h-[420px] w-full">
                <LocationsLiveMap locations={locations} />
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <a
                href={googleAllBranchesHref(locations)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0c1a15]"
              >
                <span className="material-symbols-outlined text-base" aria-hidden="true">
                  map
                </span>
                Open all in Google Maps
              </a>
              <a
                href={appleAllBranchesHref(locations)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-[#0d1c17] transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-[#10221c] dark:text-white dark:hover:bg-[#152e25] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0c1a15]"
              >
                <span
                  className="material-symbols-outlined text-base text-primary"
                  aria-hidden="true"
                >
                  directions
                </span>
                Open all in Apple Maps
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
