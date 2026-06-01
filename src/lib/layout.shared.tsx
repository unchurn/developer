import { ActivityIcon, BookOpenIcon } from "lucide-react";
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { appName, gitConfig, URLs } from "./shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="inline-flex items-center gap-2">
          <span className="font-semibold tracking-[-0.02em]">{appName}</span>
          <span className="rounded-full border border-fd-border bg-fd-muted px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-fd-muted-foreground">
            v0.1 beta
          </span>
        </span>
      ),
      url: "/",
    },
    links: [
      {
        icon: <BookOpenIcon />,
        text: "Docs",
        url: "/docs",
        active: "nested-url",
        on: "all",
      },
      {
        icon: <ActivityIcon />,
        text: "Status",
        url: URLs.status,
        on: "all",
      },
    ],
    githubUrl: `https://github.com/${gitConfig.org}/${gitConfig.repo}`,
  };
}
