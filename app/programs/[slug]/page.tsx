import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProgramBySlug, PROGRAMS } from "@/data";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return PROGRAMS.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) return { title: "Program not found" };

  return {
    title: program.title,
    description: program.subtitle,
    alternates: { canonical: `/programs/${program.slug}` },
  };
}

function toneClasses(tone: string) {
  switch (tone) {
    case "orange":
      return "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400";
    case "green":
      return "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400";
    case "purple":
      return "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
    case "primary":
    default:
      return "bg-primary/10 text-primary dark:bg-primary/10";
  }
}

export default async function ProgramDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);
  if (!program) notFound();

  return (
    <div className="bg-background-light font-jakarta text-[#0d171c] transition-colors duration-300 dark:bg-background-dark dark:text-white">
      <div className="mx-auto w-full max-w-[1024px] px-4 py-8 md:px-10">
        <section className="relative min-h-[400px] overflow-hidden rounded-2xl bg-slate-200 shadow-2xl dark:bg-slate-800">
          <Image
            src={program.hero.src}
            alt={program.hero.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                "linear-gradient(0deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0) 70%)",
            }}
          />

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                {program.badges.primary}
              </span>
              <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                {program.badges.secondary}
              </span>
            </div>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-white md:text-5xl">
              {program.title}
            </h1>
            <p className="mt-2 max-w-2xl text-lg text-white/90">{program.subtitle}</p>
          </div>
        </section>

        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 py-5 text-sm">
          {program.breadcrumbs.map((crumb, idx) => {
            const isLast = idx === program.breadcrumbs.length - 1;
            const node = crumb.href ? (
              <Link
                href={crumb.href}
                className="font-medium text-primary hover:underline"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className={isLast ? "text-slate-500 dark:text-slate-400" : "text-primary"}>
                {crumb.label}
              </span>
            );

            return (
              <div key={`${crumb.label}-${idx}`} className="flex items-center gap-2">
                {node}
                {!isLast ? <span className="text-slate-400">/</span> : null}
              </div>
            );
          })}
        </nav>

        <section aria-label="Program stats" className="py-2">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {program.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm dark:border-slate-700 dark:bg-[#1e2e37]"
              >
                <span className="material-symbols-outlined mb-2 text-primary" aria-hidden="true">
                  {stat.icon}
                </span>
                <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
                  {stat.label}
                </span>
                <span className="mt-1 font-bold">{stat.value}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-8 py-10 lg:flex-row">
          <div className="flex-1 space-y-12">
            <section aria-label="About the program">
              <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold">
                <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                {program.about.title}
              </h2>
              {program.about.paragraphs.map((p) => (
                <p
                  key={p}
                  className="mb-4 leading-relaxed text-slate-600 dark:text-slate-300"
                >
                  {p}
                </p>
              ))}
              {program.about.quote ? (
                <div className="rounded-r-lg border-l-4 border-primary bg-primary/5 p-4">
                  <p className="text-sm italic text-slate-700 dark:text-slate-300">
                    &quot;{program.about.quote}&quot;
                  </p>
                </div>
              ) : null}
            </section>

            <section aria-label="What's included">
              <h2 className="mb-6 text-2xl font-bold">What&apos;s Included</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {program.included.map((item) => (
                  <div key={item.title} className="space-y-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${toneClasses(item.tone)}`}
                    >
                      <span className="material-symbols-outlined" aria-hidden="true">
                        {item.icon}
                      </span>
                    </div>
                    <h3 className="font-bold">{item.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section aria-label="Schedule">
              <h2 className="mb-6 text-2xl font-bold">{program.schedule.title}</h2>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-[#1e2e37]">
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                  {program.schedule.items.map((item, idx) => (
                    <div
                      key={`${item.time}-${item.label}`}
                      className={`flex items-center gap-4 p-4 ${
                        idx % 2 === 1 ? "bg-slate-50 dark:bg-white/5" : ""
                      }`}
                    >
                      <span className="w-20 shrink-0 text-sm font-bold text-primary">
                        {item.time}
                      </span>
                      <span className="h-2 w-2 rounded-full bg-slate-300" aria-hidden="true" />
                      <p className="text-sm font-medium">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          <aside className="w-full shrink-0 lg:w-[320px]">
            <div className="sticky top-24 space-y-6">
              <div
                id="register"
                className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-[#1e2e37]"
              >
                <h2 className="text-xl font-bold">{program.register.title}</h2>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {program.register.note}
                </p>

                <div className="my-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Weekly Fee
                    </span>
                    <span className="font-bold">{program.register.pricing.weeklyFee}</span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-700">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Monthly Pass
                    </span>
                    <span className="font-bold text-green-600">
                      {program.register.pricing.monthlyPass.current}{" "}
                      {program.register.pricing.monthlyPass.original ? (
                        <span className="ml-1 text-xs text-slate-400 line-through">
                          {program.register.pricing.monthlyPass.original}
                        </span>
                      ) : null}
                    </span>
                  </div>

                  {program.register.pricing.transportation ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Transportation
                      </span>
                      <span className="font-bold">
                        {program.register.pricing.transportation}
                      </span>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-4">
                  {program.register.fields.map((field) => (
                    <div key={field.label}>
                      <label className="mb-1 block text-xs font-bold uppercase text-slate-500">
                        {field.label}
                      </label>
                      <input
                        className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-900"
                        placeholder={field.placeholder}
                        type={field.type}
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-white shadow-sm transition-all hover:brightness-110"
                  >
                    {program.register.cta}
                    <span className="material-symbols-outlined text-sm" aria-hidden="true">
                      arrow_forward
                    </span>
                  </button>
                </div>

                <p className="mt-4 text-center text-[10px] font-medium uppercase text-slate-400">
                  {program.register.disclaimer}
                </p>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/10 p-6 dark:bg-primary/5">
                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
                  <span className="material-symbols-outlined text-base text-primary" aria-hidden="true">
                    verified_user
                  </span>
                  {program.safety.title}
                </h3>
                <ul className="space-y-2">
                  {program.safety.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                    >
                      <span
                        className="material-symbols-outlined pt-0.5 text-xs text-primary"
                        aria-hidden="true"
                      >
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <section
          aria-label="Registration info"
          className="mt-4 border-t border-slate-200 py-12 dark:border-slate-700"
        >
          <h2 className="mb-8 text-2xl font-bold">{program.registrationInfo.title}</h2>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-lg font-bold">
                {program.registrationInfo.documentsTitle}
              </h3>
              <ul className="space-y-4">
                {program.registrationInfo.documents.map((doc, idx) => (
                  <li key={doc} className="flex gap-4">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-slate-100 text-xs font-bold dark:bg-slate-800">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{doc}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold">
                {program.registrationInfo.paymentTitle}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {program.registrationInfo.paymentText}
              </p>
              <div className="flex gap-4 opacity-70">
                {program.registrationInfo.paymentIcons.map((icon) => (
                  <span key={icon} className="material-symbols-outlined text-3xl" aria-hidden="true">
                    {icon}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/activities"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            >
              Back to Activities
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                arrow_forward
              </span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
