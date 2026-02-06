import type { IconName } from "@/data";
import type { LucideIcon, LucideProps } from "lucide-react";
import {
  ArrowRight,
  Basketball,
  Bolt,
  Cake,
  Camera,
  Check,
  Clock,
  Door,
  Dumbbell,
  Heart,
  Info,
  MapPin,
  MessageCircle,
  Moon,
  Padel,
  Party,
  Phone,
  Shield,
  Slides,
  Soccer,
  Sparkles,
  Sun,
  Ticket,
  Toddler,
  Users,
  Utensils,
} from "lucide-react";
import { cn } from "@/lib/cn";

const ICONS: Record<IconName, LucideIcon> = {
  "arrow-right": ArrowRight,
  basketball: Basketball,
  bolt: Bolt,
  cake: Cake,
  camera: Camera,
  check: Check,
  clock: Clock,
  door: Door,
  dumbbell: Dumbbell,
  heart: Heart,
  info: Info,
  map: MapPin,
  message: MessageCircle,
  moon: Moon,
  padel: Padel,
  party: Party,
  phone: Phone,
  shield: Shield,
  slides: Slides,
  soccer: Soccer,
  sparkles: Sparkles,
  sun: Sun,
  ticket: Ticket,
  toddler: Toddler,
  users: Users,
  utensils: Utensils,
};

export function Icon({
  name,
  className,
  title,
  decorative = title ? false : true,
  ...props
}: Omit<LucideProps, "decorative" | "title"> & {
  name: IconName;
  className?: string;
  title?: string;
  decorative?: boolean;
}) {
  const Lucide = ICONS[name];
  return (
    <Lucide
      className={cn("shrink-0", className)}
      title={title}
      decorative={decorative}
      {...props}
    />
  );
}
