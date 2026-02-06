import type { Hours, LocationType } from "@/data";

export function formatLocationType(type: LocationType) {
  return type === "sports" ? "Sports Park" : "Kids Playground";
}

export function telHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits}`;
}

export function whatsappHref(phone: string, message?: string) {
  const digits = phone.replace(/[^\d]/g, "");
  const base = `https://wa.me/${digits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function directionsHref(lat: number, lng: number) {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function hoursSummary(hours: Hours) {
  return hours.notes ?? "Hours available on request.";
}

