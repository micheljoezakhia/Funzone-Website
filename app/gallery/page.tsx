import type { Metadata } from "next";
import { Badge } from "@/components/Badge";
import { GalleryExplorer } from "@/components/GalleryExplorer";
import { getActivities, LOCATIONS } from "@/data";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Explore photos by location or activity (placeholders). Filter to quickly see what each branch offers.",
};

export default function GalleryPage() {
  const activities = getActivities().map((a) => ({ id: a.id, name: a.name }));

  return (
    <div>
      <section className="pt-12 pb-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              <Badge variant="primary">Gallery</Badge>
              <Badge variant="soft">Placeholder photos</Badge>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Gallery
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-foreground/70 sm:text-base">
              Use filters to explore locations and activities. Photos are
              placeholders in this build.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <GalleryExplorer locations={LOCATIONS} activities={activities} />
        </div>
      </section>
    </div>
  );
}

