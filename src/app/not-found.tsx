"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-6 text-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute select-none font-sans text-[clamp(10rem,30vw,22rem)] font-bold leading-none tracking-tighter opacity-[0.02]"
      >
        404
      </span>

      {/* Content */}
      <section className="relative z-10 flex max-w-md flex-col items-center gap-4 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-foreground/35">
          Error 404
        </p>

        <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          Page not found
        </h1>

        <p className="max-w-xs text-sm leading-6 text-foreground/55">
          This route doesn&apos;t exist. Head back to the homepage.
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-border bg-foreground px-5 text-sm font-medium text-background shadow-sm transition-all hover:scale-[1.02] hover:bg-foreground/90 active:scale-[0.98]"
          >
            <ArrowLeft className="size-4" />
            Go home
          </Link>
        </div>
      </section>
    </main>
  );
}