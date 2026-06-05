import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroDithering from "./HeroDithering";

type HeroSectionProps = {
  docsHref?: string;
  githubHref: string;
};

export default function HeroSection({
  docsHref = "/docs/overview",
  githubHref,
}: HeroSectionProps) {
  return (
    <section className="relative isolate w-full overflow-hidden py-12 md:py-20">
      <div className="pointer-events-none absolute inset-0 z-0 bg-linear-to-r from-fd-background/62 via-fd-background/16 to-fd-background/2 dark:from-fd-background/82 dark:via-fd-background/44 dark:to-fd-background/10" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex-1">
            <p className="mb-5 inline-flex rounded-full border border-fd-border bg-fd-card px-3 py-1 text-xs font-medium text-fd-muted-foreground">
              Developer infrastructure for every stack
            </p>

            <h1 className="text-balance text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.055em] text-fd-foreground">
              One API. Any language.
              <br />
              Zero guessing.
            </h1>

            <p className="mt-5 max-w-xl text-pretty text-[0.9375rem] leading-7 text-fd-muted-foreground md:text-base">
              Integrate Unchurn with REST APIs and webhook events from any
              framework. Use the TypeScript SDK when it fits, or bring your own
              runtime.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                nativeButton={false}
                render={<Link href={docsHref} />}
                className="gap-2"
              >
                Start building
                <ArrowRight className="size-4" />
              </Button>

              <Button
                nativeButton={false}
                render={<Link href={githubHref} />}
                variant="ghost"
                className="gap-2 border-fd-border text-fd-foreground"
              >
                View on GitHub
                <ExternalLink className="size-4" />
              </Button>
            </div>
          </div>

          <div className="hidden lg:flex lg:w-[23rem] lg:shrink-0 lg:justify-center">
            <HeroDithering
              className="h-[30rem] w-[20.5rem] rounded-[999px] border border-black/8 bg-[#f3f4f8] dark:hidden"
              colorBack="#f3f4f8"
              colorFront="#8b5cf6"
              speed={1.02}
              scale={0.66}
            />
            <HeroDithering
              className="hidden h-[30rem] w-[20.5rem] rounded-[999px] border border-white/8 bg-[#050505] dark:block"
              colorBack="#050505"
              colorFront="#a78bfa"
              speed={1.02}
              scale={0.66}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
