import Link from "next/link";
import { LOCATIONS } from "@/data";

const CONTACT = {
  phone: "+961 1 234 567",
  email: "hello@funzone.lb",
  address: ["Main Highway, Zalka,", "Lebanon"],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-surface-light pb-8 pt-16 dark:border-gray-800 dark:bg-surface-dark">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-1">
            <div className="mb-6 flex items-center gap-2">
              <span
                className="material-symbols-rounded text-3xl text-primary"
                aria-hidden="true"
              >
                celebration
              </span>
              <span className="font-display text-xl font-bold text-text-light dark:text-white">
                FunZone
              </span>
            </div>
            <p className="mb-6 text-sm text-muted-light dark:text-muted-dark">
              Making memories, one smile at a time. The premier family
              entertainment center in Lebanon.
            </p>
            <div className="flex space-x-4">
              <a
                className="text-gray-400 transition-colors hover:text-primary"
                href="#"
                aria-label="Website"
              >
                <span className="material-symbols-rounded" aria-hidden="true">
                  public
                </span>
              </a>
              <a
                className="text-gray-400 transition-colors hover:text-primary"
                href="#"
                aria-label="Instagram"
              >
                <span className="material-symbols-rounded" aria-hidden="true">
                  photo_camera
                </span>
              </a>
              <a
                className="text-gray-400 transition-colors hover:text-primary"
                href={`mailto:${CONTACT.email}`}
                aria-label="Email"
              >
                <span className="material-symbols-rounded" aria-hidden="true">
                  mail
                </span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-text-light dark:text-white">
              Locations
            </h4>
            <ul className="space-y-2 text-sm text-muted-light dark:text-muted-dark">
              {LOCATIONS.map((l) => (
                <li key={l.id}>
                  <Link
                    className="transition-colors hover:text-primary"
                    href={`/locations/${l.slug}`}
                  >
                    {l.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-text-light dark:text-white">
              Activities
            </h4>
            <ul className="space-y-2 text-sm text-muted-light dark:text-muted-dark">
              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  href="/activities"
                >
                  Soft Play
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  href="/activities"
                >
                  Trampoline Park
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  href="/birthdays"
                >
                  Birthday Packages
                </Link>
              </li>
              <li>
                <Link
                  className="transition-colors hover:text-primary"
                  href="/contact"
                >
                  School Trips
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-text-light dark:text-white">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-muted-light dark:text-muted-dark">
              <li className="flex items-center gap-2">
                <span
                  className="material-symbols-rounded text-lg text-primary"
                  aria-hidden="true"
                >
                  call
                </span>
                <a className="hover:text-primary" href={`tel:${CONTACT.phone}`}>
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="material-symbols-rounded text-lg text-primary"
                  aria-hidden="true"
                >
                  mail
                </span>
                <a
                  className="hover:text-primary"
                  href={`mailto:${CONTACT.email}`}
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <span
                  className="material-symbols-rounded mt-0.5 text-lg text-primary"
                  aria-hidden="true"
                >
                  location_on
                </span>
                <span>
                  {CONTACT.address[0]}
                  <br />
                  {CONTACT.address[1]}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 dark:border-gray-800 md:flex-row">
          <p className="text-xs text-muted-light dark:text-muted-dark">
            © {new Date().getFullYear()} Fun Zone Lebanon. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-light dark:text-muted-dark">
            <a className="hover:text-text-light dark:hover:text-white" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-text-light dark:hover:text-white" href="#">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

