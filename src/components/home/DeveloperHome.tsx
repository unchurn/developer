import { Geist, Geist_Mono } from "next/font/google";
import { gitConfig } from "@/lib/shared";
import CTABanner from "./CTABanner";
import FeatureCards from "./FeatureCards";
import HeroSection from "./HeroSection";
import LanguageBadges from "./LanguageBadges";

const sans = Geist({ subsets: ["latin"], variable: "--font-home-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-home-mono" });

const githubHref = `https://github.com/${gitConfig.org}/${gitConfig.repo}`;

export default function DeveloperHome() {
  return (
    <main
      className={`${sans.variable} ${mono.variable} flex-1 bg-fd-background text-fd-foreground [font-family:var(--font-home-sans)]`}
    >
      <div className="mx-auto w-full max-w-275 px-5 md:px-8">
        <HeroSection githubHref={githubHref} />
        <FeatureCards />
        <LanguageBadges />
        <CTABanner />
      </div>
    </main>
  );
}
