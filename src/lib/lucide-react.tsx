import * as React from "react";
import { cn } from "@/lib/cn";

export type LucideProps = React.SVGProps<SVGSVGElement> & {
  title?: string;
  decorative?: boolean;
};

export type LucideIcon = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

const DEFAULT_SIZE = 24;

export function createLucideIcon(
  displayName: string,
  paths: React.ReactNode,
): LucideIcon {
  const Icon = React.forwardRef<SVGSVGElement, LucideProps>(function Icon(
    { className, title, decorative, width, height, ...props },
    ref,
  ) {
    const isDecorative = decorative ?? !title;

    return (
      <svg
        ref={ref}
        viewBox="0 0 24 24"
        width={width ?? DEFAULT_SIZE}
        height={height ?? DEFAULT_SIZE}
        className={cn("shrink-0", className)}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden={isDecorative ? "true" : undefined}
        role={isDecorative ? undefined : "img"}
        aria-label={isDecorative ? undefined : title}
        {...props}
      >
        {title ? <title>{title}</title> : null}
        {paths}
      </svg>
    );
  });

  Icon.displayName = displayName;
  return Icon;
}

export const ArrowRight = createLucideIcon(
  "ArrowRight",
  <>
    <path d="M5 12h12" />
    <path d="M13 6l6 6-6 6" />
  </>,
);

export const Basketball = createLucideIcon(
  "Basketball",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a13 13 0 0 1 0 18" />
    <path d="M12 3a13 13 0 0 0 0 18" />
  </>,
);

export const Bolt = createLucideIcon("Bolt", <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />);

export const Cake = createLucideIcon(
  "Cake",
  <>
    <path d="M7 10h10v3a5 5 0 0 1-10 0v-3z" />
    <path d="M6 21h12" />
    <path d="M9 10V8a3 3 0 0 1 6 0v2" />
    <path d="M12 2c1 1 1.2 2 0 3-1-1-1.2-2 0-3z" />
  </>,
);

export const Camera = createLucideIcon(
  "Camera",
  <>
    <path d="M7 7h10l1.5 2H21v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9h2.5L7 7z" />
    <circle cx="12" cy="14" r="3.5" />
  </>,
);

export const Check = createLucideIcon("Check", <path d="M20 6L9 17l-5-5" />);

export const Clock = createLucideIcon(
  "Clock",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v6l4 2" />
  </>,
);

export const Door = createLucideIcon(
  "Door",
  <>
    <path d="M7 3h10v18H7z" />
    <path d="M10 12h.01" />
  </>,
);

export const Dumbbell = createLucideIcon(
  "Dumbbell",
  <>
    <path d="M4 10v4" />
    <path d="M7 9v6" />
    <path d="M10 12h4" />
    <path d="M17 9v6" />
    <path d="M20 10v4" />
  </>,
);

export const Heart = createLucideIcon(
  "Heart",
  <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.5-7 10-7 10z" />,
);

export const Info = createLucideIcon(
  "Info",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 10v6" />
    <path d="M12 7h.01" />
  </>,
);

export const MapPin = createLucideIcon(
  "MapPin",
  <>
    <path d="M12 21s7-5 7-11a7 7 0 0 0-14 0c0 6 7 11 7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </>,
);

export const MessageCircle = createLucideIcon(
  "MessageCircle",
  <path d="M21 11.5a7.5 7.5 0 0 1-7.5 7.5H8l-5 3 1.5-5A7.5 7.5 0 0 1 3 11.5 7.5 7.5 0 0 1 10.5 4h3A7.5 7.5 0 0 1 21 11.5z" />,
);

export const Moon = createLucideIcon(
  "Moon",
  <path d="M21 13.1A7.5 7.5 0 0 1 10.9 3 6.8 6.8 0 1 0 21 13.1z" />,
);

export const Padel = createLucideIcon(
  "Padel",
  <>
    <path d="M14 3a6 6 0 0 1 0 12h-2a6 6 0 1 1 0-12h2z" />
    <path d="M12 15l5 6" />
    <path d="M17 21a2 2 0 0 0 3-3" />
    <path d="M10.5 6.5h.01" />
    <path d="M13.5 8.5h.01" />
    <path d="M10.5 10.5h.01" />
  </>,
);

export const Party = createLucideIcon(
  "Party",
  <>
    <path d="M4 12l4-2 2-4 10 10-4 2-2 4-10-10z" />
    <path d="M14 4h.01" />
    <path d="M18 8h.01" />
    <path d="M6 6h.01" />
  </>,
);

export const Phone = createLucideIcon(
  "Phone",
  <path d="M6 3h3l2 5-2 1a12 12 0 0 0 6 6l1-2 5 2v3c0 1-1 2-2 2A16 16 0 0 1 4 5c0-1 1-2 2-2z" />,
);

export const Shield = createLucideIcon(
  "Shield",
  <>
    <path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />
    <path d="M9 12l2 2 4-5" />
  </>,
);

export const Slides = createLucideIcon(
  "Slides",
  <>
    <path d="M7 3v9" />
    <path d="M7 12h6l4 9" />
    <path d="M10 21h8" />
    <path d="M7 8h6" />
  </>,
);

export const Soccer = createLucideIcon(
  "Soccer",
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7l3 2-1 3h-4l-1-3 3-2z" />
    <path d="M9 12l-3 2 1 3" />
    <path d="M15 12l3 2-1 3" />
    <path d="M10 12l-2.5 7" />
    <path d="M14 12l2.5 7" />
  </>,
);

export const Sparkles = createLucideIcon(
  "Sparkles",
  <>
    <path d="M12 2l1.2 4 4 1.2-4 1.2-1.2 4-1.2-4-4-1.2 4-1.2L12 2z" />
    <path d="M19 12l.8 2.6 2.6.8-2.6.8L19 19l-.8-2.6-2.6-.8 2.6-.8L19 12z" />
  </>,
);

export const Sun = createLucideIcon(
  "Sun",
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M4.9 4.9l1.4 1.4" />
    <path d="M17.7 17.7l1.4 1.4" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M4.9 19.1l1.4-1.4" />
    <path d="M17.7 6.3l1.4-1.4" />
  </>,
);

export const Ticket = createLucideIcon(
  "Ticket",
  <>
    <path d="M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8z" />
    <path d="M12 7v10" />
  </>,
);

export const Toddler = createLucideIcon(
  "Toddler",
  <>
    <circle cx="12" cy="8" r="3" />
    <path d="M8 21v-6a4 4 0 0 1 8 0v6" />
    <path d="M8 17h8" />
  </>,
);

export const Users = createLucideIcon(
  "Users",
  <>
    <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    <circle cx="9.5" cy="8" r="3" />
    <path d="M21 21v-2a4 4 0 0 0-3-3.9" />
    <path d="M16.5 5.1a3 3 0 0 1 0 5.8" />
  </>,
);

export const Utensils = createLucideIcon(
  "Utensils",
  <>
    <path d="M7 3v8" />
    <path d="M5 3v8" />
    <path d="M9 3v8" />
    <path d="M5 11h4v10" />
    <path d="M15 3v8a2 2 0 0 0 2 2h1v8" />
    <path d="M18 3v6" />
  </>,
);

