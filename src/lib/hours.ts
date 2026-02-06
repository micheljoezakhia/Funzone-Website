import type { Hours, HoursDayKey, HoursRange } from "@/data";

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
    // Throws RangeError for invalid TZ.
    new Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
    return timeZone;
  } catch {
    return null;
  }
}

function parseTime(value: string): number | null {
  const match = /^(\d{2}):(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;
  if (hour < 0 || hour > 23) return null;
  if (minute < 0 || minute > 59) return null;
  return hour * 60 + minute;
}

function formatWeekdayShort(timeZone: string, date: Date) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "short",
    }).format(date);
  } catch {
    return null;
  }
}

function getDayKey(timeZone: string, date: Date): HoursDayKey | null {
  const weekday = formatWeekdayShort(timeZone, date);
  if (!weekday) return null;
  return DAY_KEY_BY_WEEKDAY[weekday] ?? null;
}

function getMinutesInTimeZone(timeZone: string, date: Date): number | null {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(date);

    const hour = Number(parts.find((p) => p.type === "hour")?.value);
    const minute = Number(parts.find((p) => p.type === "minute")?.value);
    if (!Number.isFinite(hour) || !Number.isFinite(minute)) return null;
    return hour * 60 + minute;
  } catch {
    return null;
  }
}

function isOpenNowForRange(range: HoursRange, minutesNow: number): boolean {
  const open = parseTime(range.open);
  const close = parseTime(range.close);
  if (open == null || close == null) return false;

  // Handle edge cases like overnight ranges (rare here).
  if (close <= open) {
    const nowAdjusted = minutesNow < open ? minutesNow + 24 * 60 : minutesNow;
    const closeAdjusted = close + 24 * 60;
    return nowAdjusted >= open && nowAdjusted < closeAdjusted;
  }

  return minutesNow >= open && minutesNow < close;
}

export type OpenNowResult =
  | {
      state: "open";
      label: "Open now";
    }
  | {
      state: "closed";
      label: string;
    }
  | {
      state: "unknown";
      label: string;
    };

export function getOpenNowLabel(hours: Hours, now: Date = new Date()): OpenNowResult {
  const timeZone = safeTimeZone(hours.timezone);
  if (!timeZone) {
    return { state: "unknown", label: "Hours on request" };
  }

  const minutesNow = getMinutesInTimeZone(timeZone, now);
  const todayKey = getDayKey(timeZone, now);
  if (minutesNow == null || !todayKey) {
    return { state: "unknown", label: "Hours on request" };
  }

  const today = hours.regular[todayKey];
  if (today !== "closed" && isOpenNowForRange(today, minutesNow)) {
    return { state: "open", label: "Open now" };
  }

  // Find the soonest next opening time (today later, then next days).
  if (today !== "closed") {
    const todayOpen = parseTime(today.open);
    if (todayOpen != null && minutesNow < todayOpen) {
      return { state: "closed", label: `Opens at ${today.open}` };
    }
  }

  for (let offsetDays = 1; offsetDays <= 7; offsetDays++) {
    const candidateDate = new Date(now.getTime() + offsetDays * 24 * 60 * 60 * 1000);
    const key = getDayKey(timeZone, candidateDate);
    if (!key) continue;

    const schedule = hours.regular[key];
    if (schedule === "closed") continue;

    if (offsetDays === 1) {
      return { state: "closed", label: `Opens tomorrow at ${schedule.open}` };
    }

    const weekday = formatWeekdayShort(timeZone, candidateDate) ?? "soon";
    return { state: "closed", label: `Opens ${weekday} at ${schedule.open}` };
  }

  return { state: "closed", label: "Closed (hours on request)" };
}
