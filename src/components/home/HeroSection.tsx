import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import Dither from "./Dither";

type HeroSectionProps = {
  docsHref?: string;
  githubHref: string;
};

export default function HeroSection({
  docsHref = "/docs/overview",
  githubHref,
}: HeroSectionProps) {
  return (
    <section
      className="relative isolate w-screen overflow-hidden py-12 md:py-20"
      style={{
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <div
        className="absolute inset-0 z-0 opacity-65 mix-blend-multiply dark:hidden"
        aria-hidden
      >
        <Dither
          waveColor={[0.26, 0.35, 0.48]}
          backgroundColor={[0.82, 0.86, 0.92]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.3}
          colorNum={4}
          ditherBias={0.1}
          waveAmplitude={0.34}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>
      <div
        className="absolute inset-0 z-0 hidden opacity-55 dark:block"
        aria-hidden
      >
        <Dither
          waveColor={[0.4, 0.46, 0.54]}
          backgroundColor={[0.01, 0.015, 0.03]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.3}
          colorNum={4}
          ditherBias={0.16}
          waveAmplitude={0.34}
          waveFrequency={3}
          waveSpeed={0.05}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-1 bg-linear-to-r from-fd-background/62 via-fd-background/16 to-fd-background/2 dark:from-fd-background/82 dark:via-fd-background/44 dark:to-fd-background/10" />

      <div className="relative z-10 mx-auto w-full max-w-275 px-5 md:px-8">
        <div className="max-w-2xl">
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
      </div>
    </section>
  );
}
