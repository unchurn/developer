import Link from "next/link";
import { GithubIcon } from "@/components/icons/github";
import { XIcon } from "@/components/icons/x";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { gitConfig, URLs } from "@/lib/shared";

const navLinks = [
  { href: "/docs/overview", label: "Overview" },
  { href: "/docs/guides", label: "Guides" },
  { href: "/docs/api-reference", label: "API Reference" },
  { href: URLs.terms, label: "Terms" },
  { href: URLs.privacy, label: "Privacy" },
  { href: URLs.dataProcessing, label: "Data Processing" },
];

const socialLinks = [
  {
    href: URLs.x,
    label: "X",
    icon: <XIcon className="size-4" />,
  },
  {
    href: `https://github.com/${gitConfig.org}`,
    label: "Github",
    icon: <GithubIcon className="size-4" />,
  },
];

export default function HomeFooter() {
  return (
    <footer className="w-full py-8 *:px-4 *:md:px-6 md:py-10">
      <div className="rounded-2xl border border-fd-border bg-fd-card/45">
        <div className="flex flex-col gap-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Logo className="h-4.5" />
            </div>
            <div className="flex items-center gap-1">
              {socialLinks.map(({ href, label, icon }) => (
                <Button
                  key={label}
                  size="icon"
                  variant="ghost"
                  render={
                    <a
                      aria-label={label}
                      href={href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span className="sr-only">{label}</span>
                    </a>
                  }
                  nativeButton={false}
                >
                  {icon}
                </Button>
              ))}
            </div>
          </div>

          <nav>
            <ul className="flex flex-wrap gap-4 text-sm font-medium text-fd-muted-foreground md:gap-6">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    className="transition-colors hover:text-fd-foreground"
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-fd-border py-4 text-sm text-fd-muted-foreground md:flex-row md:items-center">
          <p>&copy; {new Date().getFullYear()} Unchurn. All rights reserved.</p>

          <p className="inline-flex items-center gap-2">
            <span>Compliance:</span>
            <span className="rounded-full border border-fd-border bg-fd-background/60 px-2 py-0.5 text-[11px] font-medium">
              LGPD
            </span>
            <span className="rounded-full border border-fd-border bg-fd-background/60 px-2 py-0.5 text-[11px] font-medium">
              GDPR
            </span>
            <span className="rounded-full border border-fd-border bg-fd-background/60 px-2 py-0.5 text-[11px] font-medium">
              MIT
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
