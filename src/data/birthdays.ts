import type { IconName, Location } from "./types";

export type BirthdayHighlight = {
  icon: IconName;
  title: string;
  description: string;
};

export type BirthdayMenuSection = {
  title: string;
  items: string[];
};

export type BirthdayBranchContent = {
  introTitle: string;
  introDescription: string;
  highlights: BirthdayHighlight[];
  menuSections?: BirthdayMenuSection[];
  menuVisibility?: "shown" | "contact";
  notes?: string[];
};

const DEFAULT_CONTENT: Omit<BirthdayBranchContent, "introTitle" | "introDescription"> = {
  highlights: [
    {
      icon: "party",
      title: "A full celebration",
      description:
        "A dedicated party flow designed for kids + peace of mind for parents.",
    },
    {
      icon: "users",
      title: "Hosted experience",
      description:
        "Our team helps organize the timing so you can enjoy the moment.",
    },
    {
      icon: "utensils",
      title: "Food & drinks",
      description:
        "Menu options vary by branch—message us for the latest choices.",
    },
  ],
  menuVisibility: "contact",
  notes: [
    "Menus and inclusions can vary by branch and date.",
    "To confirm availability, contact the branch directly on WhatsApp.",
  ],
};

const BRANCH_CONTENT: Record<string, BirthdayBranchContent> = {
  antelias: {
    introTitle: "Antelias Birthdays",
    introDescription:
      "A high-energy birthday setup with playful themes, a smooth schedule, and plenty of space for kids to run, play, and celebrate.",
    highlights: [
      {
        icon: "sparkles",
        title: "Theme-ready",
        description: "Pick a theme and we’ll match the setup and vibe.",
      },
      {
        icon: "ticket",
        title: "Play-first flow",
        description: "Structured timing between play, food, and cake moments.",
      },
      {
        icon: "utensils",
        title: "Menu options",
        description: "Kids meals + snacks available (ask for today’s menu).",
      },
    ],
    menuVisibility: "shown",
    menuSections: [
      {
        title: "Kids Menu (examples)",
        items: ["Mini pizza slices", "Chicken nuggets", "Pasta cups", "Fries"],
      },
      {
        title: "Drinks (examples)",
        items: ["Water", "Juice boxes", "Soft drinks (parents)"],
      },
      {
        title: "Add-ons (examples)",
        items: ["Cake arrangements", "Face painting", "Mascot visit"],
      },
    ],
  },
  monteverde: {
    introTitle: "Monteverde Birthdays",
    introDescription:
      "A cozy indoor party atmosphere with toddler-friendly zones and family seating—ideal for younger age groups.",
    highlights: [
      {
        icon: "toddler",
        title: "Toddler-friendly",
        description: "A calmer setup for younger kids and early explorers.",
      },
      {
        icon: "users",
        title: "Parent seating",
        description: "Comfortable seating and clear visibility of play areas.",
      },
      {
        icon: "utensils",
        title: "Food available",
        description: "Catering options available upon request.",
      },
    ],
    menuVisibility: "shown",
    menuSections: [
      {
        title: "Kids Menu (examples)",
        items: ["Mini sandwiches", "Cheese pies", "Fruit cups", "Fries"],
      },
      {
        title: "Parents (examples)",
        items: ["Coffee & tea", "Fresh pastries", "Light bites"],
      },
    ],
  },
  rayfoun: {
    introTitle: "Rayfoun Birthdays",
    introDescription:
      "A spacious branch for bigger parties—great for family days out with room to play and relax.",
    highlights: [
      {
        icon: "door",
        title: "Flexible setups",
        description: "We can adapt the party flow for small or larger groups.",
      },
      {
        icon: "shield",
        title: "Clean & safe",
        description: "Safety rules and hygiene standards are always priority.",
      },
      {
        icon: "utensils",
        title: "Menu options",
        description: "Ask for today’s menu + any dietary notes we can support.",
      },
    ],
    menuVisibility: "shown",
    menuSections: [
      {
        title: "Kids Menu (examples)",
        items: ["Burger sliders", "Nuggets", "Pizza slices", "Fries"],
      },
      {
        title: "Snacks (examples)",
        items: ["Popcorn", "Mini donuts", "Fruit cups"],
      },
    ],
  },
  zahle: {
    introTitle: "Zahle Birthdays",
    introDescription:
      "A branch loved by families in the Bekaa—perfect for weekend celebrations and warm hospitality.",
    highlights: [
      {
        icon: "heart",
        title: "Family favorite",
        description: "A welcoming setup that’s easy for parents and fun for kids.",
      },
      {
        icon: "party",
        title: "Theme moments",
        description: "Decor, cake moment, photos—your party story, your way.",
      },
      {
        icon: "utensils",
        title: "Menu on request",
        description: "Menus can change—message the branch for today’s options.",
      },
    ],
    menuVisibility: "contact",
  },
  "sports-zone": {
    introTitle: "Sports Zone Birthdays",
    introDescription:
      "An active, sports-style celebration—ideal for teams, training groups, and energetic parties.",
    highlights: [
      {
        icon: "soccer",
        title: "Sports-focused",
        description: "A birthday with training games, challenges, and play.",
      },
      {
        icon: "bolt",
        title: "High energy",
        description: "Perfect for older kids who want movement and competition.",
      },
      {
        icon: "utensils",
        title: "Food options",
        description: "Available on request (message us for the latest menu).",
      },
    ],
    menuVisibility: "contact",
  },
};

export function getBirthdayBranchContent(location: Location): BirthdayBranchContent {
  const specific = BRANCH_CONTENT[location.slug];
  if (specific) return specific;

  return {
    introTitle: `${location.city} Birthdays`,
    introDescription: location.shortDescription,
    ...DEFAULT_CONTENT,
  };
}

