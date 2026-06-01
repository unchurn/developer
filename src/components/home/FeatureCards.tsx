import type { LucideIcon } from "lucide-react";
import { ArrowRight, Braces, Compass, Webhook, Workflow } from "lucide-react";
import Link from "next/link";

type FeatureCard = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

type FeatureCardsProps = {
  cards?: FeatureCard[];
};

const defaultCards: FeatureCard[] = [
  {
    title: "Platform Overview",
    description:
      "Understand the portal model, integration surfaces, and production workflow before writing code.",
    href: "/docs/overview",
    icon: Compass,
  },
  {
    title: "Guides",
    description:
      "Follow focused implementation paths for setup, verification, and operational rollout.",
    href: "/docs/guides",
    icon: Workflow,
  },
  {
    title: "Webhooks",
    description:
      "Receive events, verify payloads, and keep your downstream systems synchronized.",
    href: "/docs/webhooks",
    icon: Webhook,
  },
  {
    title: "API Reference",
    description:
      "Find endpoint contracts, schemas, request examples, and response shapes without guessing.",
    href: "/docs/api-reference",
    icon: Braces,
  },
];

/** FeatureCards routes developers to the right documentation track. */
export default function FeatureCards({
  cards = defaultCards,
}: FeatureCardsProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="mb-7">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-fd-muted-foreground">
          Getting Started
        </p>
        <h2 className="text-balance text-2xl font-semibold tracking-[-0.04em] text-fd-foreground md:text-3xl">
          Choose the fastest path into the docs
        </h2>
      </div>
      <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.href}
              href={card.href}
              className="group flex min-h-[250px] flex-col rounded-xl border border-fd-border bg-fd-card/55 transition-colors hover:border-fd-muted-foreground/45 hover:bg-fd-card/80"
            >
              <div className="flex min-h-24 items-start border-b border-fd-border p-5">
                <Icon className="size-5 text-fd-foreground/85" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-semibold tracking-[-0.02em] text-fd-foreground">
                    {card.title}
                  </h3>
                  <ArrowRight className="size-4 shrink-0 text-fd-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-fd-foreground" />
                </div>
                <p className="text-sm leading-6 text-fd-muted-foreground">
                  {card.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
