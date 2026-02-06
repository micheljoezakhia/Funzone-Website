import type { Metadata } from "next";
import { BirthdaysClient } from "./BirthdaysClient";

export const metadata: Metadata = {
  title: "Birthdays",
  description:
    "Birthday info by branch. Select a location to view menu previews, themes, and how to book by contacting the branch.",
};

export default function BirthdaysPage() {
  return <BirthdaysClient />;
}
