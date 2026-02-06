import Image from "next/image";
import { Badge } from "@/components/Badge";
import { ButtonLink } from "@/components/Button";
import { cn } from "@/lib/cn";

type HeroCta = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "outline";
};

export function Hero({
  title,
  description,
  badges = [],
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
  children,
  className,
}: {
  title: string;
  description: string;
  badges?: string[];
  primaryCta: HeroCta;
  secondaryCta: HeroCta;
  imageSrc: string;
  imageAlt: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("pt-14 pb-10 sm:pt-18", className)}>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="space-y-6">
          {badges.length ? (
            <div className="flex flex-wrap gap-2">
              {badges.map((b) => (
                <Badge key={b} variant="primary">
                  {b}
                </Badge>
              ))}
            </div>
          ) : null}

          <div className="space-y-3">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {title}
            </h1>
            <p className="text-base leading-7 text-foreground/70 sm:text-lg">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={primaryCta.href} variant={primaryCta.variant ?? "primary"}>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink
              href={secondaryCta.href}
              variant={secondaryCta.variant ?? "outline"}
            >
              {secondaryCta.label}
            </ButtonLink>
          </div>

          {children}
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-border bg-muted shadow-sm">
          <div className="relative aspect-[16/10]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-black/0 to-black/0" />
        </div>
      </div>
    </section>
  );
}

