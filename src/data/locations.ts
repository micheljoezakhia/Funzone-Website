import type { Location } from "./types";

function photo(seed: string, width = 1600, height = 1000) {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}

function gallery(primarySrc: string, seedPrefix: string) {
  return [
    primarySrc,
    ...Array.from({ length: 7 }, (_, idx) => photo(`${seedPrefix}-${idx + 1}`)),
  ];
}

export const LOCATIONS: Location[] = [
  {
    id: "fz-monteverde",
    slug: "monteverde",
    name: "Fun Zone Monteverde",
    city: "Beit Mery",
    type: "playground",
    shortDescription:
      "A bright, indoor kids playground with curated play zones, staff supervision, and party-ready spaces.",
    ageRange: "1-12 years",
    hours: {
      timezone: "Asia/Beirut",
      regular: {
        mon: { open: "10:00", close: "20:00" },
        tue: { open: "10:00", close: "20:00" },
        wed: { open: "10:00", close: "20:00" },
        thu: { open: "10:00", close: "20:00" },
        fri: { open: "10:00", close: "22:00" },
        sat: { open: "10:00", close: "22:00" },
        sun: { open: "10:00", close: "22:00" },
      },
      notes: "Mon-Thu 10:00-20:00 | Fri-Sun 10:00-22:00",
    },
    phone: "+961 70 123 401",
    whatsapp: "+961 70 123 401",
    addressText: "Beit Mery (Monteverde), Metn - (address placeholder)",
    coordinates: { lat: 33.84989010354945, lng: 35.60952092506928 },
    activities: [
      "soft-play",
      "toddler-zone",
      "arcade",
      "birthday-parties",
      "private-room",
      "catering",
    ],
    gallery: gallery("/images/locations/FunzoneMonteverde.png", "funzone-monteverde"),
    hasBirthdays: true,
    tags: ["indoor", "toddler-friendly", "party-rooms", "parking"],
  },
  {
    id: "fz-antelias",
    slug: "antelias",
    name: "Fun Zone Antelias",
    city: "Antelias",
    type: "playground",
    shortDescription:
      "A modern neighborhood branch with energetic play zones, trampoline-style movement, and easy drop-in visits.",
    ageRange: "2-13 years",
    hours: {
      timezone: "Asia/Beirut",
      regular: {
        mon: { open: "10:00", close: "20:00" },
        tue: { open: "10:00", close: "20:00" },
        wed: { open: "10:00", close: "20:00" },
        thu: { open: "10:00", close: "20:00" },
        fri: { open: "10:00", close: "22:00" },
        sat: { open: "10:00", close: "22:00" },
        sun: { open: "10:00", close: "22:00" },
      },
      notes: "Mon-Thu 10:00-20:00 | Fri-Sun 10:00-22:00",
    },
    phone: "+961 70 123 402",
    whatsapp: "+961 70 123 402",
    addressText: "Antelias, Metn - (address placeholder)",
    coordinates: { lat: 33.91460682963616, lng: 35.58551636149576 },
    activities: [
      "soft-play",
      "trampolines",
      "ninja-course",
      "arcade",
      "birthday-parties",
      "private-room",
      "catering",
    ],
    gallery: gallery("/images/locations/FunzoneAntelias.png", "funzone-antelias"),
    hasBirthdays: true,
    tags: ["indoor", "high-energy", "party-rooms", "easy-access"],
  },
  {
    id: "fz-rayfoun",
    slug: "rayfoun",
    name: "Fun Zone Rayfoun",
    city: "Rayfoun",
    type: "playground",
    shortDescription:
      "A spacious branch ideal for family days out, with structured play areas and comfortable seating for parents.",
    ageRange: "1-12 years",
    hours: {
      timezone: "Asia/Beirut",
      regular: {
        mon: { open: "10:00", close: "20:00" },
        tue: { open: "10:00", close: "20:00" },
        wed: { open: "10:00", close: "20:00" },
        thu: { open: "10:00", close: "20:00" },
        fri: { open: "10:00", close: "22:00" },
        sat: { open: "10:00", close: "22:00" },
        sun: { open: "10:00", close: "22:00" },
      },
      notes: "Mon-Thu 10:00-20:00 | Fri-Sun 10:00-22:00",
    },
    phone: "+961 70 123 403",
    whatsapp: "+961 70 123 403",
    addressText: "Rayfoun, Keserwan - (address placeholder)",
    coordinates: { lat: 33.97800618463746, lng: 35.7015539287721 },
    activities: [
      "soft-play",
      "toddler-zone",
      "ninja-course",
      "birthday-parties",
      "private-room",
      "catering",
    ],
    gallery: gallery("/images/locations/FunzoneRayfoum.png", "funzone-rayfoun"),
    hasBirthdays: true,
    tags: ["indoor", "spacious", "family-seating", "parking"],
  },
  {
    id: "fz-zahle",
    slug: "zahle",
    name: "Fun Zone Zahle (Waterpark)",
    city: "Zahle",
    type: "playground",
    shortDescription:
      "A family favorite in the Bekaa with safe play zones, warm service, and flexible birthday setups.",
    ageRange: "2-12 years",
    hours: {
      timezone: "Asia/Beirut",
      regular: {
        mon: { open: "10:00", close: "20:00" },
        tue: { open: "10:00", close: "20:00" },
        wed: { open: "10:00", close: "20:00" },
        thu: { open: "10:00", close: "20:00" },
        fri: { open: "10:00", close: "22:00" },
        sat: { open: "10:00", close: "22:00" },
        sun: { open: "10:00", close: "22:00" },
      },
      notes: "Mon-Thu 10:00-20:00 | Fri-Sun 10:00-22:00",
    },
    phone: "+961 70 123 404",
    whatsapp: "+961 70 123 404",
    addressText: "Zahle, Bekaa - (address placeholder)",
    coordinates: { lat: 33.83424084405881, lng: 35.911715725068525 },
    activities: [
      "water-slides",
      "water-playground",
      "family-pool",
      "soft-play",
      "trampolines",
      "toddler-zone",
      "arcade",
      "birthday-parties",
      "private-room",
      "catering",
    ],
    gallery: gallery("/images/locations/FunzoneZahle.jpg", "funzone-zahle"),
    hasBirthdays: true,
    tags: ["indoor", "all-weather", "party-rooms", "family-friendly"],
  },
  {
    id: "sz-dbayeh",
    slug: "sports-zone",
    name: "Sports Zone",
    city: "Dbayeh",
    type: "sports",
    shortDescription:
      "A multi-sport park built for training and play - football, basketball, padel, gymnastics, and more.",
    ageRange: "All ages",
    hours: {
      timezone: "Asia/Beirut",
      regular: {
        mon: { open: "08:00", close: "23:00" },
        tue: { open: "08:00", close: "23:00" },
        wed: { open: "08:00", close: "23:00" },
        thu: { open: "08:00", close: "23:00" },
        fri: { open: "08:00", close: "23:59" },
        sat: { open: "08:00", close: "23:59" },
        sun: { open: "08:00", close: "23:00" },
      },
      notes: "Daily 08:00-23:00 (weekends until late)",
    },
    phone: "+961 70 123 450",
    whatsapp: "+961 70 123 450",
    addressText: "Zouq El Kharab / Dbayeh, Metn - (address placeholder)",
    coordinates: { lat: 33.94952412060643, lng: 35.59746269808651 },
    activities: [
      "football",
      "basketball",
      "padel",
      "gymnastics",
      "fitness",
      "birthday-parties",
      "catering",
    ],
    gallery: gallery("/images/locations/FunzoneDbayeh.jpg", "sports-zone-dbayeh"),
    hasBirthdays: true,
    tags: ["outdoor", "lights", "changing-rooms", "team-friendly"],
  },
];

