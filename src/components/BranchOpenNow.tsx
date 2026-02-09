"use client";

import { useEffect, useMemo, useState } from "react";
import type { Hours, HoursDayKey, HoursRange } from "@/data";
import { cn } from "@/lib/cn";
import { getOpenNowLabel } from "@/lib/hours";

const DAY_KEY_BY_WEEKDAY: Record<string, HoursDayKey> = {
  Mon: "mon",
  Tue: "tue",
  Wed: "wed",
  Thu: "thu",
  Fri: "fri",
  Sat: "sat",
  Sun: "sun",
};

function safeTimeZone(timeZone: string): string | null {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
    return timeZone;
  } catch {
    return null;
  }
}

function getDayKey(timeZone: string, date: Date): HoursDayKey | null {
  try {
    const weekday = new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "short",
    }).format(date);
    return DAY_KEY_BY_WEEKDAY[weekday] ?? null;
  } catch {
    return null;
  }
}

function formatTime12h(value: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(value.trim());
  if (!match) return value;

  const hour24 = Number(match[1]);
  const minute = Number(match[2]);
  if (!Number.isFinite(hour24) || !Number.isFinite(minute)) return value;

  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  if (minute === 0) return `${hour12} ${period}`;
  return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}

function replaceTimesWith12h(label: string) {
  return label.replace(/\b(\d{2}:\d{2})\b/g, (m) => formatTime12h(m));
}

function getTodayRange(hours: Hours, now: Date): HoursRange | null {
  const timeZone = safeTimeZone(hours.timezone);
  if (!timeZone) return null;

  const key = getDayKey(timeZone, now);
  if (!key) return null;

  const today = hours.regular[key];
  if (today === "closed") return null;
  return today;
}

export function BranchOpenNow({
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

  const result = useMemo(() => getOpenNowLabel(hours, now), [hours, now]);
  const today = useMemo(() => getTodayRange(hours, now), [hours, now]);

  const statusText =
    result.state === "open"
      ? "Open Now"
      : result.state === "closed"
        ? "Closed"
        : "Hours";

  const dotClass =
    result.state === "open"
      ? "bg-green-500 animate-pulse"
      : result.state === "closed"
        ? "bg-gray-400"
        : "bg-amber-400";

  const statusClass =
    result.state === "open"
      ? "text-green-600 dark:text-green-400"
      : "text-[#5e7a70] dark:text-gray-300";

  const detailText =
    result.state === "open" && today?.close
      ? `Closes at ${formatTime12h(today.close)}`
      : replaceTimesWith12h(result.label);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className={cn("flex h-2.5 w-2.5 rounded-full", dotClass)} />
      <span className={cn("text-xs font-bold uppercase tracking-wider", statusClass)}>
        {statusText}
      </span>
      <span className="text-xs text-[#5e7a70] dark:text-gray-300">
        • {detailText}
      </span>
    </div>
  );
}

