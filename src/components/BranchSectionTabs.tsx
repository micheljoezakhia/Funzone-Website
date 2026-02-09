"use client";

import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/cn";

type Tab = {
  id: string;
  label: string;
  icon: string;
};

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
}

export function BranchSectionTabs({
  tabs,
  offset = 144,
  className,
}: {
  tabs: Tab[];
  offset?: number;
  className?: string;
}) {
  const [activeId, setActiveId] = useState<string>(() => tabs[0]?.id ?? "");

  const tabIds = useMemo(() => tabs.map((t) => t.id), [tabs]);

  useEffect(() => {
    if (!tabIds.length) return;

    const sections = tabIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        const next = visible[0]?.target?.id;
        if (next && tabIds.includes(next)) setActiveId(next);
      },
      {
        root: null,
        rootMargin: `-${offset}px 0px -60% 0px`,
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [tabIds, offset]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };

  return (
    <div className={cn("sticky top-20 z-40", className)}>
      <div className="rounded-2xl border border-gray-100 bg-white/90 py-2 shadow-lg shadow-black/5 backdrop-blur-md dark:border-gray-800 dark:bg-[#1e2e37]/80">
        <div className="overflow-x-auto">
          <div
            role="tablist"
            aria-label="Branch sections"
            className="inline-flex min-w-full items-center gap-2 px-2 sm:min-w-0"
          >
            {tabs.map((tab) => {
              const active = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls={tab.id}
                  onClick={() => scrollTo(tab.id)}
                  className={cn(
                    "inline-flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark",
                    active
                      ? "bg-primary text-white shadow-sm"
                      : "bg-transparent text-[#0d171c] hover:bg-gray-100/70 dark:text-white dark:hover:bg-white/10",
                  )}
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
