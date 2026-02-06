import Image from "next/image";
import { cn } from "@/lib/cn";

export type PhotoStripItem = {
  src: string;
  alt: string;
};

export function PhotoStrip({
  items,
  className,
}: {
  items: PhotoStripItem[];
  className?: string;
}) {
  if (!items.length) return null;

  return (
    <div className={cn("sm:mx-auto sm:max-w-6xl", className)}>
      <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:snap-none sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0">
        {items.map((img, idx) => (
          <div
            key={`${img.src}-${idx}`}
            className="relative aspect-[4/3] w-[72%] shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-muted shadow-sm sm:w-auto"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 70vw, (max-width: 1024px) 20vw, 12vw"
              className="object-cover"
              priority={idx < 2}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/0 to-black/0" />
          </div>
        ))}
      </div>
    </div>
  );
}

