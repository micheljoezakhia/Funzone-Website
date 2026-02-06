"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

export type HeroSlide = {
  src: string;
  alt: string;
  title?: string;
  meta?: string;
  href?: string;
  badge?: string;
};

export function HeroCarousel({
  slides,
  className,
  viewportClassName,
  imageClassName,
  showGradientOverlay = true,
  showDots = true,
}: {
  slides: HeroSlide[];
  className?: string;
  viewportClassName?: string;
  imageClassName?: string;
  showGradientOverlay?: boolean;
  showDots?: boolean;
}) {
  const safeSlides = useMemo(() => slides.filter((s) => Boolean(s.src)), [slides]);
  const [active, setActive] = useState(0);

  if (!safeSlides.length) return null;

  const count = safeSlides.length;
  const current = safeSlides[active] ?? safeSlides[0]!;

  function prev() {
    setActive((p) => (p - 1 + count) % count);
  }

  function next() {
    setActive((p) => (p + 1) % count);
  }

  return (
    <section className={cn("relative", className)} aria-label="Highlights">
      <div
        className={cn(
          "relative w-full overflow-hidden bg-muted",
          viewportClassName ?? "h-[75vh] min-h-[420px]",
        )}
      >
        {safeSlides.map((slide, idx) => {
          const isActive = idx === active;
          const contents = (
            <>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                sizes="100vw"
                className={cn("object-cover", imageClassName)}
              />
              {showGradientOverlay ? (
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/0" />
              ) : null}
            </>
          );

          const sharedProps = {
            className: cn(
              "absolute inset-0 block",
              isActive ? "opacity-100" : "opacity-0",
              "transition-opacity duration-500 motion-reduce:duration-0",
            ),
            "aria-hidden": isActive ? undefined : true,
            tabIndex: isActive && slide.href ? 0 : -1,
          } as const;

          if (slide.href) {
            return (
              <Link key={`${slide.src}-${idx}`} href={slide.href} {...sharedProps}>
                {contents}
              </Link>
            );
          }

          return (
            <div key={`${slide.src}-${idx}`} {...sharedProps}>
              {contents}
            </div>
          );
        })}

        {showDots ? (
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
            {safeSlides.map((_, idx) => {
              const isActive = idx === active;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full border shadow-sm backdrop-blur-sm transition",
                    isActive
                      ? "border-primary bg-primary"
                      : "border-white/40 bg-white/50 hover:bg-white/70",
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={isActive ? "true" : undefined}
                />
              );
            })}
          </div>
        ) : null}

        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="flex h-full w-full items-stretch justify-between">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="pointer-events-auto h-full w-[22%] cursor-pointer bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-[18%] lg:w-[14%]"
            />

            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="pointer-events-auto h-full w-[22%] cursor-pointer bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-[18%] lg:w-[14%]"
            />
          </div>
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {current.title ? `Current slide: ${current.title}` : "Carousel"}
      </p>
    </section>
  );
}
