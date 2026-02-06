import Image from "next/image";
import Link from "next/link";
import { LOCATIONS } from "@/data";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBvQWntlHrDWkjjBobsIm1-v2s_y36pzrX87DrBLwEWrdweA_HhMEaXEBTqdYc1QLrpJT9B96FH2rpxSr4hN5XJS84wGAwBD2CI1Sit54zUqIT-qpLNL-mile8aJXWC90oHYzKZXwns_BGTiEgHqNEJdFM01nGL91f4Px7vIcDi4vWVRK0TTM6FhSIcuAC5W5hGdT3rUUwOpJyLw75CIOkgBVBRCaZS3geb9GsygOeBf5AqTE8uBHPxt2eMu0ifaZQKBU1QtNdv1iI";

const AVATARS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAl45P3ZPEvm-PoXAl6bSuWezMQM6wCJ6jdAQmBhx5l-OOcRKeHzN19XgOOycQi4-lwUYKV-L5ZOlGjwjywVGKMwZ3l_D58lw3YnphotCTj2TQBP_-N3Qa56N8qlozJqeXiUuiKy1SDRX_0QD9_6XlIVqehYKEju__N4IeMdqTnsx1NcUGVGr9JRqere393qItQ80s6yZXRImdLMYi7_EKxkNGAs03AyBgqTNCbAwCqJc-c0QYxtvnwhKDHqimmO1tEe0t0UFGer9U",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBL-lGDVMA0hP7M9VxoX1emVmrwcqVosry10qmuCGN42fvGHQxAX8NLQLW8g_xBCryzqzFbG8W8PsQUTo-L_Cmuw1oCH2Qn1OxsO2PsGboC87RHRcjl5sR5516801RfjxH6thWNmrm4UPkW75o-EKeewYqmu-_Ok_wr9YvfQirlp0J0nP-Y3DlodDfA6SlVPoz-wn4xx4-Ljh53Pt5rwgq8OStAIJ4AzwJgC15WpiZLIrLs6GZT5jlBO4IkuunBSEHbb4BRwtyfzac",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCCOd7h9HAZQBPzrGm-Y-6Eb10VlneBynkt7729t6-KIVONDTx8_mZOXSE7JNr9bPDyCjT8MDrSWPBmp1Sl50WrUVmg6bz6OEtpDEbABScIYvcScMvW61IcUPkKbKcS2R0nwm4BlyBi_2EHbYXgKedvm1uBotV8tj6Bjnx6BFRZFFe4ibr3ssrvqKdxhdH18KkmWfis0Hxh6xWV_AUH9WplU-mTwq9iuRs67wZHILRPvRhMHCTgj71i38CSbw69GY7Pke2ON5-KVR8",
];

const STORY_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBzhL1oflbgevbvH0-PppxtMMMonyhgU_5nlOiYtZb2WTr5_Mjka1eOQlZQQVt-Z6RwvlqWf_KN4hlQwJmO6Pt24Yn36ashBCBgFca4z6vCcRSEDIBmTCXnYMERXdjtfOf6v3A78ptGFmiFchPHDdju5L32b7ctsz5RBrABvYTinhnVjLhpCjQbanIUtqawLO0HyWNCWLauQrIdpIL97STUz7QBzHLP9uE1ghFT5Eu6lUbdZJZVfIo-xuJM-EdRmdC2M5FjhEYmcXU";

