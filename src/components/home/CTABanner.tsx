import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { URLs } from "@/lib/shared";

type CTABannerProps = {
  docsHref?: string;
  statusHref?: string;
};

/** CTABanner closes the page with a direct path into implementation. */
export default function CTABanner({
  docsHref = "/docs/overview",
  statusHref = URLs.status,
}: CTABannerProps) {
  return (
    <section className="py-12 pb-16 md:py-20 md:pb-24">
      <div className="rounded-2xl border border-fd-border bg-fd-card/60 p-5 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-fd-muted-foreground">
              Ready
            </p>
            <h2 className="mt-2 max-w-2xl text-balance text-2xl font-semibold tracking-[-0.04em] text-fd-foreground md:text-3xl">
              Start with the overview, then wire your first integration.
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={docsHref}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-fd-foreground px-4 text-sm font-semibold text-fd-background transition hover:bg-fd-foreground/90"
            >
              Open docs
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={statusHref}
              className="inline-flex h-10 items-center rounded-full border border-fd-border px-4 text-sm font-semibold text-fd-foreground transition hover:bg-fd-accent"
            >
              System status
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
