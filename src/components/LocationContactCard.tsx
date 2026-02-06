import Link from "next/link";
import type { Location } from "@/data";
import { Badge } from "@/components/Badge";
import { CTAButtons } from "@/components/CTAButtons";
import { Icon } from "@/components/Icon";
import { formatLocationType, hoursSummary } from "@/lib/format";

export function LocationContactCard({ location }: { location: Location }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-foreground/60">
            {formatLocationType(location.type)}
          </p>
          <Link
            href={`/locations/${location.slug}`}
            className="text-base font-semibold tracking-tight transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {location.name}
          </Link>
        </div>
        <Badge variant="soft">{location.city}</Badge>
      </div>

      <div className="mt-4 space-y-2 text-sm text-foreground/80">
        <div className="inline-flex items-start gap-2">
          <Icon name="map" className="mt-0.5 h-4 w-4 text-foreground/60" />
          <p className="leading-6">{location.addressText}</p>
        </div>
        <div className="inline-flex items-start gap-2">
          <Icon name="clock" className="mt-0.5 h-4 w-4 text-foreground/60" />
          <p className="leading-6">{hoursSummary(location.hours)}</p>
        </div>
        <div className="inline-flex items-start gap-2">
          <Icon name="phone" className="mt-0.5 h-4 w-4 text-foreground/60" />
          <p className="leading-6">{location.phone}</p>
        </div>
      </div>

      <div className="mt-5">
        <CTAButtons
          phone={location.phone}
          whatsapp={location.whatsapp}
          coordinates={location.coordinates}
          locationName={location.name}
        />
      </div>
    </div>
  );
}

