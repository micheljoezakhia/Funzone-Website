import type { Metadata } from "next";
import { LOCATIONS } from "@/data";
import Link from "next/link";
import { LocationsLiveMap } from "@/components/LocationsLiveMap";
import { cn } from "@/lib/cn";
import { telHref, whatsappHref } from "@/lib/format";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Fun Zone and Sports Zone locations in Lebanon. Choose your branch to WhatsApp, call, or get directions.",
};

function branchTitle(location: (typeof LOCATIONS)[number]) {
  if (location.type === "sports") return location.name;
  return `${location.city} Branch`;
}

function branchEmail(location: (typeof LOCATIONS)[number]) {
  return `${location.slug}@funzone.lb`;
}

export default function ContactPage() {
  return (
    <div className="font-jakarta bg-white text-[#1c150d] transition-colors duration-300 dark:bg-background-dark dark:text-white">
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-24">
        <header className="mb-16 text-center lg:mb-24">
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight lg:text-7xl">
            Get <span className="text-primary">In Touch</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-500 dark:text-gray-400 lg:text-xl">
            Have questions or looking to partner with us? We&apos;re always happy to
            hear from our community across Lebanon.
          </p>
        </header>

        <section className="mb-20">
          <div className="group flex flex-col items-center justify-between gap-8 rounded-2xl border border-border bg-muted/30 p-8 shadow-sm transition-all duration-300 hover:shadow-xl dark:bg-slate-900/40 lg:flex-row lg:p-12">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary shadow-sm dark:bg-surface-dark">
                <span className="material-symbols-outlined text-3xl" aria-hidden="true">
                  handshake
                </span>
              </div>
              <div>
                <h2 className="mb-1 text-2xl font-bold">
                  Business &amp; Partnerships
                </h2>
                <a
                  className="font-medium text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                  href="mailto:partnerships@funzone.lb"
                >
                  partnerships@funzone.lb
                </a>
              </div>
            </div>

            <a
              href="#inquiry"
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 font-bold shadow-lg shadow-primary/20 transition-all",
                "bg-primary text-white hover:bg-sky-700 active:scale-[0.98] lg:w-auto",
              )}
            >
              <span className="material-symbols-outlined text-xl" aria-hidden="true">
                send
              </span>
              Send a Message
            </a>
          </div>
        </section>

        <section className="mb-24">
          <div className="mb-10 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
            <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-400">
              Our Branches
            </h2>
            <div className="h-px flex-1 bg-gray-100 dark:bg-gray-800" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {LOCATIONS.map((location) => {
              const title = branchTitle(location);
              const email = branchEmail(location);
              const message = `Hi! I have a question about ${title}.`;

              return (
                <div
                  key={location.id}
                  className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-800 dark:bg-surface-dark"
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-bold">{title}</h3>
                    <span
                      className="material-symbols-outlined text-primary"
                      aria-hidden="true"
                    >
                      location_on
                    </span>
                  </div>

                  <div className="mb-8 space-y-4">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <span
                        className="material-symbols-outlined text-xl text-primary"
                        aria-hidden="true"
                      >
                        mail
                      </span>
                      <a
                        className="font-medium hover:text-primary"
                        href={`mailto:${email}`}
                      >
                        {email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                      <span
                        className="material-symbols-outlined text-xl text-primary"
                        aria-hidden="true"
                      >
                        call
                      </span>
                      <a className="font-medium hover:text-primary" href={telHref(location.phone)}>
                        {location.phone}
                      </a>
                    </div>
                  </div>

                  <a
                    href={whatsappHref(location.whatsapp, message)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-primary px-6 py-4 font-bold text-primary transition-all hover:bg-primary hover:text-white"
                  >
                    <span className="material-symbols-outlined text-xl" aria-hidden="true">
                      chat
                    </span>
                    WhatsApp Us
                  </a>
                </div>
              );
            })}

            <div className="relative h-[340px] overflow-hidden rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-2xl dark:border-gray-800 md:h-[380px]">
              <LocationsLiveMap locations={LOCATIONS} />

              <div className="absolute inset-x-0 bottom-4 flex justify-center px-4">
                <Link
                  href="/locations"
                  className="inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 font-bold shadow-lg backdrop-blur-sm transition-colors hover:bg-white dark:bg-surface-dark/90 dark:hover:bg-surface-dark"
                >
                  <span
                    className="material-symbols-outlined text-primary"
                    aria-hidden="true"
                  >
                    map
                  </span>
                  View Global Map
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          id="inquiry"
          className="rounded-2xl bg-muted/30 p-10 dark:bg-slate-900/30 lg:p-16"
        >
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Still have questions?</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Drop us a message and we&apos;ll get back to you within 24 hours.
              </p>
            </div>

            <form className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="ml-1 text-sm font-bold" htmlFor="contact_name">
                  Full Name
                </label>
                <input
                  id="contact_name"
                  className="w-full rounded-xl border border-gray-100 bg-white px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-surface-dark"
                  placeholder="John Doe"
                  type="text"
                />
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-sm font-bold" htmlFor="contact_email">
                  Email Address
                </label>
                <input
                  id="contact_email"
                  className="w-full rounded-xl border border-gray-100 bg-white px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-surface-dark"
                  placeholder="john@example.com"
                  type="email"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="ml-1 text-sm font-bold" htmlFor="contact_message">
                  Message
                </label>
                <textarea
                  id="contact_message"
                  className="w-full rounded-xl border border-gray-100 bg-white px-4 py-3 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary dark:border-gray-700 dark:bg-surface-dark"
                  placeholder="Tell us more about your inquiry..."
                  rows={4}
                />
              </div>

              <div className="flex justify-center pt-4 md:col-span-2">
                <button
                  type="button"
                  className="rounded-xl bg-primary px-12 py-4 text-lg font-bold text-white shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:bg-sky-700 active:scale-95"
                >
                  Send General Inquiry
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
