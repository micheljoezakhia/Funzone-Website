import { cn } from "@/lib/cn";

export function Badge({
  children,
  variant = "soft",
  className,
}: {
  children: React.ReactNode;
  variant?: "soft" | "primary" | "outline";
  className?: string;
}) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium leading-none";
  const variants: Record<typeof variant, string> = {
    soft: "border border-border bg-muted/60 text-foreground/80",
    primary: "border border-primary/20 bg-primary/10 text-primary",
    outline: "border border-border bg-transparent text-foreground/80",
  };

  return <span className={cn(base, variants[variant], className)}>{children}</span>;
}

