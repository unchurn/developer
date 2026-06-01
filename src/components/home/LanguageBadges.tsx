type Language = {
  name: string;
  icon: string;
  darkIcon?: string;
  tag: "SDK available" | "REST + Webhooks";
};

type LanguageBadgesProps = {
  languages?: Language[];
};

const deviconBase = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const defaultLanguages: Language[] = [
  {
    name: "TypeScript",
    icon: `${deviconBase}/typescript/typescript-original.svg`,
    tag: "SDK available",
  },
  {
    name: "JavaScript",
    icon: `${deviconBase}/javascript/javascript-original.svg`,
    tag: "REST + Webhooks",
  },
  {
    name: "Python",
    icon: `${deviconBase}/python/python-original.svg`,
    tag: "REST + Webhooks",
  },
  {
    name: "Go",
    icon: `${deviconBase}/go/go-original-wordmark.svg`,
    tag: "REST + Webhooks",
  },
  {
    name: "Rust",
    icon: `${deviconBase}/rust/rust-original.svg`,
    darkIcon: `${deviconBase}/rust/rust-original.svg`,
    tag: "REST + Webhooks",
  },
  {
    name: "Ruby",
    icon: `${deviconBase}/ruby/ruby-original.svg`,
    tag: "REST + Webhooks",
  },
  {
    name: "PHP",
    icon: `${deviconBase}/php/php-original.svg`,
    tag: "REST + Webhooks",
  },
  {
    name: "Java",
    icon: `${deviconBase}/java/java-original.svg`,
    tag: "REST + Webhooks",
  },
  {
    name: "C#",
    icon: `${deviconBase}/csharp/csharp-original.svg`,
    tag: "REST + Webhooks",
  },
  {
    name: "Elixir",
    icon: `${deviconBase}/elixir/elixir-original.svg`,
    tag: "REST + Webhooks",
  },
];

/** LanguageBadges makes the REST/webhook compatibility story visible. */
export default function LanguageBadges({
  languages = defaultLanguages,
}: LanguageBadgesProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="mb-8 max-w-2xl">
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-fd-muted-foreground">
          Language-Agnostic
        </p>
        <h2 className="text-balance text-2xl font-semibold tracking-[-0.04em] text-fd-foreground md:text-3xl">
          Works with any language
        </h2>
        <p className="mt-3 text-[0.9375rem] leading-7 text-fd-muted-foreground">
          Unchurn exposes REST APIs and webhook events. If your stack can make
          an HTTP request, you're already compatible.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {languages.map((language) => (
          <div
            key={language.name}
            className="flex min-h-37.5 flex-col items-center justify-between rounded-xl border border-fd-border bg-fd-card/55 p-4 text-center transition-colors hover:bg-fd-card/80"
          >
            <div className="flex size-11 items-center justify-center">
              {language.darkIcon ? (
                <>
                  <img
                    src={language.icon}
                    alt=""
                    className="max-h-10 max-w-10 object-contain dark:hidden"
                    loading="lazy"
                  />
                  <img
                    src={language.darkIcon}
                    alt=""
                    className="hidden max-h-10 max-w-10 object-contain invert dark:block"
                    loading="lazy"
                  />
                </>
              ) : (
                <img
                  src={language.icon}
                  alt=""
                  className="max-h-10 max-w-10 object-contain"
                  loading="lazy"
                />
              )}
            </div>
            <div>
              <p className="text-sm font-semibold text-fd-foreground">
                {language.name}
              </p>
              <p className="mt-2 rounded-full border border-fd-border bg-fd-background px-2 py-0.5 text-[11px] font-medium text-fd-muted-foreground">
                {language.tag}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
