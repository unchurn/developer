import { HomeLayout } from "fumadocs-ui/layouts/home";
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from "fumadocs-ui/layouts/home/navbar";
import type { ReactNode } from "react";
import { baseOptions } from "@/lib/layout.shared";
import { URLs } from "@/lib/shared";

const docsLinks = [
  {
    href: "/docs/overview",
    label: "Overview",
    description: "How the platform is structured",
  },
  {
    href: "/docs/guides",
    label: "Guides",
    description: "Implementation flows and tutorials",
  },
  {
    href: "/docs/webhooks",
    label: "Webhooks",
    description: "Events, payloads, and delivery",
  },
  {
    href: "/docs/api-reference",
    label: "API Reference",
    description: "Endpoints, schemas, and contracts",
  },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          type: "custom",
          on: "nav",
          children: (
            <NavbarMenu>
              <NavbarMenuTrigger>Documentation</NavbarMenuTrigger>
              <NavbarMenuContent>
                {docsLinks.map((item) => (
                  <NavbarMenuLink key={item.href} href={item.href}>
                    <span className="flex flex-col gap-1">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-xs text-fd-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                  </NavbarMenuLink>
                ))}
              </NavbarMenuContent>
            </NavbarMenu>
          ),
        },
        {
          text: "Docs",
          url: "/docs/overview",
          active: "nested-url",
          on: "menu",
        },
        {
          text: "Status",
          url: URLs.status,
          on: "all",
          external: true,
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}
