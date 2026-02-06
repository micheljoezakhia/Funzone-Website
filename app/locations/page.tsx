import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LocationsMapSection } from "@/components/LocationsMapSection";
import { LOCATIONS } from "@/data";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find the nearest Fun Zone branch in Lebanon. Browse locations, view activities, and open directions in one tap.",
};

const TAG_PILLS: Record<string, { label: string; icon: string }> = {
  indoor: { label: "INDOOR", icon: "home" },
  outdoor: { label: "OUTDOOR", icon: "sunny" },
  "toddler-friendly": { label: "TODDLER ZONE", icon: "stroller" },
  "party-rooms": { label: "PARTY ROOMS", icon: "cake" },
  parking: { label: "PARKING", icon: "local_parking" },
  "family-seating": { label: "PARENT SEATING", icon: "chair" },
  "high-energy": { label: "HIGH ENERGY", icon: "bolt" },
  spacious: { label: "SPACIOUS", icon: "open_in_full" },
  "easy-access": { label: "EASY ACCESS", icon: "near_me" },
  "all-weather": { label: "ALL WEATHER", icon: "cloud" },
  "family-friendly": { label: "FAMILY", icon: "family_restroom" },
  lights: { label: "LIGHTS", icon: "wb_incandescent" },
  "changing-rooms": { label: "CHANGING ROOMS", icon: "checkroom" },
  "team-friendly": { label: "TEAM FRIENDLY", icon: "groups" },
};

function formatAddress(addressText: string) {
  return addressText
    .replace(/\s*-\s*\(address placeholder\)\s*$/i, "")
    .replace(/\s*\(address placeholder\)\s*$/i, "");
}

function mapsHref(lat: number, lng: number) {
  const query = encodeURIComponent(`${lat},${lng}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export default function LocationsPage() {
  return (
    <div
      className="font-jakarta min-h-screen overflow-x-hidden bg-[#f6f7f8] text-[#111618] dark:bg-[#101d22] dark:text-white"
    >
      <section className="mx-auto max-w-4xl px-4 py-16 text-center md:py-24">
        <div className="flex flex-col items-center gap-4">
          <span className="rounded-full bg-primary/10 px-4 py-1 text-[11px] font-extrabold uppercase tracking-widest text-primary dark:bg-primary/10">
            Find your fun
          </span>

          <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-[#111618] dark:text-white md:text-6xl">
            <span className="text-[#111618] dark:text-white">Our</span>{" "}
            <span className="text-primary">Locations</span>
          </h1>

          <p className="max-w-2xl text-lg font-medium text-gray-500 dark:text-gray-300">
            Discover the ultimate playground. Pick your nearest destination and
            let&apos;s play!
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {LOCATIONS.map((location, idx) => {
            const title =
              location.type === "sports"
                ? location.name
                : `${location.city} Branch`;
            const address = formatAddress(location.addressText);
            const pills = location.tags
              .map((t) => TAG_PILLS[t])
              .filter(Boolean)
              .slice(0, 3);
            const imageSrc = location.gallery[0] ?? "/favicon.ico";

            return (
              <article
                key={location.id}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-[#121e24]"
              >
                <Link
                  href={`/locations/${location.slug}`}
                  className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#121e24]"
                  aria-label={`Open ${title}`}
                >
                  <span className="sr-only">Open {title}</span>
                </Link>

                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    alt={`${location.name} photo`}
                    src={imageSrc}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority={idx < 2}
                  />

                  <div className="absolute left-4 top-4">
                    {idx === 0 ? (
                      <span className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-white shadow-sm">
                        Flagship
                      </span>
                    ) : location.type === "sports" ? (
                      <span className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-white shadow-sm">
                        Sports
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-5 p-6 md:p-7">
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-[#111618] dark:text-white">
                      {title}
                    </h2>
                    <div className="mt-2 flex items-start gap-2 text-sm font-medium text-gray-500 dark:text-gray-300">
                      <span
                        className="material-symbols-outlined mt-0.5 text-base text-primary"
                        aria-hidden="true"
                      >
                        location_on
                      </span>
                      <p className="text-sm font-medium">{address}</p>
                    </div>
                  </div>

                  {pills.length ? (
                    <div className="flex flex-wrap gap-2">
                      {pills.map((pill) => (
                        <span
                          key={pill.label}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gray-600 dark:border-white/10 dark:bg-[#101d22] dark:text-gray-200"
                        >
                          <span
                            className="material-symbols-outlined text-sm text-primary"
                            aria-hidden="true"
                          >
                            {pill.icon}
                          </span>
                          {pill.label}
                        </span>
                      ))}
                    </div>
                  ) : null}

                  <div className="mt-auto grid grid-cols-2 gap-3 pt-1">
                    <Link
                      href={`/locations/${location.slug}#activities`}
                      className="relative z-20 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-extrabold text-white shadow-sm transition-all hover:bg-sky-700"
                    >
                      View Activities
                    </Link>

                    <a
                      href={mapsHref(
                        location.coordinates.lat,
                        location.coordinates.lng,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      className="relative z-20 inline-flex h-11 items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 text-sm font-extrabold text-[#111618] transition-colors hover:bg-gray-50 dark:border-white/10 dark:bg-[#101d22] dark:text-white dark:hover:bg-white/5"
                    >
                      <span
                        className="material-symbols-outlined text-base"
                        aria-hidden="true"
                      >
                        map
                      </span>
                      Maps
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <LocationsMapSection locations={LOCATIONS} />
    </div>
  );
}
