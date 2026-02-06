import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
        <p className="text-xs font-semibold text-foreground/60">404</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-6 text-foreground/70">
          The page you’re looking for doesn’t exist or has moved.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <ButtonLink href="/locations" variant="primary">
            Browse Locations
          </ButtonLink>
          <ButtonLink href="/" variant="outline">
            Back Home
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

