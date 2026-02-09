export type ProgramTone = "orange" | "green" | "purple" | "primary";

export type Program = {
  slug: string;
  title: string;
  subtitle: string;
  badges: { primary: string; secondary: string };
  hero: { src: string; alt: string };
  breadcrumbs: Array<{ label: string; href?: string }>;
  stats: Array<{ icon: string; label: string; value: string }>;
  about: { title: string; paragraphs: string[]; quote?: string };
  included: Array<{
    icon: string;
    tone: ProgramTone;
    title: string;
    description: string;
  }>;
  schedule: { title: string; items: Array<{ time: string; label: string }> };
  register: {
    title: string;
    note: string;
    pricing: {
      weeklyFee: string;
      monthlyPass: { current: string; original?: string };
      transportation?: string;
    };
    fields: Array<{ label: string; placeholder: string; type: "text" | "tel" }>;
    cta: string;
    disclaimer: string;
  };
  safety: { title: string; items: string[] };
  registrationInfo: {
    title: string;
    documentsTitle: string;
    documents: string[];
    paymentTitle: string;
    paymentText: string;
    paymentIcons: string[];
  };
};

export const PROGRAMS: Program[] = [
  {
    slug: "summer-colony",
    title: "Summer Colony Program",
    subtitle:
      "Building memories, skills, and lifelong friendships in a safe, professional environment.",
    badges: { primary: "Summer 2024", secondary: "Ages 4-12" },
    hero: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSC-WR2RoDnyHf_ityEOHkhUltEpsMMT4Hwx51EnslydDzX1U0WwS0cX_H54wX2gSZ0uA9-qYDLWKWSVDe1_kcXiyFZW_L425-593Po0URuyvNbB7lIxe64bM8X2WgxgLMMJtFbfrIKfFG55KsuNtoVQe7y9Vssx5SEvKZDLlT979MAXkOyKpih0eSmrZLRFN5uV4p2Hv-PTxwYacU5ayZCMSKdbKQ2I8bFFfqcjD43BtJPcjbn9r4MpeAHJBsW64yAHDa1Zit_GY",
      alt: "Group of diverse children playing outdoors in summer camp",
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Activities", href: "/activities" },
      { label: "Seasonal Colonies" },
      { label: "Summer Program" },
    ],
    stats: [
      { icon: "calendar_month", label: "Duration", value: "July 1 - Aug 30" },
      { icon: "schedule", label: "Hours", value: "8:00 AM - 3:00 PM" },
      { icon: "location_on", label: "Location", value: "Beirut, Lebanon" },
      { icon: "payments", label: "Price", value: "From $120 / week" },
    ],
    about: {
      title: "About the Program",
      paragraphs: [
        "The Fun Zone Lebanon Summer Colony is a premier developmental program designed for children aged 4 to 12. We combine high-energy sports, creative arts, and social-emotional learning to create an environment where every child feels like a star.",
      ],
      quote:
        "Our staff consists of certified educators and professional coaches with over 10 years of experience in youth development.",
    },
    included: [
      {
        icon: "restaurant",
        tone: "orange",
        title: "Healthy Meals",
        description:
          "Daily breakfast and hot lunch prepared by our on-site nutritionists. Nut-free facility.",
      },
      {
        icon: "directions_bus",
        tone: "green",
        title: "Transportation",
        description:
          "Safe, air-conditioned door-to-door bus service covering Greater Beirut areas.",
      },
      {
        icon: "sports_basketball",
        tone: "purple",
        title: "Full Access",
        description:
          "Includes all equipment for sports, swimming, and professional art supplies.",
      },
    ],
    schedule: {
      title: "Sample Daily Schedule",
      items: [
        { time: "08:00 AM", label: "Arrival & Soft Play / Breakfast" },
        {
          time: "09:30 AM",
          label: "Morning Sports (Football, Tennis, or Swimming)",
        },
        { time: "11:00 AM", label: "Creative Arts & Crafts Workshop" },
        { time: "12:30 PM", label: "Healthy Lunch & Supervised Rest" },
        { time: "02:00 PM", label: "Team Building Games & Competitions" },
        { time: "03:00 PM", label: "Dismissal & Bus Boarding" },
      ],
    },
    register: {
      title: "Register Now",
      note: "Limited spots available for the August sessions!",
      pricing: {
        weeklyFee: "$120",
        monthlyPass: { current: "$420", original: "$480" },
        transportation: "+$30/week",
      },
      fields: [
        { label: "Parent's Name", placeholder: "John Doe", type: "text" },
        { label: "WhatsApp Phone", placeholder: "+961 70 000 000", type: "tel" },
      ],
      cta: "Secure My Spot",
      disclaimer: "Free cancellation up to 7 days before start",
    },
    safety: {
      title: "Safety First",
      items: [
        "Certified CPR/First Aid Staff",
        "24/7 Security & CCTV",
        "Strict 1:8 Staff-to-Child Ratio",
      ],
    },
    registrationInfo: {
      title: "Registration Information",
      documentsTitle: "Required Documents",
      documents: [
        "Copy of child's ID card or Passport",
        "Recent medical certificate or health record",
        "Two recent passport-sized photos of the child",
      ],
      paymentTitle: "Payment Methods",
      paymentText:
        "We accept payments in Cash (USD/LBP at daily rate), Credit Card (at our main office), or via Bank Transfer. Early bird discounts apply for full-summer registrations completed before June 15th.",
      paymentIcons: ["payments", "credit_card", "account_balance"],
    },
  },
  {
    slug: "sports-academy",
    title: "Sports Academy",
    subtitle:
      "Year-round coaching in football, basketball, padel, and gymnastics with certified trainers and structured progression.",
    badges: { primary: "All Year", secondary: "Ages 6-16" },
    hero: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAozrNJ_sLg5L5kiJrHPYu-MQVY1cGzLdbE20SD_XLvxv7Fp1KIcqWXbB2bsoNHJeeZ99vkxQlnXNV6x4idNpBg3FwwPVCL_WFcyVRbqKDS82N75bxHzvqD_Nts8OPF8j6fKwpk2OoWEdNZ9K1MedhCfNIJI7uW6t_Q5_i0CX8in5QPsK3tJv8tMc6iAmHmWkgFfzTYDSNgI6APRw69njDPvgOO2esKOOVuM3wA_qkv2WrK0vJz7Pc3H0x9k_DOYihaJeDv50QQKHI",
      alt: "Youth football match on a professional turf",
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Activities", href: "/activities" },
      { label: "Sports Academy" },
    ],
    stats: [
      { icon: "calendar_month", label: "Duration", value: "Year-Round" },
      { icon: "schedule", label: "Training", value: "3 sessions/week" },
      { icon: "location_on", label: "Location", value: "Sports Zone, Dbayeh" },
      { icon: "payments", label: "Price", value: "From $35 / session" },
    ],
    about: {
      title: "About the Academy",
      paragraphs: [
        "Our Sports Academy is designed for kids and teens who want more structure than drop-in play. We focus on fundamentals, athletic development, and team mentality - while keeping sessions fun and motivating.",
        "Programs run in small groups with clear progression, supported by professional coaches and a safe, well-maintained facility.",
      ],
      quote:
        "We place technique and safety first - building confidence through measurable progress.",
    },
    included: [
      {
        icon: "sports",
        tone: "primary",
        title: "Certified Coaches",
        description:
          "Experienced trainers for football, basketball, padel, and gymnastics.",
      },
      {
        icon: "monitoring",
        tone: "green",
        title: "Progress Tracking",
        description:
          "Skill checkpoints and coach feedback to help athletes improve consistently.",
      },
      {
        icon: "stadium",
        tone: "purple",
        title: "Facility Access",
        description:
          "Train in premium courts and fields with modern amenities and equipment.",
      },
    ],
    schedule: {
      title: "Sample Weekly Schedule",
      items: [
        { time: "Mon", label: "Football Fundamentals + Conditioning" },
        { time: "Wed", label: "Basketball Skills + Team Play" },
        { time: "Fri", label: "Padel / Gymnastics Rotation + Mobility" },
      ],
    },
    register: {
      title: "Register Now",
      note: "New groups start every month. Reserve your spot early.",
      pricing: {
        weeklyFee: "$90",
        monthlyPass: { current: "$320", original: "$360" },
      },
      fields: [
        { label: "Athlete Name", placeholder: "First & Last Name", type: "text" },
        { label: "WhatsApp Phone", placeholder: "+961 70 000 000", type: "tel" },
      ],
      cta: "Join the Academy",
      disclaimer: "Limited spots per group - schedule confirmation on WhatsApp",
    },
    safety: {
      title: "Safety First",
      items: [
        "Warm-up and cooldown every session",
        "Coach-supervised training groups",
        "Clear rules and safety briefings",
      ],
    },
    registrationInfo: {
      title: "Registration Information",
      documentsTitle: "What to Bring",
      documents: [
        "Sports shoes and comfortable outfit",
        "Water bottle",
        "Any relevant medical notes (if applicable)",
      ],
      paymentTitle: "Payment Methods",
      paymentText:
        "Payments are accepted in Cash (USD/LBP), Bank Transfer, or via card (subject to availability). Team packages and sibling discounts may apply.",
      paymentIcons: ["payments", "credit_card", "account_balance"],
    },
  },
];

export function getPrograms() {
  return PROGRAMS;
}

export function getProgramBySlug(slug: string) {
  const normalized = (slug ?? "").trim().toLowerCase();
  return PROGRAMS.find((p) => p.slug === normalized);
}

