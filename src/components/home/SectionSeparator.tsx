"use client";

import { motion } from "motion/react";
import type { CSSProperties } from "react";

type SectionSeparatorProps = {
  className?: string;
};

export default function SectionSeparator({ className }: SectionSeparatorProps) {
  const separatorVars: CSSProperties = {
    "--separator-border":
      "color-mix(in oklab, var(--color-fd-foreground) 12%, transparent)",
    "--separator-stripe":
      "color-mix(in oklab, var(--color-fd-foreground) 12%, transparent)",
    "--separator-shimmer":
      "color-mix(in oklab, var(--color-fd-primary) 18%, transparent)",
  } as CSSProperties;

  return (
    <div
      className={`relative h-7 w-screen overflow-hidden border-y border-(--separator-border) bg-fd-background ${
        className ?? ""
      }`}
      style={{
        ...separatorVars,
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,var(--separator-stripe)_0px,var(--separator-stripe)_1px,transparent_1px,transparent_14px)]" />

      <motion.div
        className="absolute inset-y-0 w-36 bg-linear-to-r from-transparent via-(--separator-shimmer) to-transparent blur-md"
        animate={{ x: ["-25%", "135vw"] }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
          repeatDelay: 4.5,
        }}
        style={{ opacity: 0.16 }}
      />
    </div>
  );
}
