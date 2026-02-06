import Link from "next/link";
import Image from "next/image";
import type { Location } from "@/data";
import { Badge } from "@/components/Badge";
import { Icon } from "@/components/Icon";
import { LocationOpenStatus } from "@/components/LocationOpenStatus";
import { formatLocationType } from "@/lib/format";
import { cn } from "@/lib/cn";

export function LocationCard({
  location,
  compareMode = false,
  selected = false,
  onToggleSelect,
  className,
}: {
  location: Location;
  compareMode?: boolean;
  selected?: boolean;
  onToggleSelect?: (slug: string) => void;
  className?: string;
}) {
  const highlight =
    location.type === "sports"
      ? "Fields & courts"
      : location.hasBirthdays
        ? "Birthdays"
        : location.tags[0] ?? "Family-friendly";

  const highlightIcon =
    location.type === "sports"
      ? "soccer"
      : location.hasBirthdays
        ? "cake"
        : "sparkles";

  return (
    <Link
      href={`/locations/${location.slug}`}
      className={cn(
        "group block overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all",
        "hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        selected ? "border-primary/30 ring-2 ring-primary/15" : undefined,
        className,
      )}
    >
      <div className="relative aspect-[16/10] w-full bg-muted">
        <Image
          src={location.gallery[0] ?? "/images/locations/Story.jpg"}
          alt={`${location.name} photo`}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          priority={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/0 to-black/0" />

        {compareMode ? (
          <button
            type="button"
            aria-pressed={selected}
            aria-label={selected ? "Remove from compare" : "Add to compare"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleSelect?.(location.slug);
            }}
            className={cn(
              "absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition",
              "hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              selected ? "border-primary/25 bg-primary/10 text-primary" : undefined,
            )}
          >
            <Icon name="check" className={cn("h-5 w-5", selected ? "opacity-100" : "opacity-40")} />
          </button>
        ) : null}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-2">
            <Badge variant="primary">{formatLocationType(location.type)}</Badge>

            <div className="space-y-1">
              <h3 className="truncate text-base font-semibold tracking-tight text-foreground">
                {location.name}
              </h3>
              <p className="inline-flex items-center gap-2 text-sm text-foreground/70">
                <Icon name="map" className="h-4 w-4 text-foreground/60" />
                <span className="truncate">{location.city}</span>
              </p>
            </div>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-muted/40 px-3 py-2 text-sm font-medium text-primary transition-colors group-hover:bg-muted/70">
            View
            <Icon name="arrow-right" className="h-4 w-4" />
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-foreground/70">
          <div className="inline-flex items-center gap-2">
            <Icon name="clock" className="h-4 w-4 text-foreground/60" />
            <LocationOpenStatus hours={location.hours} />
          </div>
          <div className="inline-flex items-center gap-2">
            <Icon name="users" className="h-4 w-4 text-foreground/60" />
            <span className="truncate">{location.ageRange}</span>
          </div>
          <div className="inline-flex items-center gap-2">
            <Icon name={highlightIcon} className="h-4 w-4 text-foreground/60" />
            <span className="truncate">{highlight}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
