import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import { directionsHref, telHref, whatsappHref } from "@/lib/format";

function ActionLink({
  href,
  children,
  variant = "primary",
  external = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  external?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    outline:
      "border border-border bg-background text-foreground hover:bg-muted/50",
  } as const;

  const rel = external ? "noreferrer" : undefined;
  const target = external ? "_blank" : undefined;

  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(base, variants[variant], className)}
    >
      {children}
    </a>
  );
}

export function CTAButtons({
  phone,
  whatsapp,
  coordinates,
  locationName,
}: {
  phone: string;
  whatsapp: string;
  coordinates: { lat: number; lng: number };
  locationName?: string;
}) {
  const msg = locationName
    ? `Hi! I'd like to ask about ${locationName}.`
    : "Hi! I'd like to ask about Fun Zone / Sports Zone.";

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <ActionLink
        href={directionsHref(coordinates.lat, coordinates.lng)}
        variant="primary"
        external
      >
        <Icon name="map" className="h-4 w-4" />
        Get Directions
      </ActionLink>
      <ActionLink href={whatsappHref(whatsapp, msg)} variant="secondary" external>
        <Icon name="message" className="h-4 w-4" />
        WhatsApp
      </ActionLink>
      <ActionLink href={telHref(phone)} variant="outline">
        <Icon name="phone" className="h-4 w-4" />
        Call
      </ActionLink>
    </div>
  );
}
