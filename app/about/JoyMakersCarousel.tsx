"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type Member = {
  name: string;
  role: string;
  img: string;
};

function clampScrollState(el: HTMLDivElement | null) {
  if (!el) return { canLeft: false, canRight: false };
  const maxLeft = el.scrollWidth - el.clientWidth;
  const left = el.scrollLeft;

  return {
    canLeft: left > 2,
    canRight: left < maxLeft - 2,
  };
}

export function JoyMakersCarousel({ members }: { members: Member[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const sync = () => {
    const next = clampScrollState(scrollerRef.current);
    setCanLeft(next.canLeft);
    setCanRight(next.canRight);
  };

  useEffect(() => {
    sync();

    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => sync();
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => sync());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const navButtonClass = (enabled: boolean) =>
    cn(
      "rounded-full p-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark",
      enabled
        ? "bg-primary text-white hover:bg-sky-700"
        : "border border-slate-200 text-slate-800 hover:bg-primary/10 dark:border-slate-800 dark:text-slate-200",
    );

  return (
    <section className="mb-28 md:mb-32">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-12 md:flex-row md:items-end">
        <div>
          <h2 className="mb-4 text-4xl font-black">Meet the Joy-Makers</h2>
          <p className="text-slate-600 dark:text-slate-400">
            The friendly faces behind the fun.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => scrollByAmount("left")}
            className={navButtonClass(canLeft)}
            aria-label="Previous"
            aria-disabled={!canLeft}
            disabled={!canLeft}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_back
            </span>
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount("right")}
            className={navButtonClass(canRight)}
            aria-label="Next"
            aria-disabled={!canRight}
            disabled={!canRight}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_forward
            </span>
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className={cn(
          "flex gap-6 overflow-x-auto scroll-smooth",
          "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
        )}
      >
        {members.map((m) => (
          <div
            key={m.name}
            className="group w-[min(260px,80vw)] flex-none md:w-[calc((100%_-_3*1.5rem)_/_4)]"
          >
            <div className="relative mb-4 aspect-square overflow-hidden rounded-2xl">
              <Image
                src={m.img}
                alt={m.name}
                fill
                sizes="(max-width: 768px) 80vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <h3 className="text-lg font-bold">{m.name}</h3>
            <p className="text-sm font-medium text-primary">{m.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
