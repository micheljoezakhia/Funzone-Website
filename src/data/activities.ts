import type { Activity } from "./types";

export const ACTIVITIES: Activity[] = [
  {
    id: "soft-play",
    name: "Soft Play Zones",
    category: "Kids Playground",
    iconName: "slides",
    description:
      "Safe, padded play areas designed for confidence-building movement and creative exploration.",
    ageRange: { min: 1, max: 12 },
    energyLevel: "medium",
    availableAt: ["monteverde", "antelias", "rayfoun", "zahle"],
  },
  {
    id: "water-slides",
    name: "Water Slides",
    category: "Water Park",
    iconName: "slides",
    description:
      "Fast, splashy slides designed for safe water fun (requirements may vary).",
    ageRange: { min: 3, max: 14 },
    energyLevel: "high",
    availableAt: ["zahle"],
  },
  {
    id: "water-playground",
    name: "Kids Water Playground",
    category: "Water Park",
    iconName: "sparkles",
    description:
      "A kid-friendly water playground with splash features and supervised play.",
    ageRange: { min: 2, max: 10 },
    energyLevel: "medium",
    availableAt: ["zahle"],
  },
  {
    id: "family-pool",
    name: "Swimming Pool (Adults & Kids)",
    category: "Water Park",
    iconName: "users",
    description:
      "A family pool where adults and kids can swim, cool down, and relax together.",
    ageRange: { min: 1, max: null },
    energyLevel: "low",
    availableAt: ["zahle"],
  },
  {
    id: "trampolines",
    name: "Trampolines",
    category: "Kids Playground",
    iconName: "sparkles",
    description: "High-energy bouncing fun with clear rules and supervised play.",
    ageRange: { min: 4, max: 13 },
    energyLevel: "high",
    availableAt: ["antelias", "zahle"],
  },
  {
    id: "toddler-zone",
    name: "Toddler Zone",
    category: "Kids Playground",
    iconName: "toddler",
    description:
      "A calmer, age-appropriate space for little ones with soft obstacles and mini slides.",
    ageRange: { min: 1, max: 3 },
    energyLevel: "low",
    availableAt: ["monteverde", "rayfoun", "zahle"],
  },
  {
    id: "ninja-course",
    name: "Ninja / Obstacle Course",
    category: "Kids Playground",
    iconName: "bolt",
    description:
      "Challenge lanes that build balance, agility, and coordination - great for older kids.",
    ageRange: { min: 6, max: 13 },
    energyLevel: "high",
    availableAt: ["antelias", "rayfoun"],
  },
  {
    id: "arcade",
    name: "Arcade & Prize Corner",
    category: "Kids Playground",
    iconName: "ticket",
    description:
      "A small selection of family-friendly games and prizes (availability may vary by branch).",
    ageRange: { min: 4, max: 13 },
    energyLevel: "low",
    availableAt: ["monteverde", "antelias", "zahle"],
  },
  {
    id: "birthday-parties",
    name: "Birthday Parties",
    category: "Birthdays & Events",
    iconName: "party",
    description: "Turnkey parties with play time, a host, and flexible add-ons.",
    ageRange: { min: 1, max: null },
    energyLevel: "medium",
    availableAt: ["monteverde", "antelias", "rayfoun", "zahle", "sports-zone"],
  },
  {
    id: "private-room",
    name: "Private Party Room",
    category: "Birthdays & Events",
    iconName: "door",
    description:
      "A dedicated space for cake, gifts, and hosting your guests comfortably (subject to availability).",
    ageRange: { min: 1, max: null },
    energyLevel: "low",
    availableAt: ["monteverde", "antelias", "rayfoun", "zahle"],
  },
  {
    id: "catering",
    name: "Snacks & Catering",
    category: "Birthdays & Events",
    iconName: "utensils",
    description:
      "Light bites and catering options for events (menus and minimums may vary by location).",
    ageRange: { min: 1, max: null },
    energyLevel: "low",
    availableAt: ["monteverde", "antelias", "rayfoun", "zahle", "sports-zone"],
  },
  {
    id: "football",
    name: "Football Fields",
    category: "Sports",
    iconName: "soccer",
    description:
      "Bookable football fields for matches, training sessions, and friendly games.",
    ageRange: { min: 8, max: null },
    energyLevel: "high",
    availableAt: ["sports-zone"],
  },
  {
    id: "basketball",
    name: "Basketball",
    category: "Sports",
    iconName: "basketball",
    description: "Court time for pickup games, training, and team sessions.",
    ageRange: { min: 8, max: null },
    energyLevel: "high",
    availableAt: ["sports-zone"],
  },
  {
    id: "padel",
    name: "Padel",
    category: "Sports",
    iconName: "padel",
    description: "Fast-paced padel courts for social play and competitive training.",
    ageRange: { min: 10, max: null },
    energyLevel: "high",
    availableAt: ["sports-zone"],
  },
  {
    id: "gymnastics",
    name: "Gymnastics",
    category: "Sports",
    iconName: "sparkles",
    description: "Structured sessions for flexibility, coordination, and confidence.",
    ageRange: { min: 4, max: 16 },
    energyLevel: "high",
    availableAt: ["sports-zone"],
  },
  {
    id: "fitness",
    name: "Fitness & Conditioning",
    category: "Sports",
    iconName: "dumbbell",
    description:
      "General fitness and conditioning options to support athletes and active families.",
    ageRange: { min: 14, max: null },
    energyLevel: "high",
    availableAt: ["sports-zone"],
  },
];

export function getActivitiesByIds(ids: string[]) {
  const byId = new Map(ACTIVITIES.map((a) => [a.id, a] as const));
  const seen = new Set<string>();

  return ids
    .map((id) => byId.get(id))
    .filter((activity): activity is Activity => Boolean(activity))
    .filter((activity) => {
      if (seen.has(activity.id)) return false;
      seen.add(activity.id);
      return true;
    });
}

export function getActivities() {
  return ACTIVITIES;
}
