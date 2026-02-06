"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type Category = "All" | "Indoor Play" | "Water Park" | "Sports" | "Toddler Zone";
type Intensity = "Low" | "Medium" | "High";

type ActivityCard = {
  id: string;
  title: string;
  subtitle: string;
  details: string;
  ageLabel: string;
  ageTone: "mint" | "lemon";
  duration: string;
  intensity: Intensity;
  category: Exclude<Category, "All">;
  imageSrc: string;
};

const CATEGORIES: Category[] = [
  "All",
  "Indoor Play",
  "Water Park",
  "Sports",
  "Toddler Zone",
];

const SORT_OPTIONS = ["Popularity", "Price: Low to High", "Intensity"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

const CARDS: ActivityCard[] = [
  {
    id: "giant-slides",
    title: "Giant Slides",
    subtitle: "Adrenaline pumping vertical drops and twists.",
    details:
      "Features 4 different slide patterns including the famous “Blue Typhoon”. Height requirement: 100cm.",
    ageLabel: "3-12 yrs",
    ageTone: "mint",
    duration: "Unlimited",
    intensity: "High",
    category: "Water Park",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8cPC2c4yMEv-JxIaFJ67w9eyI1w1OMYFuZRxMvvF96DrzPlhRU-LGAtHB_P0W8ypZtPvI8QcJvhHuIuDoqSJIfP4IvVgDy2UYMsPjXSXGMoP3QCfa6KQELs3r1y0i9eGcdqto7POQ0ghXc2NapVzYFdGgWu8yJ66QJg5qdUOd0bSYQr9OzrIVhXfzxeGJ_zCu0C90VJzvDpa6TU80qEyNq5FCoo2gKXoSDNCEJkfWFqTE428GxmLc9uV4RYr0E37d207OO3GIxzo",
  },
  {
    id: "kids-water-playground",
    title: "Kids Water Playground",
    subtitle: "A playful splash zone made for kids to explore safely.",
    details:
      "A water playground for kids inside the water area. Available at Zahle (Waterpark).",
    ageLabel: "2-10 yrs",
    ageTone: "lemon",
    duration: "Unlimited",
    intensity: "Medium",
    category: "Water Park",
    imageSrc: "/images/locations/FunzoneZahle.jpg",
  },
  {
    id: "family-pool",
    title: "Family Swimming Pool",
    subtitle: "A pool for adults and kids to swim, cool down, and relax.",
    details:
      "A shared swimming pool for families. Kids should be supervised. Available at Zahle (Waterpark).",
    ageLabel: "All Ages",
    ageTone: "mint",
    duration: "Unlimited",
    intensity: "Low",
    category: "Water Park",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKWc44wTMu7yGHjT5BaJBbGSHHVThhp5QBizIaec1c70oDOQZqSlZdycpJZGuIYR11KilRAKdKo0TmuK5iNX-MqAi8xZqVq4Op-lVDQ-DF0z5O0xvl3fcZpK2GZJeS3z7cQJ92F3YUV10J-pHAQRBRQsyA7Xd6xXE4fCrAXCsXFHOWP7eyneTxZNq80qIrygowxPHhf6_C2wBzK9bAuwRLyFtCwy0JAyrwqtw4S_EDpy9m1ekxvjuuBJFkfVzvNEr0HAExnJsBANY",
  },
  {
    id: "bumper-cars",
    title: "Bumper Cars",
    subtitle: "Classic family fun with electric bumper cars.",
    details:
      "Engage in friendly competition in our neon-lit arena. Safe for all drivers over 120cm.",
    ageLabel: "6+ yrs",
    ageTone: "lemon",
    duration: "15 Mins",
    intensity: "Medium",
    category: "Indoor Play",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDiMat_AZlKMbx6k4cIohz1SegN2dYvU7mhQlrmiUz8f5pSZ1akwQp5e9lMp9nFw3fFtD8iElLpGcENAuRkp1NfBF5f-O4MHBvVQXZxtfAyCuvHVd8ho28q_HmDYhGECtuh3TIAqeIg7EGNsK_vTY2_uxtSFpqQPAYh9UTIhVEb5mGHE-9VTYy6qGJolakc9k26hDKtu88B6Nma1TQmUrc56w4fbAvJFRdDNOr7xwtxIIdEPZwMcJUsaRhlmq5fpIZXFrt_JgNJu88",
  },
  {
    id: "trampoline-park",
    title: "Trampoline Park",
    subtitle: "Defy gravity in our interconnected jumping zone.",
    details:
      "Includes dodgeball court, foam pit, and professional performance trampolines.",
    ageLabel: "5+ yrs",
    ageTone: "mint",
    duration: "60 Mins",
    intensity: "High",
    category: "Indoor Play",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTP-S9ZR_xU1UO7FliJ9KAW0rue7uwXd0IBrBjQyla_SAIU6o5RSLZMY9webVeWROzCPwjriZTrcuNgjrSckiRkinZHmD_WNdu41dWXAxReHwD5A2VG0OqI5pcFpB9w34oGVyT6D6MMKQqHUtps9nWpWB9E_bWAWKd7UqGDhqwfm5O9uRfIoEsImjAi90CZIEph8KJnFEEQjqyuwXUWjIWS9zd8PL91uPjqTaHYfeoZM5wqWcsVm1SkGHRHHt_HzqqWBTz27dFc3Y",
  },
  {
    id: "toddler-soft-play",
    title: "Toddler Soft Play",
    subtitle: "A safe, cushioned environment for early explorers.",
    details:
      "Specifically designed for under 4s with soft obstacles, ball pools, and mini slides.",
    ageLabel: "1-4 yrs",
    ageTone: "lemon",
    duration: "Unlimited",
    intensity: "Low",
    category: "Toddler Zone",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBv3AKfx-KWHmjSyDRVPGKO2fsVScpKNDXK8Gb5O4q_ReLT6yReFEeMOfEWM2cBuWNIfVvF0JkYkMsMsO_sOvmqcaqrOFe-5ZGWsJjDTiuRGvDdzqyVoxwCoKck4u6Qdo6U2km9ReOk6SRb_d2JRGu0yaT6sFb4gt0eCbjSeioBYpfDLWt3LxhO2pxHoxMX_uZn6tWk74xNS20KCuNkkl01xUXm6Lh-dwNxpJAWjcwZ9a3GS3z2RNIMcmylX_H1ywrnjoUoGsyttVw",
  },
  {
    id: "neon-mini-golf",
    title: "Neon Mini Golf",
    subtitle: "18-hole glow-in-the-dark miniature golf course.",
    details: "Navigate through luminous obstacles in this immersive neon adventure.",
    ageLabel: "All Ages",
    ageTone: "mint",
    duration: "45 Mins",
    intensity: "Low",
    category: "Indoor Play",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAvBmikr3hyyWvtfLQ5yLmB2sNBjpZzbxgx36KXKHYnRSTJpTmgqUkkJZ_YzjmNKtQ7Lk7zawlLkTfX2ViK_uwwgxF-1DUO_pnHRVep93IXjw1ejEQiQfZccLyt441dDMPmohBLTjUONH6GTLJ9xhgicBxDbhCyBk7q28zZD5L4BWsJPlbfnbwR6ppcClxAk05rtgIHLZpq-m_wh8C6TzikGfU0GDZEsQKn21tZCu8P2_EBxMCS0F6-ctVpbsYkxJr6yx3vGPy-uc0",
  },
  {
    id: "arcade-zone",
    title: "Arcade Zone",
    subtitle: "State-of-the-art gaming arena with ticket prizes.",
    details:
      "Over 50 retro and modern games. Win tickets and redeem them at the prize counter!",
    ageLabel: "4+ yrs",
    ageTone: "lemon",
    duration: "Flex",
    intensity: "Medium",
    category: "Indoor Play",
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC-OWp9Geag9USTJxICdqmZ_BeOT3Q_f8OfvyPQ4WBxGOn-VygWqb3kNHRJv4vHvsnpHwZkXMe8Gf3n1Mm3rO1qMC0N0aXLrehbVUfu9xhxlgqoHRXCZLlNleouwOTDVQXmJWX_cg4Nn7LVdtD8SYbNX25JEgZP9T663hEbU1nHVm-qvoldjTBQYp8Jt3FOv8G5cbdwHKiYzqnAygdH_s1ZL5TP7OR6AH3an6rbxKzBN-OwqcoJsANcVfajpAEDSyMRrvith9bRZms",
  },
];

function intensityPill(intensity: Intensity) {
  if (intensity === "High") {
    return {
      label: "High",
      className: "text-orange-400",
      iconClassName: "text-orange-400",
    };
  }
  if (intensity === "Medium") {
    return {
      label: "Medium",
      className: "text-yellow-500",
      iconClassName: "",
    };
  }
  return {
    label: "Low",
    className: "text-blue-400",
    iconClassName: "",
  };
}

function ageBadgeClasses(tone: ActivityCard["ageTone"]) {
  if (tone === "mint") {
    return "bg-[#e0f7f3] text-emerald-700";
  }
  return "bg-[#fef9c3] text-yellow-700";
}

export function ActivitiesClient() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [sortBy, setSortBy] = useState<SortOption>("Popularity");
  const [favorites, setFavorites] = useState<Set<string>>(() => new Set());

  const filteredCards = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = CARDS.filter((card) => {
      if (category !== "All" && card.category !== category) return false;
      if (!q) return true;
      const haystack = `${card.title} ${card.subtitle} ${card.details}`.toLowerCase();
      return haystack.includes(q);
    });

    if (sortBy === "Price: Low to High") {
      return [...base].sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === "Intensity") {
      const order: Record<Intensity, number> = { Low: 0, Medium: 1, High: 2 };
      return [...base].sort((a, b) => order[b.intensity] - order[a.intensity]);
    }
    return base;
  }, [category, query, sortBy]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="font-jakarta bg-[#f6f7f8] text-[#111618] transition-colors duration-300 dark:bg-[#101d22] dark:text-white">
      <main className="mx-auto w-full max-w-7xl px-6 py-8 md:px-10">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
          <div className="flex w-full items-center gap-2 rounded-full bg-gray-100 px-4 py-2 dark:bg-gray-800 sm:max-w-sm">
            <span className="material-symbols-outlined text-gray-400" aria-hidden="true">
              search
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find an activity..."
              className="w-full bg-transparent text-sm placeholder:text-gray-400 focus:outline-none"
              type="text"
            />
          </div>
        </div>

        <section className="mb-12">
          <div className="relative flex min-h-[450px] items-center overflow-hidden rounded-xl">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKWc44wTMu7yGHjT5BaJBbGSHHVThhp5QBizIaec1c70oDOQZqSlZdycpJZGuIYR11KilRAKdKo0TmuK5iNX-MqAi8xZqVq4Op-lVDQ-DF0z5O0xvl3fcZpK2GZJeS3z7cQJ92F3YUV10J-pHAQRBRQsyA7Xd6xXE4fCrAXCsXFHOWP7eyneTxZNq80qIrygowxPHhf6_C2wBzK9bAuwRLyFtCwy0JAyrwqtw4S_EDpy9m1ekxvjuuBJFkfVzvNEr0HAExnJsBANY"
              alt="Featured activity"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/10" />

            <div className="relative z-10 max-w-2xl px-8 md:px-16">
              <span
                className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur-md"
              >
                Featured Activity
              </span>
              <h1 className="mb-4 text-5xl font-black leading-[1.1] text-white md:text-6xl">
                The Ultimate Wave Pool
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-gray-200">
                Experience the thrill of Lebanon&apos;s largest wave pool. With multiple
                wave patterns and certified lifeguards, it&apos;s perfect for safe family
                fun!
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-lg font-bold text-white shadow-lg hover:bg-sky-700"
                >
                  Book Now{" "}
                  <span className="material-symbols-outlined" aria-hidden="true">
                    calendar_month
                  </span>
                </button>
                <button
                  type="button"
                  className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-lg font-bold text-white backdrop-blur-md transition-all hover:bg-white/20"
                >
                  Watch Video
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="sticky top-20 z-40 mb-10">
          <div
            className={cn(
              "flex flex-wrap items-center justify-between gap-2 overflow-x-auto rounded-full bg-white p-2 shadow-xl shadow-black/5 dark:bg-gray-800",
              "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            )}
          >
            <div className="flex gap-2 p-1">
              {CATEGORIES.map((label) => {
                const active = label === category;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => setCategory(label)}
                      className={cn(
                        "rounded-full px-6 py-2.5 text-sm font-semibold transition-colors",
                      active
                        ? "bg-primary text-white font-bold"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700",
                    )}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <div className="hidden items-center gap-2 border-l border-gray-100 px-4 dark:border-gray-700 md:flex">
              <span className="text-xs font-bold uppercase text-gray-400">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="cursor-pointer bg-transparent text-sm font-semibold focus:outline-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredCards.map((card) => {
            const pill = intensityPill(card.intensity);
            const favorited = favorites.has(card.id);

            return (
              <article
                key={card.id}
                className="group relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-500 hover:shadow-2xl dark:bg-gray-800"
              >
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={card.imageSrc}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute left-4 top-4">
                    <span
                      className={cn(
                        "rounded-full px-3 py-1.5 text-xs font-bold",
                        ageBadgeClasses(card.ageTone),
                      )}
                    >
                      {card.ageLabel}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleFavorite(card.id)}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm transition-colors hover:text-primary dark:bg-black/50"
                    aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
                  >
                    <span className="material-symbols-outlined text-xl" aria-hidden="true">
                      favorite
                    </span>
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="mb-1 text-xl font-bold">{card.title}</h3>
                  <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                    {card.subtitle}
                  </p>
                  <div className="flex items-center gap-4 text-xs font-bold uppercase text-gray-400">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm" aria-hidden="true">
                        schedule
                      </span>{" "}
                      {card.duration}
                    </span>
                    <span className={cn("flex items-center gap-1", pill.className)}>
                      <span
                        className={cn(
                          "material-symbols-outlined text-sm",
                          pill.iconClassName,
                        )}
                        aria-hidden="true"
                      >
                        bolt
                      </span>{" "}
                      {pill.label}
                    </span>
                  </div>
                </div>

                <div
                  className={cn(
                    "absolute inset-0 flex translate-y-full flex-col items-center justify-center bg-primary/95 p-8 text-center opacity-0 transition-all duration-500",
                    "group-hover:translate-y-0 group-hover:opacity-100",
                  )}
                >
                  <h3 className="mb-4 text-2xl font-black text-white">{card.title}</h3>
                  <p className="mb-8 text-white/90">{card.details}</p>
                  <button
                    type="button"
                    className="rounded-full bg-white px-10 py-3 font-bold text-primary transition-all hover:bg-gray-100"
                  >
                    View Details
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        <section className="mb-10 mt-20">
          <form
            className="flex flex-col items-center justify-between gap-8 rounded-xl border border-primary/20 bg-primary/10 p-8 md:flex-row md:p-12 dark:bg-primary/5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <h2 className="mb-2 text-3xl font-black">Join the Fun!</h2>
              <p className="text-gray-600 dark:text-gray-400">
                Subscribe to get exclusive discounts and activity updates.
              </p>
            </div>

            <div className="flex w-full gap-2 md:w-auto">
              <input
                className="w-full rounded-full bg-white px-6 py-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-gray-800 md:w-72"
                placeholder="Your email address"
                type="email"
              />
              <button
                type="submit"
                className="rounded-full bg-primary px-8 py-4 font-bold text-white shadow-lg transition-all hover:bg-sky-700"
              >
                Join
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
