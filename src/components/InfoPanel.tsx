import type { Location } from "@/data";
import { Icon } from "@/components/Icon";
import { LocationOpenStatus } from "@/components/LocationOpenStatus";
import { hoursSummary } from "@/lib/format";

export function InfoPanel({ location }: { location: Location }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <dl className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-start gap-3">
          <Icon name="map" className="mt-0.5 h-4 w-4 text-foreground/60" />
          <div className="min-w-0">
            <dt className="text-xs font-semibold text-foreground/60">Address</dt>
            <dd className="mt-1 text-sm leading-6 text-foreground/80">
              {location.addressText}
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Icon name="clock" className="mt-0.5 h-4 w-4 text-foreground/60" />
          <div className="min-w-0">
            <dt className="text-xs font-semibold text-foreground/60">Hours</dt>
            <dd className="mt-1 space-y-1">
              <p className="text-sm font-medium">
                <LocationOpenStatus hours={location.hours} />
              </p>
              <p className="text-xs text-foreground/60">
                {hoursSummary(location.hours)}
              </p>
            </dd>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Icon name="users" className="mt-0.5 h-4 w-4 text-foreground/60" />
          <div className="min-w-0">
            <dt className="text-xs font-semibold text-foreground/60">Age Range</dt>
            <dd className="mt-1 text-sm leading-6 text-foreground/80">
              {location.ageRange}
            </dd>
          </div>
        </div>
      </dl>
    </div>
  );
}

