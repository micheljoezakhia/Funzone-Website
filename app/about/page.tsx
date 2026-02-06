import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JoyMakersCarousel } from "./JoyMakersCarousel";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Fun Zone Lebanon - our story, standards, and the people behind the fun.",
};

export default function AboutPage() {
  const members = [
    {
      name: "Maya K.",
      role: "Head of Smiles",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCkcqCqRuXXJghp1NvNjC9nQ9uNMsgXGdqRf9FHSGrQk8HJ_PE9GM-8nViQCu_FMOBeOnBJCxuZCG3if1d6eEBHx-4etgTmBOQV_RBt8gFbEpDtacHQnkBb2LM0ypikV8R-h9nROGR3zPVgo5kOKbgkxSKtWrieQwfiDfIsyAQEGjb0ktDRVc18Nk0OKzndbU1ZyrDX73xecfCHlcZM3PAkiySa39u_q-YABx9tRqkDvifEL48B7fhcoxVBDRCnYSdQWOB5tn0RLKY",
    },
    {
      name: "Sami R.",
      role: "Safety Coordinator",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaNU2Yd9DUzEgBYa_5yKAe5OYQkgrr-r9vmi4Zy2-wxhnSpOx8JYUW3jn4vWR2hkjXRyl2CYlCN7ABYQmowaRsdNQ7liPFe7czoCvcRYSe85kI317JN2-Q2alXfwh-5w8aJmA3gnQ7ZvknS-qxPvaha3cdX7Oq4cIu4Fl2URqctfTJv3YfTdhetEP3PYJ5_6gSbFoGBcQ8quf7icILfiYZ4GAUtHPGKcOA1QxQqW0BXUvMOCx34PTHL_Va4pckE8YqBrCrLsKlHjo",
    },
    {
      name: "Leila T.",
      role: "Activity Lead",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWSlGB6ic-YfIt4VssiirG8CzYiqfP9YMqNw35VzJd-66n54aFGm68FjPx8mJrxwQ4j48zUuBo4DafXKi5KmHdr72h3QmdJta6FbjMgk1vQDpnxB4eWFFdiOPrZtR6GL8xp1miripnbcAhvvA0mjLRQ9Asq2WIuQF96qGW7UkD2tDdKfKWfXfaKiuInIvFjtANDI2YAXfU2cTALAeHJieq859nE1wmyPvjlUvx8zSziub4uqNagYoyKNn729Z0TZ1QsVM1XAROKAM",
    },
    {
      name: "Marc O.",
      role: "Party Host",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBejTOLFoavr8rlF-9ejerilFIL9FFJ5gvQ5Ix0APVEDzdExlEduidMi2ZPBSEbNk53wzKti3G4xiuhJ2GQHgcB_PpcVDGxvuVCrJTo19hJlUeHfEfmKBfxa9a53P5te8GZieVZqARPFlpcxaB0BFk1dm6_2rVwvLziyWTpjaj2vRw801J8qNhT_I43derIfkuyOOMCkta4yLQJvam9jQ_gY16IN7c8DhhPRYVgoqTNWg4wnBuEkotuwEReldk3Nb7BtlprlvxE3Ck",
    },
    {
      name: "Rana A.",
      role: "Guest Experience",
      img: "https://picsum.photos/seed/fz-rana/900/900",
    },
    {
      name: "Karim S.",
      role: "Play Coach",
      img: "https://picsum.photos/seed/fz-karim/900/900",
    },
    {
      name: "Nadine H.",
      role: "Birthday Coordinator",
      img: "https://picsum.photos/seed/fz-nadine/900/900",
    },
    {
      name: "Omar J.",
      role: "Front Desk Lead",
      img: "https://picsum.photos/seed/fz-omar/900/900",
    },
    {
      name: "Dalia N.",
      role: "Café & Snacks",
      img: "https://picsum.photos/seed/fz-dalia/900/900",
    },
    {
      name: "Tony M.",
      role: "Maintenance Lead",
      img: "https://picsum.photos/seed/fz-tony/900/900",
    },
    {
      name: "Yara B.",
      role: "Event Animator",
      img: "https://picsum.photos/seed/fz-yara/900/900",
    },
    {
      name: "Hadi F.",
      role: "Sports Coach",
      img: "https://picsum.photos/seed/fz-hadi/900/900",
    },
  ];

  return (
    <div className="font-jakarta bg-background-light text-text-light transition-colors duration-300 dark:bg-background-dark dark:text-text-dark">
      <section className="relative h-[560px] w-full overflow-hidden sm:h-[600px]">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkTygswaByCFhXWfdJRfWgr7RlNUDxhkadRRVAfTfWA1lW0pWgJ6rYbsB9_cQs0M-LhdYb-6V_kqL_F98epKusFjZM2eS9Qam0vZTKuy8KvrpeWH42lYps5NFdPcuMuOEp0f2JNAna-o0aLpzd_05mJIaFUrrGSrczd7H0w5uoXeKrjMUMiILmh7HDh4hPAc-64aLvyeZGydSWO7rOYdAVpe0psf4RVZtzp1-mtQ8ZTgbdsd24-lCou9J9sjIel84AO2bLjGXTygk"
          alt="Happy family enjoying an indoor playground"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />

        <div className="relative z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-6 text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
            Our Heart is in Every Play.
          </h1>
          <p className="max-w-2xl text-lg font-medium text-white/90 md:text-xl">
            Creating a safe haven for kids in Lebanon where every moment is filled
            with laughter, discovery, and pure joy.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-6 py-20">
        <section className="mb-28 grid grid-cols-1 items-center gap-12 md:mb-32 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-6">
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              Our Story
            </span>
            <h2 className="text-4xl font-black leading-tight tracking-tight md:text-5xl">
              Creating a Safe Haven for Lebanese Families
            </h2>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Fun Zone Lebanon was born from a simple mission: to provide families
              with a secure, high-quality entertainment space that feels like home.
              In a world that moves too fast, we believe play is essential for
              growth, happiness, and mental well-being.
            </p>
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              From our very first branch to our presence across five locations,
              we&apos;ve remained committed to being the heart of family fun in every
              community we serve.
            </p>
          </div>

          <div className="group relative">
            <div className="absolute -inset-4 -rotate-2 rounded-xl bg-primary/10 transition-transform group-hover:rotate-0" />
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkK7ZDGNfdyJtxzUcmJHAzoRWflsKcO0AZPbARvcba81BwoM0MA9Bn8FWq1dqfAEXyiXHgROcZGKm0WGsc8kNCpDWf-ovrbPzPsoKUUn6gi5vDpipiYW29Sr89Iv2wGWE79lPn8-2swsNDs5REdGOrCwkLnfkIYE9ntdPB2nljdmd1neih4dbSCDpClRgRJvGLCKilWqoneGMKq4rqKOgAq0taxnQLQOKoDJpFEZ2uf89ldwbTx4Z_MpTGsUi-d9OZmSa8RSjYZ7o"
              alt="Happy child playing in a colorful ball pit"
              width={1000}
              height={750}
              className="relative aspect-[4/3] w-full rounded-xl object-cover shadow-2xl"
            />
          </div>
        </section>

        <section className="mb-28 md:mb-32">
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <h2 className="mb-4 text-3xl font-black md:text-4xl">The Fresh Approach</h2>
            <p className="text-slate-600 dark:text-slate-400">
              We don&apos;t just provide space; we curate experiences that matter.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                title: "Safety First",
                icon: "health_and_safety",
                body: "Every piece of equipment is European-certified and rigorously inspected daily to ensure a worry-free environment.",
              },
              {
                title: "Pure Joy",
                icon: "sentiment_very_satisfied",
                body: "Our play zones are designed by child development experts to maximize engagement, creativity, and sheer fun.",
              },
              {
                title: "Community Driven",
                icon: "groups",
                body: "With 5 branches across Lebanon, we are more than a business; we are a hub for local families to connect.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-slate-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-background-dark"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <span className="material-symbols-outlined text-3xl" aria-hidden="true">
                    {p.icon}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold">{p.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mb-28 overflow-hidden rounded-[2rem] bg-primary/5 px-8 py-16 md:mb-32 md:px-16 md:py-20">
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-8 text-4xl font-black leading-tight">
                The Fun Zone Standards
              </h2>
              <p className="mb-10 text-lg text-slate-700 dark:text-slate-300">
                We take fun seriously. Our operational standards are designed to
                exceed international benchmarks for child safety and hygiene.
              </p>

              <div className="space-y-8">
                {[
                  {
                    num: "01",
                    title: "Hourly Sanitation",
                    body: "High-touch surfaces are sanitized every 60 minutes using child-safe, non-toxic hospital-grade disinfectants.",
                  },
                  {
                    num: "02",
                    title: "Certified Training",
                    body: "Every team member completes safety and child engagement training before starting.",
                  },
                  {
                    num: "03",
                    title: "Deep Clean Weekly",
                    body: "Our facility undergoes regular deep cleaning routines to keep play spaces fresh and hygienic.",
                  },
                ].map((s) => (
                  <div key={s.num} className="flex items-start gap-6">
                    <span className="text-6xl font-black leading-none text-primary/30">
                      {s.num}
                    </span>
                    <div>
                      <h3 className="mb-2 text-xl font-bold">{s.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjXc5K23U7nNwfjF5LXG-PUgzOZTd1_CvnScib1fZv9q8BvIo0ZyBK9Ea7CzsksDeHli9wuCQ348xc9OuENVgjKa9olNWpjOks6sOYAljl0_foR9zU0WywyMr2SPArNIWXGbWk_tT0R-aLh5wo2PFrSJxwliPFl5zNKtpCbAKypMdWZMFB2D0j1FwzI-LOcfrTMLE6VFogIBCJQL9acxMheteYIViVtZwVDPy2EbJicxYyjgJiHKbpe1P4bOKJtOgGEm_DArvXVEw"
                alt="Clean playground equipment"
                width={1000}
                height={780}
                className="rotate-3 rounded-2xl object-cover shadow-xl"
              />
            </div>
          </div>
        </section>

        <JoyMakersCarousel members={members} />

        <section className="mb-10">
          <div className="relative overflow-hidden rounded-3xl bg-background-dark p-12 text-center dark:bg-black md:p-20">
            <div className="pointer-events-none absolute inset-0 opacity-20">
              <svg
                className="h-full w-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <pattern
                  id="grid"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 10 0 L 0 0 0 10"
                    fill="none"
                    stroke="currentColor"
                    className="text-primary"
                    strokeWidth="0.1"
                  />
                </pattern>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="mb-6 text-4xl font-black text-white md:text-5xl">
                Ready to Experience the Magic?
              </h2>
              <p className="mb-10 text-lg text-white/70">
                Find a Fun Zone near you and let the adventure begin.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/locations"
                  className="transform rounded-xl bg-primary px-10 py-4 text-lg font-bold text-white transition-all hover:-translate-y-1 hover:bg-sky-700"
                >
                  Find a Location
                </Link>
                <Link
                  href="/birthdays"
                  className="rounded-xl border border-white/20 bg-white/10 px-10 py-4 text-lg font-bold text-white transition-all hover:bg-white/20"
                >
                  View Packages
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
