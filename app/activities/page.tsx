import type { Metadata } from "next";
import { ActivitiesClient } from "./ActivitiesClient";

export const metadata: Metadata = {
  title: "Activities",
  description:
    "Browse Fun Zone activities across Lebanon. Filter by category, search, and explore what’s available.",
};

export default function ActivitiesPage() {
  return <ActivitiesClient />;
}

