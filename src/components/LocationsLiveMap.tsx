"use client";

import { useEffect, useRef } from "react";
import type { Location } from "@/data";
import { cn } from "@/lib/cn";
import { directionsHref } from "@/lib/format";

type LeafletIcon = unknown;

type LeafletLatLngBounds = {
  extend: (latlng: [number, number]) => void;
};

type LeafletTileLayer = {
  addTo: (map: LeafletMap) => LeafletTileLayer;
  remove: () => void;
};

type LeafletMarker = {
  addTo: (map: LeafletMap) => LeafletMarker;
  bindPopup: (
    html: string,
    options?: { closeButton?: boolean; maxWidth?: number },
  ) => LeafletMarker;
};

type LeafletMap = {
  remove: () => void;
  scrollWheelZoom: { disable: () => void };
  setView: (center: [number, number], zoom: number) => void;
  fitBounds: (bounds: LeafletLatLngBounds, options?: { padding?: [number, number] }) => void;
  invalidateSize: () => void;
};

type LeafletNamespace = {
  map: (
    element: HTMLElement,
    options?: { zoomControl?: boolean; attributionControl?: boolean },
  ) => LeafletMap;
  tileLayer: (
    url: string,
    options?: { attribution?: string; maxZoom?: number },
  ) => LeafletTileLayer;
  divIcon: (options?: {
    className?: string;
    html?: string;
    iconSize?: [number, number];
    iconAnchor?: [number, number];
    popupAnchor?: [number, number];
  }) => LeafletIcon;
  marker: (latlng: [number, number], options?: { icon?: LeafletIcon }) => LeafletMarker;
  latLngBounds: (latlngs?: Array<[number, number]>) => LeafletLatLngBounds;
};

type LeafletGlobal = { L?: LeafletNamespace };

const LEAFLET_CSS_URL = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
const LEAFLET_JS_URL = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";

let leafletLoader: Promise<LeafletNamespace> | null = null;

function ensureLeafletCss() {
  if (typeof document === "undefined") return;
  const existing = document.querySelector(
    'link[data-leaflet="css"]',
  ) as HTMLLinkElement | null;
  if (existing) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = LEAFLET_CSS_URL;
  link.dataset.leaflet = "css";
  document.head.appendChild(link);
}

