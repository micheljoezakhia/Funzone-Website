export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white px-6 py-12 dark:border-gray-800 dark:bg-background-dark lg:px-40">
      <div>
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="text-primary size-6" aria-hidden="true">
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
            <h2 className="text-lg font-bold text-[#0d171c] dark:text-white">
              Fun Zone Lebanon
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-500 dark:text-gray-400">
            <a className="transition-colors hover:text-primary" href="#">
              Privacy Policy
            </a>
            <a className="transition-colors hover:text-primary" href="#">
              Terms of Service
            </a>
            <a className="transition-colors hover:text-primary" href="#">
              Careers
            </a>
            <a className="transition-colors hover:text-primary" href="/contact">
              Contact
            </a>
          </div>

          <div className="flex gap-4">
            <a className="text-gray-400 transition-colors hover:text-primary" href="#">
              <span className="material-symbols-outlined" aria-hidden="true">
                social_leaderboard
              </span>
            </a>
            <a className="text-gray-400 transition-colors hover:text-primary" href="#">
              <span className="material-symbols-outlined" aria-hidden="true">
                camera_alt
              </span>
            </a>
            <a className="text-gray-400 transition-colors hover:text-primary" href="#">
              <span className="material-symbols-outlined" aria-hidden="true">
                video_library
              </span>
            </a>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-gray-400 dark:text-gray-600">
          © {new Date().getFullYear()} Fun Zone Lebanon. All rights reserved.
          Let&apos;s make memories!
        </div>
      </div>
    </footer>
  );
}
