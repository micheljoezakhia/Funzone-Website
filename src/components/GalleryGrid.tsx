import Image from "next/image";

export type GalleryItem = {
  src: string;
  alt: string;
  caption?: string;
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  if (!items.length) {
    return (
      <div className="rounded-2xl border border-border bg-card p-10 text-center text-sm text-foreground/70">
        No photos match your filters yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((img, idx) => (
        <figure
          key={`${img.src}-${idx}`}
          className="group relative overflow-hidden rounded-2xl border border-border bg-muted shadow-sm"
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          {img.caption ? (
            <figcaption className="p-3 text-xs text-foreground/70">
              {img.caption}
            </figcaption>
          ) : null}
        </figure>
      ))}
    </div>
  );
}

