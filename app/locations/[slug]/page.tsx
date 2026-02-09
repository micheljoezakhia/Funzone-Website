import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BranchOpenNow } from "@/components/BranchOpenNow";
import { BranchSectionTabs } from "@/components/BranchSectionTabs";
import { LocationsLiveMap } from "@/components/LocationsLiveMap";
import type { HoursDayKey, Location } from "@/data";
import { getActivitiesByIds, getLocationBySlug, LOCATIONS } from "@/data";
import { directionsHref, hoursSummary, telHref, whatsappHref } from "@/lib/format";

export function generateStaticParams() {
  return LOCATIONS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const location = getLocationBySlug(slug);
  if (!location) return { title: "Location not found" };

  return {
    title: branchTitle(location),
    description: location.shortDescription,
    alternates: { canonical: `/locations/${location.slug}` },
  };
}

const DAYS: Array<{ key: HoursDayKey; label: string }> = [
  { key: "mon", label: "Monday" },
  { key: "tue", label: "Tuesday" },
  { key: "wed", label: "Wednesday" },
  { key: "thu", label: "Thursday" },
  { key: "fri", label: "Friday" },
  { key: "sat", label: "Saturday" },
  { key: "sun", label: "Sunday" },
];

const MATERIAL_ICON_BY_ACTIVITY_ID: Record<string, string> = {
  "soft-play": "toys",
  "toddler-zone": "stroller",
  trampolines: "sports_gymnastics",
  "ninja-course": "bolt",
  arcade: "sports_esports",
  "birthday-parties": "celebration",
  "private-room": "meeting_room",
  catering: "restaurant",
  "water-slides": "water",
  "water-playground": "water",
  "family-pool": "pool",
  football: "sports_soccer",
  basketball: "sports_basketball",
  padel: "sports_tennis",
  gymnastics: "sports_gymnastics",
  fitness: "fitness_center",
};

const RULES: Array<{ icon: string; title: string; description: string }> = [
  {
    icon: "checkroom",
    title: "Grip socks",
    description:
      "For safety and hygiene, grip socks are recommended for kids in play areas. Bring your own or ask at the counter.",
  },
  {
    icon: "family_restroom",
    title: "Supervision",
    description:
      "Children should be supervised by a parent/guardian. Please follow staff instructions inside all zones.",
  },
  {
    icon: "restaurant",
    title: "Food & drinks",
    description:
      "Outside food policies can vary by branch or event. WhatsApp this location to confirm what’s allowed.",
  },
  {
    icon: "schedule",
    title: "Arrive early",
    description:
      "For parties, groups, or reservations, arrive 10–15 minutes early to check in and get settled.",
  },
];

function formatAddress(addressText: string) {
  return addressText
    .replace(/\s*-\s*\(address placeholder\)\s*$/i, "")
    .replace(/\s*\(address placeholder\)\s*$/i, "");
}

function branchTitle(location: Location) {
  if (location.type === "sports") return location.name;
  const base = location.name.replace(/^Fun Zone\s*/i, "").trim();
  if (!base) return `${location.city} Branch`;
  return `${base} Branch`;
}

function branchCrumbLabel(location: Location) {
  if (location.type === "sports") return location.city;
  const base = location.name.replace(/^Fun Zone\s*/i, "").trim();
  return base || location.city;
}

function formatTime12h(value: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(value.trim());
  if (!match) return value;

  const hour24 = Number(match[1]);
  const minute = Number(match[2]);
  if (!Number.isFinite(hour24) || !Number.isFinite(minute)) return value;

  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  if (minute === 0) return `${hour12}:00 ${period}`;
  return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}

function replaceTimesWith12h(label: string) {
  return label.replace(/\b(\d{2}:\d{2})\b/g, (m) => formatTime12h(m));
}

function formatRange(open: string, close: string) {
  return `${formatTime12h(open)} - ${formatTime12h(close)}`;
}

function activityIcon(activityId: string) {
  return MATERIAL_ICON_BY_ACTIVITY_ID[activityId] ?? "sparkles";
}

function formatActivityAge(activity: ReturnType<typeof getActivitiesByIds>[number]) {
  const range = activity.ageRange;
  if (range.max == null) return `Ages ${range.min}+`;
  if (range.min === range.max) return `Age ${range.min}`;
  return `Ages ${range.min}-${range.max}`;
}

