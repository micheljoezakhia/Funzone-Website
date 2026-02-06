"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getBirthdayBranchContent, LOCATIONS } from "@/data";
import type { IconName, Location } from "@/data";
import { Icon } from "@/components/Icon";
import { cn } from "@/lib/cn";
import { telHref, whatsappHref } from "@/lib/format";

const BRANCHES = LOCATIONS.filter((l) => l.hasBirthdays).map((location) => ({
  id: location.slug,
  label: location.type === "sports" ? "Sports Zone" : location.city,
}));

const VIBES_BY_BRANCH: Record<string, { icon: IconName; label: string }> = {
  antelias: { icon: "sparkles", label: "Jungle Adventure" },
  monteverde: { icon: "party", label: "Cosmic Disco" },
  rayfoun: { icon: "heart", label: "Candy Carnival" },
  zahle: { icon: "cake", label: "Splash Party" },
  "sports-zone": { icon: "soccer", label: "Team Champions" },
};

function getLocationByBranchId(branchId: string) {
  return LOCATIONS.find((l) => l.slug === branchId) ?? LOCATIONS[0];
}

function branchTitle(location: Location) {
  if (location.type === "sports") return location.name;
  return `${location.city} Branch`;
}

export function BirthdaysClient() {
  const [selectedBranch, setSelectedBranch] = useState(() => BRANCHES[0]?.id ?? "antelias");

  const location = useMemo(
    () => getLocationByBranchId(selectedBranch),
    [selectedBranch],
  );

  const content = useMemo(() => getBirthdayBranchContent(location), [location]);

  const vibe = VIBES_BY_BRANCH[selectedBranch] ?? {
    icon: "sparkles" as const,
    label: "Party Time",
  };

  const title = branchTitle(location);
  const whatsappMessage = `Hi! I'd like to ask about birthday parties at ${title}.`;

  const whatsappLink = whatsappHref(location.whatsapp, whatsappMessage);
  const phoneLink = telHref(location.phone);

  const showMenus =
    content.menuVisibility === "shown" &&
    Boolean(content.menuSections && content.menuSections.length > 0);

  return (
    <div
      className={cn(
        "font-jakarta min-h-screen overflow-x-hidden antialiased",
        "bg-[#f6f8f7] text-[#111814] dark:bg-[#102219] dark:text-white",
        "selection:bg-primary selection:text-white",
        "pb-24",
      )}
    >
      <main className="flex w-full flex-col items-center">
        <section
          className={cn(
            "w-full px-4 pt-10 pb-10",
            "bg-gradient-to-b from-primary/10 to-[#f6f8f7]",
            "dark:from-primary/20 dark:to-[#102219]",
          )}
        >
          <div className="mx-auto flex max-w-[960px] flex-col items-center gap-6 text-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl">
                Birthdays at Fun Zone
              </h1>
              <p className="mx-auto max-w-xl text-base text-[#618975] dark:text-gray-300 md:text-lg">
                Select a branch to see birthday info, menu previews, and how to book.
                No online checkout — just message the branch.
              </p>
            </div>

            <div className="w-full overflow-x-auto py-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div
                role="radiogroup"
                aria-label="Choose a branch"
                className={cn(
                  "mx-auto inline-flex min-w-max items-center rounded-full border p-1.5 shadow-sm",
                  "border-[#dbe6e0] bg-white dark:border-white/10 dark:bg-[#1a2c24]",
                )}
              >
                {BRANCHES.map((branch) => {
                  const checked = branch.id === selectedBranch;
                  return (
                    <button
                      key={branch.id}
                      type="button"
                      role="radio"
                      aria-checked={checked}
                      onClick={() => setSelectedBranch(branch.id)}
                      className={cn(
                        "rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200",
                        checked
                          ? "bg-primary text-white shadow-sm"
                          : "text-[#618975] hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-white/5",
                      )}
                    >
                      {branch.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/60 px-3 py-1 text-xs font-semibold backdrop-blur-sm dark:bg-black/20 dark:text-gray-300">
              <Icon name={vibe.icon} className="h-4 w-4 text-primary" />
              Current Vibe: {vibe.label}
            </div>
          </div>
        </section>

        <section className="w-full max-w-[1100px] px-4 pb-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="relative overflow-hidden rounded-3xl border border-[#dbe6e0] bg-white shadow-sm dark:border-white/10 dark:bg-[#1a2c24] lg:col-span-7">
              <div className="relative aspect-[16/10] w-full bg-gray-200">
                <Image
                  src={location.gallery[0] ?? "/images/locations/Story.jpg"}
                  alt={`${title} birthday preview`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-white/80">
                    {location.city}
                  </p>
                  <h2 className="text-3xl font-black leading-tight text-white md:text-4xl">
                    {content.introTitle}
                  </h2>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-[#dbe6e0] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1a2c24] lg:col-span-5">
              <h3 className="text-xl font-black">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#618975] dark:text-gray-300">
                {content.introDescription}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-sky-700"
                >
                  <Icon name="message" className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={phoneLink}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#dbe6e0] bg-white px-5 text-sm font-bold text-[#111814] transition-colors hover:bg-[#f0f4f2] dark:border-white/10 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
                >
                  <Icon name="phone" className="h-4 w-4" />
                  Call
                </a>
              </div>

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href={`/locations/${location.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                >
                  View branch page
                  <Icon name="arrow-right" className="h-4 w-4" />
                </Link>
                <p className="text-xs font-semibold text-[#618975] dark:text-gray-400">
                  Prices shared on request
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full max-w-[1100px] px-4 pb-12">
          <div className="mb-6 flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-2xl font-black">What to expect</h2>
              <p className="mt-1 text-sm text-[#618975] dark:text-gray-300">
                Highlights can differ by branch — switch locations above to compare.
              </p>
            </div>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#dbe6e0] bg-white px-4 py-2 text-sm font-bold text-[#111814] transition-colors hover:bg-[#f0f4f2] dark:border-white/10 dark:bg-transparent dark:text-white dark:hover:bg-white/10"
            >
              <Icon name="message" className="h-4 w-4 text-primary" />
              Ask this branch
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {content.highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="rounded-2xl border border-[#dbe6e0] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1a2c24]"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon name={highlight.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black">{highlight.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#618975] dark:text-gray-300">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full max-w-[1100px] px-4 pb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-black">Menu preview</h2>
            <p className="mt-1 text-sm text-[#618975] dark:text-gray-300">
              {showMenus
                ? "Examples only — ask the branch for today’s exact menu and any dietary notes."
                : "Menus can change often. We share the latest options on WhatsApp to keep it accurate."}
            </p>
          </div>

          {showMenus ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {content.menuSections?.map((section) => (
                <div
                  key={section.title}
                  className="rounded-2xl border border-[#dbe6e0] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1a2c24]"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="utensils" className="h-5 w-5 text-primary" />
                    <h3 className="text-sm font-black uppercase tracking-widest text-[#111814] dark:text-white">
                      {section.title}
                    </h3>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-[#111814] dark:text-white">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                        <span className="text-[#111814] dark:text-gray-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-[#dbe6e0] bg-white p-10 text-center shadow-sm dark:border-white/10 dark:bg-[#1a2c24]">
              <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon name="message" className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-black">Get the latest menu on WhatsApp</h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-[#618975] dark:text-gray-300">
                To avoid showing outdated items, we share the current birthday menu
                directly with each branch.
              </p>
              <div className="mt-6 flex justify-center">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-colors hover:bg-sky-700"
                >
                  <Icon name="message" className="h-4 w-4" />
                  Message {location.city}
                </a>
              </div>
            </div>
          )}
        </section>

        {content.notes && content.notes.length > 0 ? (
          <section className="w-full max-w-[1100px] px-4 pb-16">
            <div className="rounded-3xl border border-[#dbe6e0] bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#1a2c24]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon name="info" className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-black">Good to know</h2>
                  <ul className="mt-3 space-y-2 text-sm text-[#618975] dark:text-gray-300">
                    {content.notes.map((note) => (
                      <li key={note} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}

