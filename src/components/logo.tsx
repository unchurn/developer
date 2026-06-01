import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
};

export function Logo({ className }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-sm font-semibold tracking-[-0.02em] text-fd-foreground",
        className,
      )}
    >
      <span className="inline-flex size-5 items-center justify-center rounded-md border border-fd-border bg-fd-card text-[11px] font-bold">
        U
      </span>
      Unchurn
    </span>
  );
}
