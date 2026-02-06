import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BranchOpenNow } from "@/components/BranchOpenNow";
import type { HoursDayKey, Location } from "@/data";
import { getActivitiesByIds, getLocationBySlug, LOCATIONS } from "@/data";
import { directionsHref, telHref, whatsappHref } from "@/lib/format";

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
    title: getBranchTitle(location),
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

const TAG_FEATURES: Record<string, { icon: string; label: string }> = {
  indoor: { icon: "home", label: "Indoor" },
  outdoor: { icon: "sunny", label: "Outdoor Area" },
  "toddler-friendly": { icon: "stroller", label: "Toddler Zone" },
  "party-rooms": { icon: "cake", label: "Birthday Rooms" },
  parking: { icon: "local_parking", label: "Free Parking" },
  "family-seating": { icon: "chair", label: "Parent Seating" },
  "high-energy": { icon: "bolt", label: "High Energy" },
  spacious: { icon: "open_in_full", label: "Spacious" },
  "easy-access": { icon: "near_me", label: "Easy Access" },
  "all-weather": { icon: "cloud", label: "All Weather" },
  "family-friendly": { icon: "family_restroom", label: "Family Friendly" },
  lights: { icon: "wb_incandescent", label: "Lights" },
  "changing-rooms": { icon: "checkroom", label: "Changing Rooms" },
  "team-friendly": { icon: "groups", label: "Team Friendly" },
};

function formatAddress(addressText: string) {
  return addressText
    .replace(/\s*-\s*\(address placeholder\)\s*$/i, "")
    .replace(/\s*\(address placeholder\)\s*$/i, "");
}

function getBranchTitle(location: Location) {
  if (location.type === "sports") return location.name;
  const base = location.name.replace(/^Fun Zone\s*/i, "").trim();
  if (!base) return `${location.city} Branch`;
  return `${base} Branch`;
}

