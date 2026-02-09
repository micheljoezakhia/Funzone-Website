import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LocationsLiveMap } from "@/components/LocationsLiveMap";
import { LOCATIONS } from "@/data";
import { hoursSummary, telHref, whatsappHref } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contact & Locations",
  description:
    "Find the nearest fun! Explore our locations across Lebanon featuring trampoline parks, soft play zones, and birthday lounges.",
};

function formatAddress(addressText: string) {
  return addressText
    .replace(/\s*-\s*\(address placeholder\)\s*$/i, "")
    .replace(/\s*\(address placeholder\)\s*$/i, "");
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

export default function LocationsPage() {
  return (
    <div className="bg-background-light font-jakarta text-[#0d171c] transition-colors duration-300 dark:bg-background-dark dark:text-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-12">
        <header className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <h1 className="mb-4 text-4xl font-black leading-tight tracking-tight md:text-5xl">
              Visit Our Play Parks
            </h1>
            <p className="text-lg font-normal text-gray-600 dark:text-gray-400">
              Find the nearest fun! Explore our {LOCATIONS.length} premium locations
              across Lebanon featuring trampoline parks, soft play zones, and birthday
              lounges.
            </p>
          </div>

          <a
            href="#branches"
            className="inline-flex items-center gap-2 rounded-full bg-[#e7eff4] px-6 py-3 font-bold text-[#0d171c] transition-colors hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:bg-[#1e2e37] dark:text-white dark:hover:bg-gray-700 dark:focus-visible:ring-offset-background-dark"
          >
            <span className="material-symbols-outlined text-lg" aria-hidden="true">
              near_me
            </span>
            Find Nearest Branch
          </a>
        </header>

        <section id="map" className="mb-16 w-full scroll-mt-28" aria-label="Map">
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border-4 border-white bg-gray-200 shadow-xl dark:border-[#1e2e37] dark:bg-gray-800">
            <LocationsLiveMap
              locations={LOCATIONS}
              zoomControlPosition="bottomright"
              className="absolute inset-0"
            />
          </div>
        </section>

        <section
          id="branches"
          className="scroll-mt-28"
          aria-label="Branches"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {LOCATIONS.map((location, idx) => {
              const address = formatAddress(location.addressText);
              const imageSrc = location.gallery[0] ?? "/favicon.ico";
              const hours = replaceTimesWith12h(hoursSummary(location.hours));
              const message = `Hi! I have a question about ${location.name}.`;

              return (
                <article
                  key={location.id}
                  className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary/20 focus-within:ring-offset-2 focus-within:ring-offset-background-light dark:border-gray-800 dark:bg-[#1e2e37] dark:focus-within:ring-offset-background-dark"
                >
                  <Link
                    href={`/locations/${location.slug}`}
                    className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1e2e37]"
                    aria-label={`Open ${location.name}`}
                  >
                    <span className="sr-only">Open {location.name}</span>
                  </Link>
                  <div className="relative h-48 w-full">
                    <Image
                      alt={`${location.name} photo`}
                      src={imageSrc}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={idx < 3}
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-4 p-6">
                    <h2 className="text-xl font-extrabold text-[#0d171c] dark:text-white">
                      {location.name}
                    </h2>

                    <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                      {location.shortDescription}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <span
                          className="material-symbols-outlined text-primary"
                          aria-hidden="true"
                        >
                          location_on
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {address}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className="material-symbols-outlined text-primary"
                          aria-hidden="true"
                        >
                          call
                        </span>
                        <a
                          className="relative z-20 text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                          href={telHref(location.phone)}
                        >
                          {location.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className="material-symbols-outlined text-primary"
                          aria-hidden="true"
                        >
                          schedule
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {hours}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Link
                        href={`/locations/${location.slug}`}
                        className="relative z-20 inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-white transition-all hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1e2e37]"
                        aria-label={`Open ${location.name} page`}
                      >
                        View Details
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                          arrow_forward
                        </span>
                      </Link>

                      <a
                        className="relative z-20 flex size-12 items-center justify-center rounded-full border-2 border-[#25d366] text-[#25d366] transition-all hover:bg-[#25d366] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#1e2e37]"
                        href={whatsappHref(location.whatsapp, message)}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`WhatsApp ${location.name}`}
                      >
                        <span className="material-symbols-outlined" aria-hidden="true">
                          chat
                        </span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}

            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed border-primary/30 bg-primary/10 p-8 text-center dark:bg-primary/5">
              <div className="rounded-full bg-primary p-4 text-white">
                <span className="material-symbols-outlined text-3xl" aria-hidden="true">
                  mail
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-[#0d171c] dark:text-white">
                Have a general question?
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Looking for corporate bookings or school trips? Reach out to our main
                office.
              </p>
              <a className="mt-2 font-bold text-primary hover:underline" href="#main-office">
                Send us a message
              </a>
            </div>
          </div>
        </section>

        <section
          id="main-office"
          className="mx-auto mt-24 max-w-4xl scroll-mt-28 rounded-3xl bg-white p-8 shadow-xl dark:bg-[#1e2e37] lg:p-12"
          aria-label="Contact form"
        >
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-black">Contact Our Main Office</h2>
            <p className="text-gray-600 dark:text-gray-400">
              For franchising, partnerships, or complaints, please use the form below.
            </p>
          </div>

          <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="ml-1 text-sm font-bold" htmlFor="locations_full_name">
                Full Name
              </label>
              <input
                id="locations_full_name"
                name="fullName"
                className="h-12 rounded-full border-none bg-background-light px-4 text-sm transition-all focus:ring-2 focus:ring-primary dark:bg-background-dark"
                placeholder="Your Name"
                type="text"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="ml-1 text-sm font-bold" htmlFor="locations_email">
                Email Address
              </label>
              <input
                id="locations_email"
                name="email"
                className="h-12 rounded-full border-none bg-background-light px-4 text-sm transition-all focus:ring-2 focus:ring-primary dark:bg-background-dark"
                placeholder="email@example.com"
                type="email"
              />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="ml-1 text-sm font-bold" htmlFor="locations_branch">
                Branch Inquiry
              </label>
              <select
                id="locations_branch"
                name="branch"
                className="h-12 rounded-full border-none bg-background-light px-4 text-sm transition-all focus:ring-2 focus:ring-primary dark:bg-background-dark"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a Branch
                </option>
                {LOCATIONS.map((l) => (
                  <option key={l.id} value={l.slug}>
                    {l.name}
                  </option>
                ))}
                <option value="general">General / Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="ml-1 text-sm font-bold" htmlFor="locations_message">
                Your Message
              </label>
              <textarea
                id="locations_message"
                name="message"
                className="resize-none rounded-3xl border-none bg-background-light p-4 text-sm transition-all focus:ring-2 focus:ring-primary dark:bg-background-dark"
                placeholder="How can we help you?"
                rows={4}
              />
            </div>

            <div className="mt-4 flex justify-center md:col-span-2">
              <button
                className="h-14 w-full min-w-[200px] rounded-full bg-primary font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-primary/30 md:w-auto"
                type="submit"
              >
                Send Message
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