export default function Home() {
  return (
    <>
      <section className="relative flex min-h-[600px] items-center md:min-h-[85vh]">
        <div className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE}
            alt="Water park background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background-dark/90 via-background-dark/50 to-transparent dark:from-black/90 dark:via-black/60" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 md:py-14 lg:px-8 lg:py-16">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="mb-6 inline-block rounded-full border border-secondary/30 bg-secondary/20 px-3 py-1 text-sm font-bold text-secondary backdrop-blur-sm">
              Top Rated Fun Center ⭐️
            </span>

            <h1 className="mb-6 font-display text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
              Where every moment is an{" "}
              <span className="bg-gradient-to-r from-secondary to-yellow-400 bg-clip-text text-transparent">
                adventure!
              </span>
            </h1>

            <p className="mb-8 max-w-lg text-lg leading-relaxed text-gray-200 md:text-xl">
              Safe, fun, and energetic spaces across 5 locations in Lebanon. 4
              kids playgrounds and 1 multi-sport park designed for joy.
            </p>

            <div className="mb-10 flex flex-col gap-4 sm:flex-row md:mb-12">
              <Link
                href="/locations"
                className="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 text-base font-semibold text-white shadow-xl shadow-primary/20 transition-all hover:-translate-y-1 hover:bg-sky-700"
              >
                Find a Location
              </Link>
              <Link
                href="/birthdays"
                className="inline-flex items-center justify-center rounded-2xl border-2 border-white/30 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10"
              >
                Plan a Party
              </Link>
            </div>

            <div className="flex items-center gap-4 text-white/90">
              <div className="flex -space-x-3">
                {AVATARS.map((src) => (
                  <Image
                    key={src}
                    src={src}
                    alt="Happy family"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full border-2 border-white object-cover dark:border-gray-900"
                  />
                ))}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-secondary text-xs font-bold dark:border-gray-900">
                  5k+
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex text-sm text-yellow-400">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span
                      key={idx}
                      className="material-symbols-rounded text-base"
                      aria-hidden="true"
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-sm font-medium">
                  Trusted by happy families
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-background-light py-24 dark:bg-background-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 font-display text-3xl font-bold text-text-light dark:text-white md:text-4xl">
              Explore the Fun Zones
            </h2>
            <p className="text-lg text-muted-light dark:text-muted-dark">
              From toddler play to football training, we have activities designed
              to keep every child active and entertained.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Soft Play",
                description:
                  "Safe play zones designed specifically for toddlers and young kids to explore freely.",
                icon: "child_care",
                iconColor: "text-primary",
                iconBg: "bg-blue-50 dark:bg-blue-900/30",
              },
              {
                title: "Slides & Play",
                description:
                  "Structured indoor fun with massive slides, ball pits, and supervised areas.",
                icon: "downhill_skiing",
                iconColor: "text-secondary",
                iconBg: "bg-orange-50 dark:bg-orange-900/30",
              },
              {
                title: "Football",
                description:
                  "Train and play on professional mini-fields at our dedicated Sports Zone.",
                icon: "sports_soccer",
                iconColor: "text-green",
                iconBg: "bg-green-50 dark:bg-green-900/30",
              },
              {
                title: "Birthdays",
                description:
                  "Party-ready venues with complete catering, decoration, and animation services.",
                icon: "cake",
                iconColor: "text-purple-500",
                iconBg: "bg-purple-50 dark:bg-purple-900/30",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="group rounded-2xl border border-gray-100 bg-surface-light p-8 text-center shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 dark:border-gray-800 dark:bg-surface-dark"
              >
                <div
                  className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-110 ${card.iconBg}`}
                >
                  <span
                    className={`material-symbols-rounded text-3xl ${card.iconColor}`}
                    aria-hidden="true"
                  >
                    {card.icon}
                  </span>
                </div>
                <h3 className="mb-3 font-display text-xl font-bold text-text-light dark:text-white">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-light dark:text-muted-dark">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white py-24 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <div className="relative w-full lg:w-1/2">
              <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-secondary opacity-20 blur-2xl" />
              <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-primary opacity-20 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-transform duration-500 hover:rotate-0 lg:rotate-2">
                <div className="absolute right-0 top-0 h-full w-1/2 rounded-l-full bg-orange-400 opacity-20 mix-blend-multiply dark:mix-blend-overlay" />
                <Image
                  src={STORY_IMAGE}
                  alt="Child playing on slide"
                  width={1200}
                  height={800}
                  className="h-[500px] w-full object-cover"
                />
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <h4 className="mb-2 text-sm font-bold uppercase tracking-widest text-secondary">
                About Us
              </h4>
              <h2 className="mb-6 font-display text-4xl font-bold leading-tight text-text-light dark:text-white md:text-5xl">
                Our story
              </h2>

              <div className="space-y-6 text-lg leading-relaxed text-muted-light dark:text-muted-dark">
                <p>
                  Fun Zone began as a single playground built for families who
                  want more than entertainment – they want peace of mind.
                </p>
                <p>
                  As our community grew, we opened more branches and today we
                  welcome families across Lebanon through 4 Fun Zone playgrounds
                  and Sports Zone, our multi-sport park. We keep the focus on
                  clean spaces, well-maintained equipment, and staff who treat
                  parents and kids with warmth and respect.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/locations"
                  className="inline-flex items-center rounded-xl border border-gray-300 px-6 py-3 font-semibold text-text-light transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
                >
                  Explore locations
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-xl bg-green px-6 py-3 font-semibold text-white shadow-lg shadow-green/30 transition-all hover:-translate-y-0.5 hover:bg-green-600"
                >
                  <span
                    className="material-symbols-rounded mr-2"
                    aria-hidden="true"
                  >
                    chat
                  </span>
                  WhatsApp us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="locations"
        className="bg-background-light py-24 dark:bg-background-dark"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className="mb-3 font-display text-3xl font-bold text-text-light dark:text-white md:text-4xl">
                Our locations
              </h2>
              <p className="text-muted-light dark:text-muted-dark">
                Choose the branch closest to you. Tap a location to see hours,
                get directions, or message us on WhatsApp.
              </p>
            </div>

            <Link
              href="/locations"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-surface-light px-5 py-3 text-sm font-semibold text-text-light shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-surface-dark dark:text-white dark:hover:bg-gray-800"
            >
              View all
              <span
                className="material-symbols-rounded ml-2 text-lg"
                aria-hidden="true"
              >
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {LOCATIONS.map((location) => (
              <Link
                key={location.id}
                href={`/locations/${location.slug}`}
                className="group rounded-2xl border border-gray-100 bg-surface-light p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/10 dark:border-gray-800 dark:bg-surface-dark"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg font-bold text-text-light dark:text-white">
                      {location.city}
                    </p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-light dark:text-muted-dark">
                      {location.name}
                    </p>
                  </div>
                  <span
                    className="material-symbols-rounded text-2xl text-primary"
                    aria-hidden="true"
                  >
                    {location.type === "sports" ? "sports_soccer" : "location_on"}
                  </span>
                </div>

                <div className="mt-5 inline-flex items-center text-sm font-semibold text-primary">
                  View details
                  <span
                    className="material-symbols-rounded ml-1 text-base transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background-light py-24 dark:bg-background-dark">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="flex flex-col justify-center lg:col-span-5">
              <h2 className="mb-6 font-display text-4xl font-bold text-text-light dark:text-white">
                Why families choose us
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-muted-light dark:text-muted-dark">
                Parents come back when the experience feels safe, clean, and
                genuinely welcoming. From organized play zones to comfortable
                spaces for parents, we keep visits calm and easy to navigate.
              </p>
              <div className="hidden lg:block">
                <Link
                  href="/gallery"
                  className="inline-flex items-center font-semibold text-primary hover:text-sky-700"
                >
                  Read parent reviews{" "}
                  <span className="material-symbols-rounded ml-1">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-7">
              {[
                {
                  title: "Family comfort",
                  description:
                    "Parent seating, clear visibility lines, and a layout designed for families to relax while kids play safely.",
                  icon: "chair",
                  accent: "text-indigo-600 dark:text-indigo-400",
                  bg: "bg-indigo-50 dark:bg-indigo-900/30",
                },
                {
                  title: "Quick directions",
                  description:
                    "Call, WhatsApp, or get directions in one tap. Each branch page keeps the essentials upfront so you can decide and go.",
                  icon: "directions",
                  accent: "text-teal-600 dark:text-teal-400",
                  bg: "bg-teal-50 dark:bg-teal-900/30",
                },
                {
                  title: "Safety First",
                  description:
                    "Equipment is inspected daily and cleaned thoroughly. We prioritize hygiene so you can prioritize fun.",
                  icon: "health_and_safety",
                  accent: "text-rose-600 dark:text-rose-400",
                  bg: "bg-rose-50 dark:bg-rose-900/30",
                },
                {
                  title: "Café & Snacks",
                  description:
                    "Enjoy high-quality coffee and healthy snacks while waiting. A treat for parents and kids alike.",
                  icon: "coffee",
                  accent: "text-amber-600 dark:text-amber-400",
                  bg: "bg-amber-50 dark:bg-amber-900/30",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex h-full flex-col items-start rounded-2xl border border-gray-100 bg-surface-light p-8 shadow-sm dark:border-gray-800 dark:bg-surface-dark"
                >
                  <div
                    className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${item.bg} ${item.accent}`}
                  >
                    <span
                      className="material-symbols-rounded text-2xl"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="mb-3 font-display text-xl font-bold text-text-light dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-light dark:text-muted-dark">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="lg:hidden">
              <Link
                href="/gallery"
                className="inline-flex items-center font-semibold text-primary hover:text-sky-700"
              >
                Read parent reviews{" "}
                <span className="material-symbols-rounded ml-1">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