function formatTime12h(value: string) {
  const match = /^(\d{2}):(\d{2})$/.exec(value.trim());
  if (!match) return value;

  const hour24 = Number(match[1]);
  const minute = Number(match[2]);
  if (!Number.isFinite(hour24) || !Number.isFinite(minute)) return value;

  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
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
      <div className="font-jakarta min-h-screen bg-[#f8fcfa] text-[#0e1b17] dark:bg-[#11211c] dark:text-white">
        <section className="mx-auto max-w-[960px] px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm dark:border-gray-800 dark:bg-[#1e2e28]">
            <p className="text-xs font-bold uppercase tracking-wider text-[#5e7a70] dark:text-gray-300">
              404
            </p>
            <h1 className="mt-2 text-2xl font-extrabold md:text-3xl">
              Branch not found
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#5e7a70] dark:text-gray-300">
              We couldn’t find this location:{" "}
              <span className="font-semibold text-[#0e1b17] dark:text-white">
                {slug}
              </span>
              .
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {LOCATIONS.map((l) => (
                <Link
                  key={l.id}
                  href={`/locations/${l.slug}`}
                  className="rounded-2xl border border-gray-200 bg-[#f8fcfa] px-5 py-4 text-left transition-colors hover:bg-white dark:border-gray-700 dark:bg-[#11211c] dark:hover:bg-gray-800"
                >
                  <p className="text-sm font-bold">{getBranchTitle(l)}</p>
                  <p className="mt-1 text-xs text-[#5e7a70] dark:text-gray-300">
                    {l.city}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/locations"
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white transition-all hover:bg-sky-700"
              >
                Browse locations
              </Link>
              <Link
                href="/"
                className="inline-flex h-11 items-center justify-center rounded-full border border-gray-200 bg-white px-6 text-sm font-bold text-[#0e1b17] transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-[#1e2e28] dark:text-white dark:hover:bg-gray-800"
              >
                Back home
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const title = getBranchTitle(location);
  const address = formatAddress(location.addressText);
  const heroSrc = location.gallery[0] ?? "/images/locations/lebanon.png";
  const directionsLink = directionsHref(
    location.coordinates.lat,
    location.coordinates.lng,
  );

  const whatsappMessage = `Hi! I’d like to ask about visiting ${title}.`;
  const featuredActivities = getActivitiesByIds(location.activities).slice(0, 3);
  const gallery = location.gallery.slice(0, 6);

  const showBirthdays = location.hasBirthdays;

  const quickInfo =
    location.tags
      .map((tag) => TAG_FEATURES[tag])
      .filter(Boolean)
      .slice(0, 4) ?? [];

  return (
    <div
      className="font-jakarta min-h-screen overflow-x-hidden bg-[#f8fcfa] text-[#0e1b17] dark:bg-[#11211c] dark:text-white"
    >
      <section className="group relative h-[520px] w-full md:h-[620px] lg:h-[720px]">
        <div className="absolute inset-0">
          <Image
            src={heroSrc}
            alt={`${location.name} hero photo`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="pointer-events-none absolute bottom-8 left-4 right-4 mx-auto w-full max-w-[1280px] md:bottom-12 md:left-10">
          <div className="pointer-events-auto max-w-2xl rounded-xl border border-white/20 bg-white/95 p-6 shadow-xl backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-[#1e2e28]/90 md:p-8">
            <div className="flex flex-col gap-4">
              <BranchOpenNow hours={location.hours} />

              <div>
                <h1 className="text-3xl font-extrabold leading-tight text-[#0e1b17] dark:text-white md:text-5xl">
                  {title}
                </h1>
                <p className="mt-2 text-sm text-[#5e7a70] dark:text-gray-300 md:text-base">
                  {location.shortDescription}
                </p>
                <p className="mt-3 flex items-start gap-2 text-sm text-[#5e7a70] dark:text-gray-300">
                  <span
                    className="material-symbols-outlined mt-0.5 text-lg"
                    aria-hidden="true"
                  >
                    location_on
                  </span>
                  <span>{address}</span>
                </p>
              </div>

              <div className="mt-2 flex flex-wrap gap-3">
                <a
                  href={telHref(location.phone)}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#0e1b17] px-5 text-sm font-bold text-white transition-all hover:opacity-90 dark:bg-white dark:text-[#0e1b17]"
                >
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">
                    call
                  </span>
                  Call
                </a>

                <a
                  href={whatsappHref(location.whatsapp, whatsappMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-bold text-white transition-all hover:bg-[#20bd5a]"
                >
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">
                    chat
                  </span>
                  WhatsApp
                </a>

                <a
                  href={directionsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-5 text-sm font-bold text-[#0e1b17] transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-[#1e2e28] dark:text-white dark:hover:bg-gray-800"
                >
                  <span className="material-symbols-outlined text-lg" aria-hidden="true">
                    directions
                  </span>
                  Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-100 bg-white py-6 dark:border-gray-800 dark:bg-[#1e2e28]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-center md:justify-between md:gap-12 md:text-left">
            {quickInfo.map((item) => (
              <div key={item.label} className="group flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {item.icon}
                  </span>
                </div>
                <span className="text-sm font-medium md:text-base">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="activities"
        className="bg-[#f8fcfa] py-16 dark:bg-[#11211c] md:py-24"
      >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h2 className="mb-3 text-3xl font-bold text-[#0e1b17] dark:text-white md:text-4xl">
                Activities at {location.city}
              </h2>
              <p className="text-lg text-[#5e7a70] dark:text-gray-300">
                A quick look at what you can do here. We’ll expand activities per
                branch next.
              </p>
            </div>
            <Link
              href="/activities"
              className="flex items-center gap-1 font-bold text-primary hover:underline"
            >
              View all activities{" "}
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredActivities.map((activity, idx) => {
              const imgSrc =
                location.gallery[idx + 2] ?? location.gallery[0] ?? heroSrc;

              return (
                <div
                  key={activity.id}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-[#1e2e28]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-200">
                    <Image
                      src={imgSrc}
                      alt={activity.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-[#0e1b17] dark:text-white">
                      {activity.name}
                    </h3>
                    <p className="line-clamp-2 text-sm text-[#5e7a70] dark:text-gray-300">
                      {activity.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {showBirthdays ? (
        <section className="border-y border-gray-100 bg-white py-16 dark:border-gray-800 dark:bg-[#1e2e28]">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <span className="mb-2 block text-sm font-bold uppercase tracking-wider text-primary">
                Party Time
              </span>
              <h2 className="mb-4 text-3xl font-bold text-[#0e1b17] dark:text-white md:text-4xl">
                Birthdays & Events
              </h2>
              <p className="text-[#5e7a70] dark:text-gray-300">
                Packages and add-ons vary by branch. Message us on WhatsApp and we’ll
                help you plan.
              </p>
            </div>

            <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-[#f8fcfa] p-8 shadow-sm dark:border-gray-700 dark:bg-[#11211c]">
              <ul className="grid gap-3 text-sm text-[#0e1b17] dark:text-gray-200 sm:grid-cols-2">
                {[
                  "Private room options",
                  "Decoration & themes",
                  "Food & catering add-ons",
                  "Fast confirmation on WhatsApp",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="material-symbols-outlined mt-0.5 text-primary"
                      aria-hidden="true"
                    >
                      check_circle
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/birthdays"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white transition-all hover:bg-sky-700"
                >
                  View birthday options
                </Link>
                <a
                  href={whatsappHref(
                    location.whatsapp,
                    `Hi! I want to plan a birthday at ${title}.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-gray-200 bg-white px-6 text-sm font-bold text-[#0e1b17] transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-[#1e2e28] dark:text-white dark:hover:bg-gray-800"
                >
                  Ask on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 md:py-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-[#0e1b17] dark:text-white">
              Photo Gallery
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {gallery.map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={src}
                    alt={`${location.name} photo`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-[#0e1b17] dark:text-white">
              Opening Hours
            </h2>
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-[#1e2e28]">
              <div className="flex flex-col gap-4">
                {DAYS.map((day) => {
                  const range = location.hours.regular[day.key];
                  const value =
                    range === "closed"
                      ? "Closed"
                      : `${formatTime12h(range.open)} - ${formatTime12h(range.close)}`;

                  return (
                    <div
                      key={day.key}
                      className="flex items-center justify-between border-b border-gray-50 py-3 last:border-b-0 dark:border-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-gray-100 p-2 dark:bg-gray-700">
                          <span
                            className="material-symbols-outlined text-[#5e7a70] dark:text-gray-200"
                            aria-hidden="true"
                          >
                            calendar_today
                          </span>
                        </div>
                        <span className="font-medium">{day.label}</span>
                      </div>
                      <span className="font-bold">{value}</span>
                    </div>
                  );
                })}
              </div>

              {location.hours.notes ? (
                <div className="mt-6 rounded-xl border border-primary/20 bg-[#f8fcfa] p-5 dark:bg-[#11211c]">
                  <h4 className="mb-2 flex items-center gap-2 text-lg font-bold">
                    <span className="material-symbols-outlined text-primary" aria-hidden="true">
                      info
                    </span>
                    Notes
                  </h4>
                  <p className="text-sm text-[#5e7a70] dark:text-gray-300">
                    {location.hours.notes}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-100 bg-white py-16 dark:border-gray-800 dark:bg-[#1e2e28]">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 className="mb-6 text-3xl font-bold text-[#0e1b17] dark:text-white">
                Location
              </h2>

              <div className="group relative h-80 w-full overflow-hidden rounded-2xl shadow-sm">
                <iframe
                  title={`Map for ${location.name}`}
                  src={`https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}&z=15&output=embed`}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                <div className="absolute bottom-4 left-4 max-w-xs rounded-xl border border-gray-100 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-900">
                  <p className="mb-1 text-sm font-bold text-[#0e1b17] dark:text-white">
                    {title}
                  </p>
                  <p className="mb-3 text-xs text-[#5e7a70] dark:text-gray-300">
                    {address}
                  </p>
                  <a
                    href={directionsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    Get Directions{" "}
                    <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                      arrow_outward
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <h2 className="mb-6 text-3xl font-bold text-[#0e1b17] dark:text-white">
                Common Questions
              </h2>

              <div className="flex flex-col gap-4">
                {[
                  {
                    q: "Do I need to book in advance?",
                    a: "Weekends can get busy. Walk-ins are welcome when capacity allows, but WhatsApp is the fastest way to confirm before you come.",
                  },
                  {
                    q: "Are socks required?",
                    a: "For safety and hygiene, grip socks are recommended for kids entering play areas. You can bring your own or purchase at the counter (subject to availability).",
                  },
                  {
                    q: "Can we bring outside food?",
                    a: "Outside food policies vary by branch. Please message this location on WhatsApp and we’ll confirm what’s allowed.",
                  },
                ].map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-xl border border-transparent bg-[#f8fcfa] p-4 transition-all open:border-gray-100 open:bg-white open:shadow-sm dark:bg-[#11211c] dark:open:border-gray-700 dark:open:bg-gray-800 [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-2 text-[#0e1b17] dark:text-white">
                      <h3 className="font-bold">{item.q}</h3>
                      <span
                        className="material-symbols-outlined shrink-0 transition duration-300 group-open:-rotate-180"
                        aria-hidden="true"
                      >
                        expand_more
                      </span>
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed text-[#5e7a70] dark:text-gray-300">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/locations"
              className="inline-flex h-11 items-center justify-center rounded-full border border-gray-200 bg-white px-6 text-sm font-bold text-[#0e1b17] transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-[#1e2e28] dark:text-white dark:hover:bg-gray-800"
            >
              Back to locations
            </Link>

            <a
              href={whatsappHref(location.whatsapp, `Hi! I have a question about ${title}.`)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-bold text-white transition-all hover:bg-sky-700"
            >
              Message this branch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