function loadLeaflet(): Promise<LeafletNamespace> {
  if (typeof window === "undefined") return Promise.reject(new Error("No window"));
  const w = window as unknown as LeafletGlobal;
  if (w.L) return Promise.resolve(w.L);

  ensureLeafletCss();

  if (leafletLoader) return leafletLoader;

  leafletLoader = new Promise<LeafletNamespace>((resolve, reject) => {
    const resolveFromWindow = () => {
      const win = window as unknown as LeafletGlobal;
      if (win.L) {
        resolve(win.L);
        return;
      }
      reject(new Error("Leaflet loaded but window.L is missing"));
    };

    const existing = document.querySelector(
      'script[data-leaflet="js"]',
    ) as HTMLScriptElement | null;

    if (existing) {
      const win = window as unknown as LeafletGlobal;
      if (win.L) {
        resolve(win.L);
        return;
      }

      existing.addEventListener("load", resolveFromWindow, { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Leaflet")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = LEAFLET_JS_URL;
    script.async = true;
    script.dataset.leaflet = "js";
    script.onload = resolveFromWindow;
    script.onerror = () => reject(new Error("Failed to load Leaflet"));
    document.head.appendChild(script);
  });

  return leafletLoader;
}

function appleMapsHref(lat: number, lng: number, label: string) {
  const q = encodeURIComponent(label);
  return `https://maps.apple.com/?q=${q}&ll=${lat},${lng}`;
}

function tileConfig(dark: boolean) {
  if (dark) {
    return {
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    };
  }

  return {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  };
}

function markerHtml(label: string) {
  const safe = String(label).replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return [
    '<div style="',
    "display:flex;align-items:center;justify-content:center;",
    "width:28px;height:28px;border-radius:9999px;",
    "background:var(--primary);color:var(--primary-foreground);",
    "font-weight:800;font-size:12px;line-height:1;",
    "box-shadow:0 14px 30px rgba(2,132,199,0.25);",
    'border:2px solid rgba(255,255,255,0.95);',
    '">',
    safe,
    "</div>",
  ].join("");
}

function popupHtml(location: Location) {
  const title = location.type === "sports" ? location.name : `${location.city} Branch`;
  const apple = appleMapsHref(
    location.coordinates.lat,
    location.coordinates.lng,
    location.name,
  );
  const google = directionsHref(location.coordinates.lat, location.coordinates.lng);

  const safeTitle = title.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const safeCity = location.city.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `
    <div style="min-width:220px;max-width:260px">
      <div style="font-weight:800;font-size:13px;margin-bottom:2px">${safeTitle}</div>
      <div style="font-size:12px;color:rgba(100,116,139,1)">${safeCity}</div>
      <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
        <a href="/locations/${encodeURIComponent(
          location.slug,
        )}" style="padding:6px 10px;border-radius:9999px;border:1px solid rgba(226,232,240,1);text-decoration:none;color:rgba(15,23,42,1);font-weight:700;font-size:12px">Open</a>
        <a href="${google}" target="_blank" rel="noreferrer" style="padding:6px 10px;border-radius:9999px;background:var(--primary);text-decoration:none;color:var(--primary-foreground);font-weight:800;font-size:12px">Google</a>
        <a href="${apple}" target="_blank" rel="noreferrer" style="padding:6px 10px;border-radius:9999px;border:1px solid rgba(226,232,240,1);text-decoration:none;color:rgba(15,23,42,1);font-weight:700;font-size:12px">Apple</a>
      </div>
    </div>
  `;
}

export function LocationsLiveMap({
  locations,
  className,
}: {
  locations: Location[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const tileRef = useRef<LeafletTileLayer | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const mutationObserverRef = useRef<MutationObserver | null>(null);

  useEffect(() => {
    let cancelled = false;

    const destroy = () => {
      mutationObserverRef.current?.disconnect();
      mutationObserverRef.current = null;

      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      tileRef.current = null;
    };

    const init = async () => {
      if (!containerRef.current) return;
      const L = await loadLeaflet();
      if (cancelled) return;

      destroy();

      const isDark = document.documentElement.classList.contains("dark");
      const { url, attribution } = tileConfig(isDark);

      const map = L.map(containerRef.current, {
        zoomControl: true,
        attributionControl: true,
      });
      mapRef.current = map;

      map.scrollWheelZoom.disable();

      const tile = L.tileLayer(url, { attribution, maxZoom: 19 }).addTo(map);
      tileRef.current = tile;

      const icon = (index: number) =>
        L.divIcon({
          className: "",
          html: markerHtml(String(index + 1)),
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          popupAnchor: [0, -14],
        });

      const bounds = L.latLngBounds();
      locations.forEach((location, idx) => {
        const { lat, lng } = location.coordinates;
        bounds.extend([lat, lng]);

        const marker = L.marker([lat, lng], { icon: icon(idx) }).addTo(map);
        marker.bindPopup(popupHtml(location), {
          closeButton: true,
          maxWidth: 280,
        });
      });

      if (locations.length === 1) {
        const { lat, lng } = locations[0].coordinates;
        map.setView([lat, lng], 13);
      } else if (locations.length > 1) {
        map.fitBounds(bounds, { padding: [22, 22] });
      } else {
        map.setView([33.8547, 35.8623], 8); // Lebanon-ish
      }

      const ro = new ResizeObserver(() => {
        map.invalidateSize();
      });
      ro.observe(containerRef.current);
      resizeObserverRef.current = ro;

      const mo = new MutationObserver(() => {
        const dark = document.documentElement.classList.contains("dark");
        const next = tileConfig(dark);
        if (!tileRef.current) return;

        tileRef.current.remove();
        tileRef.current = L.tileLayer(next.url, {
          attribution: next.attribution,
          maxZoom: 19,
        }).addTo(map);
      });
      mo.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
      mutationObserverRef.current = mo;
    };

    void init();

    return () => {
      cancelled = true;
      destroy();
    };
  }, [locations]);

  return (
    <div
      ref={containerRef}
      className={cn("h-full w-full", className)}
      role="application"
      aria-label="Map of Lebanon with Fun Zone branches"
    />
  );
}