function normalizeInput(value: string) {
  const raw = value ?? "";
  try {
    return decodeURIComponent(raw).trim().toLowerCase();
  } catch {
    return raw.trim().toLowerCase();
  }
}

function slugify(value: string) {
  return normalizeInput(value)
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getLocationBySlug(slug: string) {
  const normalized = normalizeInput(slug);
  const normalizedNoBranch = normalized.replace(/-?branch$/, "");

  const bySlug = LOCATIONS.find((l) => {
    const candidate = normalizeInput(l.slug);
    return candidate === normalized || candidate === normalizedNoBranch;
  });
  if (bySlug) return bySlug;

  const byId = LOCATIONS.find((l) => {
    const candidate = normalizeInput(l.id);
    return candidate === normalized || candidate === normalizedNoBranch;
  });
  if (byId) return byId;

  const byCity = LOCATIONS.find((l) => {
    const candidate = slugify(l.city);
    return candidate === normalized || candidate === normalizedNoBranch;
  });
  if (byCity) return byCity;

  const byName = LOCATIONS.find((l) => {
    const rawName = l.name.replace(/^Fun Zone\s*/i, "");
    const candidates = [slugify(l.name), slugify(rawName)];
    return candidates.includes(normalized) || candidates.includes(normalizedNoBranch);
  });
  if (byName) return byName;

  return undefined;
}

export function getCities() {
  return Array.from(new Set(LOCATIONS.map((l) => l.city))).sort((a, b) =>
    a.localeCompare(b),
  );
}
