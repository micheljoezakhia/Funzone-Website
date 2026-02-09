"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import type { Activity, AgeRange, EnergyLevel } from "@/data";
import { cn } from "@/lib/cn";
import { useActivitiesFilters } from "./ActivitiesFiltersProvider";

function ageLabel(range: AgeRange) {
  if (range.max == null) return `${range.min}+ yrs`;
  if (range.min === range.max) return `${range.min} yrs`;
  return `${range.min}-${range.max} yrs`;
}

function energyPill(level: EnergyLevel) {
  switch (level) {
    case "high":
      return { label: "High Energy", className: "bg-red-100 text-red-600" };
    case "medium":
      return { label: "Active", className: "bg-orange-100 text-orange-600" };
    case "low":
    default:
      return { label: "Calm", className: "bg-emerald-100 text-emerald-700" };
  }
}

function categoryPill(category: Activity["category"]) {
  switch (category) {
    case "Water Park":
      return { className: "bg-sky-100 text-sky-700" };
    case "Birthdays & Events":
      return { className: "bg-purple-100 text-purple-700" };
    case "Sports":
      return { className: "bg-green-100 text-green-700" };
    case "Kids Playground":
    default:
      return { className: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-100" };
  }
}

function activityIconName(activityId: string) {
  switch (activityId) {
    case "soft-play":
      return "toys";
    case "water-slides":
      return "water";
    case "water-playground":
      return "pool";
    case "family-pool":
      return "pool";
    case "trampolines":
      return "sports_gymnastics";
    case "toddler-zone":
      return "child_care";
    case "ninja-course":
      return "bolt";
    case "arcade":
      return "sports_esports";
    case "birthday-parties":
      return "celebration";
    case "private-room":
      return "door_front";
    case "catering":
      return "restaurant";
    case "football":
      return "sports_soccer";
    case "basketball":
      return "sports_basketball";
    case "padel":
      return "sports_tennis";
    case "gymnastics":
      return "sports_gymnastics";
    case "fitness":
      return "fitness_center";
    default:
      return "star";
  }
}

function activityImageSrc(activityId: string) {
  return `https://picsum.photos/seed/fz-activity-${encodeURIComponent(activityId)}/1400/900`;
}

export function ActivitiesYearRound() {
  const { filteredActivities, selectedBranch, openFilters } = useActivitiesFilters();

  const accentActivityId = useMemo(() => {
    const accent =
      filteredActivities.find((a) => a.id === "soft-play") ??
      filteredActivities.find((a) => a.id === "toddler-zone");
    return accent?.id ?? null;
  }, [filteredActivities]);

  const featuredActivityId = useMemo(() => {
    const canAccent = filteredActivities.length >= 5;
    const accentId = canAccent ? accentActivityId : null;
    return (
      filteredActivities.find((activity) => activity.id !== accentId)?.id ??
      filteredActivities[0]?.id ??
      null
    );
  }, [accentActivityId, filteredActivities]);

  const detailsHref = selectedBranch
    ? `/locations/${selectedBranch.slug}#activities`
    : "/locations#branches";

  return (
    <section id="year-round" className="scroll-mt-28" aria-label="Year round">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight">
            Year-Round Sports &amp; Play
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Showing{" "}
            <span className="font-bold text-[#0d171c] dark:text-white">
              {filteredActivities.length}
            </span>{" "}
            activities{" "}
            {selectedBranch ? (
              <>
                at{" "}
                <span className="font-bold text-[#0d171c] dark:text-white">
                  {selectedBranch.name}
                </span>
                .
              </>
            ) : (
              "across all branches."
            )}
          </p>
        </div>

        <button
          type="button"
          onClick={openFilters}
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-[#0d171c] shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:border-gray-700 dark:bg-[#1e2e37] dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-offset-background-dark"
        >
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            {selectedBranch ? "location_on" : "tune"}
          </span>
          {selectedBranch ? selectedBranch.city : "Filter by branch"}
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            expand_more
          </span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:auto-rows-fr">
        {filteredActivities.map((activity) => {
          const energy = energyPill(activity.energyLevel);
          const category = categoryPill(activity.category);
          const icon = activityIconName(activity.id);
          const imageSrc = activityImageSrc(activity.id);

          const canAccent = filteredActivities.length >= 5;
          const isAccent = canAccent && accentActivityId === activity.id;
          const isFeatured = featuredActivityId === activity.id && !isAccent;

          if (isAccent) {
            return (
              <article
                key={activity.id}
                className="relative overflow-hidden rounded-3xl bg-primary shadow-sm lg:col-span-1 lg:row-span-2"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-10"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="relative z-10 flex h-full flex-col p-8 text-white">
                  <span
                    className="material-symbols-outlined mb-6 text-5xl"
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-[10px] font-black uppercase">
                      {activity.category}
                    </span>
                    <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-[10px] font-black uppercase">
                      {ageLabel(activity.ageRange)}
                    </span>
                  </div>

                  <h3 className="mb-3 text-2xl font-black">{activity.name}</h3>
                  <p className="mb-8 text-white/80">{activity.description}</p>

                  <ul className="mb-10 space-y-4 text-sm text-white/90">
                    {[
                      "Staff-supervised play",
                      "Safe, family-friendly setup",
                      "Comfortable parent seating",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span
                          className="material-symbols-outlined text-sm"
                          aria-hidden="true"
                        >
                          done
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link
                      href={detailsHref}
                      className="inline-flex w-full items-center justify-center rounded-2xl bg-white py-4 text-sm font-black uppercase tracking-widest text-primary shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            );
          }

          return (
            <article
              key={activity.id}
              className={cn(
                "group flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-[#1e2e37]",
                isFeatured ? "lg:col-span-2" : "lg:col-span-1",
              )}
            >
              <div className="relative h-56 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image
                  src={imageSrc}
                  alt={activity.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-[10px] font-black uppercase",
                      energy.className,
                    )}
                  >
                    {energy.label}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-[10px] font-black uppercase",
                      category.className,
                    )}
                  >
                    {activity.category}
                  </span>
                </div>

                <div className="absolute right-5 top-5 rounded-2xl bg-white/90 p-2 text-primary shadow-sm backdrop-blur-sm dark:bg-black/40">
                  <span className="material-symbols-outlined text-xl" aria-hidden="true">
                    {icon}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-8">
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold uppercase text-gray-400">
                  <span className="inline-flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      aria-hidden="true"
                    >
                      group
                    </span>
                    {ageLabel(activity.ageRange)}
                  </span>
                  <span aria-hidden="true">•</span>
                  <span className="inline-flex items-center gap-1">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      aria-hidden="true"
                    >
                      location_on
                    </span>
                    {selectedBranch ? selectedBranch.city : "Multiple branches"}
                  </span>
                </div>

                <h3 className="mb-2 text-xl font-bold">{activity.name}</h3>
                <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                  {activity.description}
                </p>

                <div className="mt-auto flex items-center gap-3">
                  <Link
                    href={detailsHref}
                    className="inline-flex flex-1 items-center justify-center rounded-xl bg-primary py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1e2e37]"
                  >
                    Details
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-primary transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-gray-700 dark:bg-[#1e2e37] dark:hover:bg-white/10 dark:focus-visible:ring-offset-[#1e2e37]"
                    aria-label="Ask about this activity"
                  >
                    <span className="material-symbols-outlined" aria-hidden="true">
                      chat
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
