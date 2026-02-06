"use client";

import { useEffect, useMemo, useState } from "react";
import type { Hours } from "@/data";
import { cn } from "@/lib/cn";
import { getOpenNowLabel } from "@/lib/hours";

export function LocationOpenStatus({
  hours,
  className,
}: {
  hours: Hours;
  className?: string;
}) {
  const [now, setNow] = useState<Date>(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  const result = useMemo(() => {
    return getOpenNowLabel(hours, now);
  }, [hours, now]);

  return (
    <span
      className={cn(
        "truncate",
        result.state === "open" ? "text-secondary" : "text-foreground/70",
        className,
      )}
    >
      {result.label}
    </span>
  );
}
