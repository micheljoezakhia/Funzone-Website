"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/Icon";
import type { IconName } from "@/data";
import { cn } from "@/lib/cn";

export type TrustItem = {
  title: string;
  description: string;
  iconName?: IconName;
  imageSrc?: string;
  imageAlt?: string;
};

export function TrustCarousel({
  items,
  className,
}: {
  items: TrustItem[];
  className?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  const safeItems = useMemo(() => items.filter((i) => i.title.trim()), [items]);

  useEffect(() => {
    if (isInteracting) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;
    if (safeItems.length < 2) return;

    const id = window.setInterval(() => {
      const el = scrollerRef.current;
      if (!el) return;
      const firstChild = el.firstElementChild as HTMLElement | null;
      const step = firstChild ? firstChild.offsetWidth + 24 : 320;

      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }

      el.scrollBy({ left: step, behavior: "smooth" });
    }, 5000);

    return () => window.clearInterval(id);
  }, [isInteracting, safeItems.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const scroller: HTMLDivElement = el;

    let isDown = false;
    let startX = 0;
    let startScrollLeft = 0;

    function onPointerDown(e: PointerEvent) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      isDown = true;
      setIsInteracting(true);
      scroller.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startScrollLeft = scroller.scrollLeft;
      scroller.classList.add("cursor-grabbing");
    }

    function onPointerMove(e: PointerEvent) {
      if (!isDown) return;
      const dx = e.clientX - startX;
      scroller.scrollLeft = startScrollLeft - dx;
    }

    function onPointerUp(e: PointerEvent) {
      if (!isDown) return;
      isDown = false;
      try {
        scroller.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
      scroller.classList.remove("cursor-grabbing");
      window.setTimeout(() => setIsInteracting(false), 1200);
    }

    scroller.addEventListener("pointerdown", onPointerDown);
    scroller.addEventListener("pointermove", onPointerMove);
    scroller.addEventListener("pointerup", onPointerUp);
    scroller.addEventListener("pointercancel", onPointerUp);

    return () => {
      scroller.removeEventListener("pointerdown", onPointerDown);
      scroller.removeEventListener("pointermove", onPointerMove);
      scroller.removeEventListener("pointerup", onPointerUp);
      scroller.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  if (!safeItems.length) return null;

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scrollerRef}
        className={cn(
          "flex flex-nowrap snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none]",
          "w-full min-w-0 cursor-grab select-none scroll-smooth touch-pan-y",
          "[-ms-overflow-style:none]",
        )}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        onFocusCapture={() => setIsInteracting(true)}
        onBlurCapture={() => setIsInteracting(false)}
        aria-label="Trust highlights"
      >
        {safeItems.map((item, idx) => (
          <article
            key={`${item.title}-${idx}`}
            className={cn(
              "group flex w-[84%] shrink-0 snap-start flex-col rounded-2xl border border-border bg-card p-8 shadow-sm",
              "min-h-[320px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
              "sm:w-[65%] lg:min-h-[340px] lg:w-[340px] xl:w-[360px]",
            )}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              {item.imageSrc ? (
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt ?? item.title}
                  width={40}
                  height={40}
                  draggable={false}
                  className="h-8 w-8 select-none object-contain"
                />
              ) : item.iconName ? (
                <Icon name={item.iconName} className="h-6 w-6 text-primary" strokeWidth={2.25} />
              ) : null}
            </div>

            <h3 className="mt-5 text-lg font-semibold tracking-tight">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-foreground/70">{item.description}</p>
          </article>
        ))}
      </div>

      <style jsx>{`
        div[aria-label="Trust highlights"]::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
