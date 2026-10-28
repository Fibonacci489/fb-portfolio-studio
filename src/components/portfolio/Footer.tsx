import { BRAND, CONTACT_CHANNELS, NAV_LINKS } from "@/data/content";
import { scrollToSection } from "@/hooks/use-reveal";

import { BrandLogo } from "./BrandLogo";

const SOCIAL_META = [
  { key: "linkedin", label: "LinkedIn" },
  { key: "facebook", label: "Facebook" },
  { key: "instagram", label: "Instagram" },
  { key: "whatsapp", label: "WhatsApp" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  const socials = SOCIAL_META.filter((s) => CONTACT_CHANNELS[s.key]);

  return (
    <footer className="hairline-top bg-obsidian">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center gap-3 text-center md:items-start md:text-left">
            <div className="flex items-center gap-3">
              <BrandLogo size={44} />
              <div>
                <p className="text-sm font-semibold tracking-wide text-foreground">{BRAND.name}</p>
                <p className="text-xs text-muted-foreground">{BRAND.title}</p>
              </div>
            </div>
            <p className="font-display max-w-xs text-sm text-silver/80 italic">
              {BRAND.tagline}
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-10 gap-y-2 text-center md:text-left">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="rounded-sm py-1 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div className="text-center md:text-right">
            <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-silver/70 uppercase">
              Connect
            </p>
            {socials.length > 0 ? (
              <ul className="flex justify-center gap-4 md:justify-end">
                {socials.map((s) => (
                  <li key={s.key}>
                    <a
                      href={CONTACT_CHANNELS[s.key]}
                      className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-muted-foreground/60 italic">
                Social profiles will appear here once supplied.
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground/70">
          &copy; {year} {BRAND.name} — {BRAND.title}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
