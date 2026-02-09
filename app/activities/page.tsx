import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ACTIVITIES, LOCATIONS } from "@/data";
import { ActivitiesFiltersProvider } from "./ActivitiesFiltersProvider";
import { ActivitiesHeaderActions } from "./ActivitiesHeaderActions";
import { ActivitiesYearRound } from "./ActivitiesYearRound";

export const metadata: Metadata = {
  title: "Activities & Programs",
  description:
    "From high-intensity sports to creative workshops, explore Fun Zone programs for kids and teens across Lebanon.",
};

const BRANCHES = LOCATIONS.map((location) => ({
  slug: location.slug,
  name: location.name,
  city: location.city,
  type: location.type,
  activityIds: location.activities,
}));

export default function ActivitiesPage() {
  return (
    <ActivitiesFiltersProvider branches={BRANCHES} activities={ACTIVITIES}>
      <div className="bg-background-light font-jakarta text-[#0d171c] transition-colors duration-300 dark:bg-background-dark dark:text-white">
        <div id="all" className="mx-auto w-full max-w-7xl px-6 py-12">
          <header className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <span className="inline-flex w-fit items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                Discover Your Energy
              </span>
              <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                Activities &amp; Programs
              </h1>
              <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                From high-intensity sports to creative workshops, we offer a diverse
                range of developmental programs for kids and teens across Lebanon.
              </p>
            </div>

            <ActivitiesHeaderActions />
          </header>

          <nav
            aria-label="Activity categories"
            className="mb-10 flex items-center gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <a
              href="#all"
              className="shrink-0 rounded-full bg-primary px-6 py-2 text-sm font-bold text-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark"
            >
              All Programs
            </a>
            <a
              href="#seasonal"
              className="shrink-0 rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-semibold text-[#0d171c] transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:border-gray-700 dark:bg-[#1e2e37] dark:text-white dark:hover:border-primary dark:focus-visible:ring-offset-background-dark"
            >
              Seasonal Colonies
            </a>
            <Link
              href="/programs/sports-academy"
              className="shrink-0 rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-semibold text-[#0d171c] transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:border-gray-700 dark:bg-[#1e2e37] dark:text-white dark:hover:border-primary dark:focus-visible:ring-offset-background-dark"
            >
              Sports Academy
            </Link>
            <a
              href="#year-round"
              className="shrink-0 rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-semibold text-[#0d171c] transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:border-gray-700 dark:bg-[#1e2e37] dark:text-white dark:hover:border-primary dark:focus-visible:ring-offset-background-dark"
            >
              Kids Play
            </a>
            <a
              href="#year-round"
              className="shrink-0 rounded-full border border-gray-200 bg-white px-6 py-2 text-sm font-semibold text-[#0d171c] transition-colors hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:border-gray-700 dark:bg-[#1e2e37] dark:text-white dark:hover:border-primary dark:focus-visible:ring-offset-background-dark"
            >
              Teen Lounge
            </a>
          </nav>

          <section
            id="seasonal"
            className="mb-16 scroll-mt-28"
            aria-label="Spotlight seasonal program"
          >
            <div className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-8 md:p-12">
              <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-primary/5 blur-3xl transition-colors group-hover:bg-primary/10" />

              <div className="relative z-10 flex flex-col gap-12 lg:flex-row">
                <div className="lg:w-1/2">
                  <div className="mb-6 flex items-center gap-3">
                    <span className="rounded-sm bg-primary px-2 py-0.5 text-[10px] font-black text-white">
                      HOT
                    </span>
                    <h2 className="text-3xl font-black">
                      Seasonal Summer Colony 2024
                    </h2>
                  </div>

                  <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
                    Our flagship seasonal program designed for ultimate engagement and
                    development during school breaks.
                  </p>

                  <div className="mb-8 grid gap-6 md:grid-cols-2">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-white p-2 shadow-sm dark:bg-[#1e2e37]">
                        <span
                          className="material-symbols-outlined text-primary"
                          aria-hidden="true"
                        >
                          schedule
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-tighter text-gray-400">
                          Schedule
                        </p>
                        <p className="font-semibold">Mon-Fri | 8 AM - 2 PM</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-white p-2 shadow-sm dark:bg-[#1e2e37]">
                        <span
                          className="material-symbols-outlined text-primary"
                          aria-hidden="true"
                        >
                          group
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-tighter text-gray-400">
                          Age Group
                        </p>
                        <p className="font-semibold">4 - 12 Years Old</p>
                      </div>
                    </div>
                  </div>

                  <ul className="mb-10 space-y-3">
                    {[
                      "Arts & Crafts Workshops",
                      "Weekly Themed Field Trips",
                      "Swimming & Water Games",
                      "Team Building & Sports",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 text-gray-700 dark:text-gray-200"
                      >
                        <span
                          className="material-symbols-outlined text-primary"
                          aria-hidden="true"
                        >
                          check_circle
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/programs/summer-colony#register"
                      className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:focus-visible:ring-offset-background-dark"
                    >
                      Register Now
                    </Link>
                    <Link
                      href="/programs/summer-colony"
                      className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-8 py-3 font-bold text-[#0d171c] transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background-light dark:border-gray-700 dark:bg-[#1e2e37] dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-offset-background-dark"
                    >
                      Program Details
                    </Link>
                  </div>
                </div>

                <div className="relative h-[400px] overflow-hidden rounded-2xl shadow-2xl lg:h-auto lg:w-1/2">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAejFksZqCE3CY_FJzlxPXhPg9V1O85MEoh6oEoeE7UlS1R-V0LN9VjWKu4vScQ5KocEoVD3d3N-lMmEGNlYJVF1sSHqtWifLE5oevWKrBXtzw1rtc_Cs_hsAZode1xfuanaBr48WH2M4jLPlQ3yb0cs22DuinxuGIQWmgMaF5NvsmaYd-UeGuCOmcVSJ5-FApSkhk__I6iBm42CJoIToCL2zePGJ71aHrFluTK_IxSOqji4ZVw_kw3UPdp_Mute9xLnTnNWh81yGc"
                    alt="Children participating in outdoor summer camp activities"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />

                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent p-6 md:p-8">
                    <div className="max-w-md rounded-xl border border-white/30 bg-white/20 p-4 text-white backdrop-blur-md">
                      <p className="text-sm font-medium">
                        &quot;My kids love the weekly trips! The staff is incredible
                        and very professional.&quot;
                      </p>
                      <p className="mt-2 text-xs opacity-80">— Maria G., Parent</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <ActivitiesYearRound />

          <section
            className="relative mt-20 overflow-hidden rounded-[3rem] bg-slate-900 px-8 py-16 text-center text-white"
            aria-label="Call to action"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="mb-6 text-4xl font-black tracking-tight">
                Ready to join the fun?
              </h2>
              <p className="mb-10 text-lg text-slate-300">
                Spaces fill up quickly for our seasonal colonies and sports academies.
                Secure your spot today and let the adventure begin!
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-primary px-10 py-4 text-sm font-black uppercase tracking-widest shadow-xl shadow-primary/40 transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto"
                >
                  Register Online
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-10 py-4 text-sm font-black uppercase tracking-widest backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto"
                >
                  Contact Us
                </Link>
              </div>

              <div className="mt-12 flex items-center justify-center gap-8">
                {[
                  { value: "500+", label: "Active Kids" },
                  { value: "25+", label: "Programs" },
                  { value: "15", label: "Expert Coaches" },
                ].map((stat, idx) => (
                  <div key={stat.label} className="flex items-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs font-black uppercase text-slate-400">
                        {stat.label}
                      </p>
                    </div>
                    {idx < 2 ? <div className="mx-8 h-8 w-px bg-white/20" /> : null}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </ActivitiesFiltersProvider>
  );
}
