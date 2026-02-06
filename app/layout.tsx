/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://funzone.example",
  ),
  title: {
    default: "Fun Zone Lebanon",
    template: "%s · Fun Zone Lebanon",
  },
  description:
    "Family-friendly kids playgrounds across Lebanon plus a multi-sport park - play, celebrate, and stay active.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,400,0,0&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background-light text-text-light antialiased transition-colors duration-300 dark:bg-background-dark dark:text-text-dark">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-surface-light focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-text-light focus:shadow-lg dark:focus:bg-surface-dark dark:focus:text-text-dark"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="min-h-[calc(100dvh-8rem)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
