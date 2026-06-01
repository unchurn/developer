import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

type HeroSectionProps = {
  docsHref?: string;
  githubHref: string;
};

const curlSnippet = [
  'curl -X POST https://api.unchurn.online/v1/events \\',
  '  -H "Authorization: Bearer $UNCHURN_API_KEY" \\',
  '  -H "Content-Type: application/json" \\',
  '  -d \'{"event":"customer.updated","customer_id":"cus_123"}\'',
];

/** HeroSection introduces Unchurn as a language-agnostic integration surface. */
export default function HeroSection({ docsHref = "/docs/overview", githubHref }: HeroSectionProps) {
  return (
    <section className="grid gap-10 py-12 md:py-20 lg:grid-cols-[minmax(0,1fr)_28rem] lg:items-center lg:gap-14">
      <div className="max-w-2xl">
        <p className="mb-5 inline-flex rounded-full border border-fd-border bg-fd-card px-3 py-1 text-xs font-medium text-fd-muted-foreground">
          Developer infrastructure for every stack
        </p>
        <h1 className="text-balance text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.055em] text-fd-foreground">
          One API. Any language. Zero guessing.
        </h1>
        <p className="mt-5 max-w-xl text-pretty text-[0.9375rem] leading-7 text-fd-muted-foreground md:text-base">
          Integrate Unchurn with REST APIs and webhook events from any framework. Use the TypeScript SDK when it fits, or bring your own runtime.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href={docsHref}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-fd-foreground px-4 text-sm font-semibold text-fd-background transition hover:bg-fd-foreground/90"
          >
            Start building
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={githubHref}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-fd-border bg-transparent px-4 text-sm font-semibold text-fd-foreground transition hover:bg-fd-accent"
          >
            View on GitHub
            <ExternalLink className="size-4" />
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-fd-border bg-fd-card/70 shadow-sm shadow-black/5">
        <div className="flex items-center justify-between border-b border-fd-border px-4 py-3">
          <span className="rounded-full border border-fd-border bg-fd-background px-2 py-0.5 text-[11px] font-medium text-fd-muted-foreground">
            Works with any language
          </span>
          <span className="text-[11px] text-fd-muted-foreground">HTTP</span>
        </div>
        <pre className="overflow-x-auto p-4 text-[13px] leading-6 text-fd-muted-foreground [font-family:var(--font-home-mono)]">
          <code>
            {curlSnippet.map((line, index) => (
              <span key={line} className="block">
                <span className="select-none pe-4 text-fd-muted-foreground/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={index === 0 ? "text-fd-foreground" : undefined}>{line}</span>
              </span>
            ))}
          </code>
        </pre>
      </div>
    </section>
  );
}