function faqsForLocation(location: Location) {
  const title = branchTitle(location);
  const sports = location.type === "sports";

  return [
    {
      q: sports ? "Do I need to book a court/field?" : "Do I need to book in advance?",
      a: sports
        ? "Yes—bookings help us confirm availability. WhatsApp this location with your preferred day/time and we’ll guide you."
        : "Weekends can get busy. Walk-ins are welcome when capacity allows, but WhatsApp is the fastest way to confirm before you come.",
    },
    {
      q: "Are socks required?",
      a: "For safety and hygiene, grip socks are recommended for kids entering play areas. You can bring your own or purchase at the counter (subject to availability).",
    },
    {
      q: "Can we bring outside food?",
      a: "Outside food policies vary by branch and event type. Message us on WhatsApp and we’ll confirm what’s allowed for your visit.",
    },
    ...(location.hasBirthdays
      ? [
          {
            q: "How do I book a birthday?",
            a: `Message ${title} on WhatsApp with your preferred date, number of kids, and package type—we’ll confirm availability and next steps.`,
          },
        ]
      : []),
  ];
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return (
      <div className="bg-background-light font-jakarta text-[#0d171c] dark:bg-background-dark dark:text-white">
        <div className="mx-auto w-full max-w-[1200px] px-6 py-16">
          <div className="rounded-2xl border border-gray-100 bg-white p-10 text-center shadow-sm dark:border-gray-800 dark:bg-[#1e2e37]">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
              404
            </p>
            <h1 className="mt-2 text-2xl font-extrabold md:text-3xl">
              Branch not found
            </h1>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
              We couldn’t find this location:{" "}
              <span className="font-semibold text-[#0d171c] dark:text-white">
                {slug}
              </span>
              .
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {LOCATIONS.map((l) => (
                <Link
                  key={l.id}
                  href={`/locations/${l.slug}`}
                  className="rounded-2xl border border-gray-100 bg-background-light px-5 py-4 text-left transition-colors hover:bg-white dark:border-gray-800 dark:bg-[#101c22] dark:hover:bg-[#1e2e37]"
                >
                  <p className="text-sm font-bold">{branchTitle(l)}</p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {l.city}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/locations"
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white transition-all hover:brightness-110"
              >
                Back to locations
              </Link>
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-full border border-gray-200 bg-white px-6 text-sm font-bold text-[#0d171c] transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-[#1e2e37] dark:text-white dark:hover:bg-white/5"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const title = branchTitle(location);
  const crumb = branchCrumbLabel(location);
  const address = formatAddress(location.addressText);
  const heroImage = location.gallery[0] ?? "/favicon.ico";
  const activities = getActivitiesByIds(location.activities);
  const featureActivities = activities.slice(0, 6);
  const activityPhotoPool =
    location.gallery.length > 1 ? location.gallery.slice(1) : location.gallery;

  const hoursLabel = replaceTimesWith12h(hoursSummary(location.hours));
  const directionsLink = directionsHref(location.coordinates.lat, location.coordinates.lng);
  const whatsappMessage = `Hi! I have a question about ${title}.`;
  const faqs = faqsForLocation(location);

  return (
    <div className="bg-background-light font-jakarta text-[#0d171c] dark:bg-background-dark dark:text-white">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-6 md:px-10">
        <section className="relative h-[450px] overflow-hidden rounded-xl bg-gray-200 shadow-2xl">
          <Image
            src={heroImage}
            alt={`${location.name} hero`}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 55%)",
            }}
            aria-hidden="true"
          />

          <div className="absolute bottom-0 left-0 flex flex-col gap-2 p-6 md:p-10">
            <nav className="flex items-center gap-2 text-sm font-medium text-white/80">
              <Link href="/locations" className="transition-colors hover:text-white">
                Locations
              </Link>
              <span className="material-symbols-outlined text-xs" aria-hidden="true">
                chevron_right
              </span>
              <span className="text-white">{crumb}</span>
            </nav>

            <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              {title}
            </h1>
            <p className="max-w-xl text-lg text-white/90">
              {location.shortDescription}
            </p>
          </div>
        </section>

        <section className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Quick Connect
            </span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary" aria-hidden="true">
                location_on
              </span>
              <span className="font-semibold">{address}</span>
            </div>
          </div>

          <div className="flex w-full gap-4 md:w-auto">
            <a
              href={telHref(location.phone)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white transition-transform hover:scale-[1.02] md:flex-none"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                call
              </span>
              Call Us
            </a>

            <a
              href={whatsappHref(location.whatsapp, whatsappMessage)}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-bold text-white transition-transform hover:scale-[1.02] md:flex-none"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                chat
              </span>
              WhatsApp
            </a>

            <a
              href={directionsLink}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gray-100 px-6 py-3 font-bold text-[#0d171c] transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 md:flex-none"
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                directions
              </span>
              Directions
            </a>
          </div>
        </section>

        <BranchSectionTabs
          className="mt-6"
          tabs={[
            { id: "about", label: "Overview", icon: "info" },
            { id: "activities", label: "Activities", icon: "toys" },
            { id: "schedule", label: "Schedule", icon: "schedule" },
            { id: "rules", label: "Rules", icon: "gavel" },
            { id: "faq", label: "FAQ", icon: "help" },
          ]}
        />

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            <section id="about" className="scroll-mt-40">
              <h2 className="mb-4 text-2xl font-bold">About this location</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>{location.shortDescription}</p>
                {activities.length ? (
                  <p>
                    Popular here:{" "}
                    <span className="font-semibold text-[#0d171c] dark:text-white">
                      {activities
                        .slice(0, 5)
                        .map((a) => a.name)
                        .join(", ")}
                      {activities.length > 5 ? ", and more." : "."}
                    </span>
                  </p>
                ) : null}
              </div>
            </section>

            <section id="activities" className="scroll-mt-40">
              <h2 className="mb-6 text-2xl font-bold">What’s at {crumb}?</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {featureActivities.map((activity, idx) => {
                  const photo =
                    activityPhotoPool[idx % Math.max(activityPhotoPool.length, 1)] ??
                    heroImage;

                  return (
                  <div
                    key={activity.id}
                    className="group overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="relative h-28 w-full bg-gray-200 dark:bg-gray-800">
                      <Image
                        src={photo}
                        alt={`${activity.name} at ${title}`}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                        aria-hidden="true"
                      />
                      <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-primary shadow-sm backdrop-blur-sm">
                        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                          {activityIcon(activity.id)}
                        </span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3 className="font-bold">{activity.name}</h3>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {formatActivityAge(activity)}
                      </p>
                    </div>
                  </div>
                  );
                })}
              </div>
            </section>

            <section id="schedule" className="scroll-mt-40">
              <h2 className="mb-6 text-2xl font-bold">Schedule</h2>
              <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-bold">Opening hours</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {hoursLabel}
                    </p>
                  </div>
                  <BranchOpenNow hours={location.hours} />
                </div>

                <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  All times are local ({location.hours.timezone}).
                </p>

                <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
                  {DAYS.map((day) => {
                    const range = location.hours.regular[day.key];
                    const label =
                      range === "closed"
                        ? "Closed"
                        : formatRange(range.open, range.close);

                    return (
                      <div
                        key={day.key}
                        className="flex items-center justify-between py-3 text-sm"
                      >
                        <span className="font-semibold">{day.label}</span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <section id="rules" className="scroll-mt-40">
              <h2 className="mb-6 text-2xl font-bold">Rules</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {RULES.map((rule) => (
                  <div
                    key={rule.title}
                    className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <span
                        className="material-symbols-outlined text-primary"
                        aria-hidden="true"
                      >
                        {rule.icon}
                      </span>
                      <p className="font-bold">{rule.title}</p>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {rule.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section id="faq" className="scroll-mt-40">
              <h2 className="mb-6 text-2xl font-bold">Common Questions</h2>
              <div className="flex flex-col gap-4">
                {faqs.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all open:shadow-md dark:border-gray-800 dark:bg-gray-900 [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-3">
                      <span className="font-bold">{item.q}</span>
                      <span
                        className="material-symbols-outlined shrink-0 transition duration-300 group-open:-rotate-180"
                        aria-hidden="true"
                      >
                        expand_more
                      </span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="mb-6 text-xl font-bold">Branch Details</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined mt-1 text-primary" aria-hidden="true">
                    schedule
                  </span>
                  <div>
                    <p className="font-bold">Opening Hours</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {hoursLabel}
                    </p>
                    <BranchOpenNow hours={location.hours} className="mt-2" />
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined mt-1 text-primary" aria-hidden="true">
                    groups
                  </span>
                  <div>
                    <p className="font-bold">Age Group</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {location.ageRange}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined mt-1 text-primary" aria-hidden="true">
                    shield
                  </span>
                  <div>
                    <p className="font-bold">Safety</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Staff-supervised zones and clear on-site guidance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-100 pt-8 dark:border-gray-800">
                <p className="mb-4 text-xs font-bold uppercase text-gray-400">
                  Location Map
                </p>
                <div className="h-48 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
                  <LocationsLiveMap
                    locations={[location]}
                    showZoomControls={false}
                    showAttribution={false}
                  />
                </div>

                <a
                  href={directionsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                >
                  Get Directions
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    arrow_outward
                  </span>
                </a>
              </div>
            </div>

            {location.hasBirthdays ? (
              <div className="rounded-xl border border-primary/20 bg-primary/10 p-8">
                <h3 className="mb-2 text-xl font-extrabold text-primary">
                  Host a Party!
                </h3>
                <p className="mb-6 text-sm text-[#0d171c]/70 dark:text-white/70">
                  Make your child&apos;s birthday unforgettable with our packages.
                </p>
                <Link
                  href="/birthdays"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-primary py-3 font-bold text-white transition-colors hover:brightness-110"
                >
                  View Packages
                </Link>
              </div>
            ) : null}
          </aside>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/locations"
            className="inline-flex h-11 items-center justify-center rounded-full border border-gray-200 bg-white px-6 text-sm font-bold text-[#0d171c] transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-[#1e2e37] dark:text-white dark:hover:bg-white/5"
          >
            Back to locations
          </Link>

          <a
            href={whatsappHref(location.whatsapp, whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white transition-all hover:brightness-110"
          >
            Message this branch
          </a>
        </div>
      </div>
    </div>
  );
}
