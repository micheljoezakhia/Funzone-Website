export type LocationType = "playground" | "sports";

export type EnergyLevel = "low" | "medium" | "high";

export type AgeRange = {
  min: number;
  max: number | null;
};

export type HoursDayKey =
  | "mon"
  | "tue"
  | "wed"
  | "thu"
  | "fri"
  | "sat"
  | "sun";

export type HoursRange = {
  open: string;
  close: string;
};

export type Hours = {
  timezone: string;
  regular: Record<HoursDayKey, HoursRange | "closed">;
  notes?: string;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Location = {
  id: string;
  slug: string;
  name: string;
  city: string;
  type: LocationType;
  shortDescription: string;
  ageRange: string;
  hours: Hours;
  phone: string;
  whatsapp: string;
  addressText: string;
  coordinates: Coordinates;
  activities: string[];
  gallery: string[];
  hasBirthdays: boolean;
  tags: string[];
};

export type IconName =
  | "arrow-right"
  | "basketball"
  | "bolt"
  | "cake"
  | "camera"
  | "check"
  | "clock"
  | "door"
  | "dumbbell"
  | "heart"
  | "info"
  | "map"
  | "message"
  | "moon"
  | "padel"
  | "party"
  | "phone"
  | "shield"
  | "slides"
  | "soccer"
  | "sparkles"
  | "sun"
  | "ticket"
  | "toddler"
  | "users"
  | "utensils";

export type ActivityCategory =
  | "Kids Playground"
  | "Water Park"
  | "Birthdays & Events"
  | "Sports";

export type Activity = {
  id: string;
  name: string;
  category: ActivityCategory;
  iconName: IconName;
  description: string;
  ageRange: AgeRange;
  energyLevel: EnergyLevel;
  availableAt: string[];
};
