"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const LINKS: Array<{ href: string; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/locations", label: "Locations" },
  { href: "/activities", label: "Activities" },
  { href: "/birthdays", label: "Birthdays" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

function NavLink({
  href,
  children,
  active,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-light dark:focus-visible:ring-offset-background-dark",
        active
          ? "text-text-light hover:text-primary dark:text-gray-300 dark:hover:text-primary"
          : "text-muted-light hover:text-primary dark:text-gray-400 dark:hover:text-primary",
      )}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navLinks = useMemo(() => LINKS, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-surface-light/90 backdrop-blur-md dark:border-gray-800 dark:bg-background-dark/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-light dark:focus-visible:ring-offset-background-dark"
          >
            <span
              className="material-symbols-rounded text-4xl text-primary"
              aria-hidden="true"
            >
              celebration
            </span>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold leading-none tracking-tight text-text-light dark:text-white">
                FunZone
              </span>
              <span className="text-xs uppercase tracking-widest text-muted-light dark:text-muted-dark">
                Lebanon
              </span>
            </div>
          </Link>

          <nav aria-label="Primary" className="hidden items-center space-x-8 md:flex">
            {navLinks.map((l) => (
              <NavLink key={l.href} href={l.href} active={isActive(l.href)}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="Toggle theme"
            >
              <span className="material-symbols-rounded block text-xl dark:hidden">
                dark_mode
              </span>
              <span className="material-symbols-rounded hidden text-xl dark:block">
                light_mode
              </span>
            </button>

            <Link
              href="/locations"
              className="transform rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:-translate-y-0.5 hover:bg-sky-700"
            >
              Get Directions
            </Link>
          </div>

          <div className="flex items-center md:hidden">
            <button
              type="button"
              className="text-gray-500 focus:outline-none hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="material-symbols-rounded text-3xl" aria-hidden="true">
                {mobileOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "md:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn(
            "fixed inset-0 z-50 bg-black/30 transition-opacity motion-reduce:transition-none",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={cn(
            "fixed left-4 right-4 top-24 z-[60] rounded-2xl border border-gray-200 bg-surface-light p-4 shadow-xl transition-all motion-reduce:transition-none dark:border-gray-800 dark:bg-surface-dark",
            mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <nav aria-label="Primary (mobile)" className="grid gap-3">
            {navLinks.map((l) => (
              <NavLink
                key={l.href}
                href={l.href}
                active={isActive(l.href)}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-5 flex items-center justify-between gap-3 border-t border-gray-200 pt-4 dark:border-gray-800">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-text-light transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
            >
              <span className="material-symbols-rounded text-lg" aria-hidden="true">
                dark_mode
              </span>
              Theme
            </button>

            <Link
              href="/locations"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-colors hover:bg-sky-700"
            >
              Directions
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
