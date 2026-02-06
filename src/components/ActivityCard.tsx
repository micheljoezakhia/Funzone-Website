import Link from "next/link";
import type { Activity, EnergyLevel, Location } from "@/data";
import { Badge } from "@/components/Badge";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";

function formatAgeChip(ageRange: Activity["ageRange"]) {
  if (ageRange.max == null) return `Ages ${ageRange.min}+`;
  if (ageRange.min === ageRange.max) return `Age ${ageRange.min}`;
  return `Ages ${ageRange.min}-${ageRange.max}`;
}

function energyMeta(level: EnergyLevel) {
  switch (level) {
    case "low":
      return { label: "Low energy", icon: "moon" as const };
    case "medium":
      return { label: "Medium energy", icon: "sparkles" as const };
    case "high":
      return { label: "High energy", icon: "bolt" as const };
  }
}

export function ActivityCard({
  activity,
  availableLocations = [],
}: {
  activity: Activity;
  availableLocations?: Location[];
}) {
  const energy = energyMeta(activity.energyLevel);

  const helper =
    activity.id === "toddler-zone"
      ? "Popular with toddlers"
      : activity.category === "Birthdays & Events"
        ? "Great for birthdays"
        : null;

  const locationsCount = availableLocations.length;
  const helperText = [
    helper,
    locationsCount
      ? `Available at ${locationsCount} location${locationsCount === 1 ? "" : "s"}`
      : null,
  ]
    .filter(Boolean)
    .join(" | ");

  const tone = activity.category === "Sports" ? "secondary" : "primary";

  return (
    <article className="group relative flex min-h-[252px] flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-within:ring-2 focus-within:ring-primary/30 focus-within:ring-offset-2 focus-within:ring-offset-background">
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-br to-transparent",
          tone === "secondary" ? "from-secondary/12" : "from-primary/12",
        )}
      />

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <span
              className={cn(
                "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-background shadow-sm",
                tone === "secondary" ? "text-secondary" : "text-primary",
              )}
            >
              <Icon name={activity.iconName} className="h-5 w-5" />
            </span>

            <div className="min-w-0">
              <p className="text-xs font-semibold text-foreground/60">
                {activity.category}
              </p>
              <h3 className="mt-1 truncate text-base font-semibold tracking-tight">
                {activity.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-foreground/70">
                {activity.description}
              </p>
              {helperText ? (
                <p className="mt-3 text-xs text-foreground/60">{helperText}</p>
              ) : null}
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2 text-right">
            <Badge variant="soft" className="bg-background/70">
              {formatAgeChip(activity.ageRange)}
            </Badge>
            <Badge variant="outline" className="gap-1 bg-background/70">
              <Icon name={energy.icon} className="h-3.5 w-3.5 text-foreground/60" />
              {energy.label}
            </Badge>
          </div>
        </div>

        <div className="mt-auto pt-5">
          <p className="text-xs font-semibold text-foreground/60">Available at</p>

          <div className="mt-2 flex flex-wrap gap-2">
            {availableLocations.length ? (
              availableLocations.map((l) => (
                <Link
                  key={l.id}
                  href={`/locations/${l.slug}`}
                  className="group/chip focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Badge
                    variant="soft"
                    className="gap-1 transition-colors duration-200 group-hover/chip:bg-muted"
                  >
                    {l.city}
                    <Icon
                      name="arrow-right"
                      className="h-3.5 w-3.5 opacity-0 transition-opacity duration-200 group-hover/chip:opacity-100"
                    />
                  </Badge>
                </Link>
              ))
            ) : (
              <Badge variant="outline">Details coming soon</Badge>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
