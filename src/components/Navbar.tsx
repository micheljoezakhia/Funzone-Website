"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const LINKS: Array<{ href: string; label: string }> = [
  { href: "/", label: "Home" },
  { href: "/activities", label: "Activities" },
  { href: "/birthdays", label: "Parties" },
  { href: "/locations", label: "Locations" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
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
        "text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-background-dark",
        active ? "text-primary" : "text-[#0d171c] hover:text-primary dark:text-gray-300",
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

  return (
    <header className="sticky top-0 z-50 border-b border-b-[#e7eff4] bg-white px-6 py-4 dark:border-b-[#1e2e37] dark:bg-background-dark lg:px-40">
      <div className="flex items-center justify-between whitespace-nowrap">
        <Link
          href="/"
          className="flex items-center gap-4 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-background-dark"
          aria-label="Fun Zone Lebanon home"
        >
          <div className="text-primary size-8" aria-hidden="true">
            <svg
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <span className="text-xl font-extrabold leading-tight tracking-tight text-[#0d171c] dark:text-white">
            Fun Zone Lebanon
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-end gap-8 md:flex">
          <nav className="flex items-center gap-8" aria-label="Primary">
            {navLinks.map((l) => (
              <NavLink key={l.href} href={l.href} active={isActive(l.href)}>
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center md:hidden">
          <button
            type="button"
            className="rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-controls="mobile-menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className="material-symbols-outlined text-3xl" aria-hidden="true">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
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
            "fixed left-4 right-4 top-24 z-[60] rounded-2xl border border-[#e7eff4] bg-white p-4 shadow-xl transition-all motion-reduce:transition-none dark:border-[#1e2e37] dark:bg-background-dark",
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
        </div>
      </div>
    </header>
  );
}
