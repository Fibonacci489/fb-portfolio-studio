import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { BRAND, NAV_LINKS } from "@/data/content";
import { scrollToSection } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

import { BrandLogo } from "./BrandLogo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0 || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setMenuOpen(false);
    // Wait for the mobile menu to close before scrolling on small screens.
    window.setTimeout(() => scrollToSection(id), menuOpen ? 80 : 0);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <a
        href="#services"
        onClick={(e) => {
          e.preventDefault();
          go("services");
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-18 sm:px-6">
        {/* Brand */}
        <button
          type="button"
          onClick={() => go("home")}
          className="flex items-center gap-3 rounded-md text-left focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          aria-label={`${BRAND.name} — back to top`}
        >
          <BrandLogo size={38} />
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold tracking-wide text-foreground">
              {BRAND.name}
            </span>
            <span className="block text-[11px] leading-tight text-muted-foreground">
              {BRAND.title}
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-0.5 xl:gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              aria-current={activeId === link.id ? "true" : undefined}
              className={cn(
                "rounded-md px-2 xl:px-3 py-1.5 text-[12px] xl:text-[13px] font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none whitespace-nowrap",
                activeId === link.id
                  ? "text-silver-highlight"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => go("contact")}
            className="ml-2 xl:ml-3 rounded-md bg-primary px-3.5 xl:px-4 py-1.5 xl:py-2 text-[12px] xl:text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none whitespace-nowrap"
          >
            Let&apos;s Connect
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="rounded-md p-2 text-foreground transition-colors hover:bg-secondary lg:hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-border bg-background/95 backdrop-blur-md transition-all duration-300 lg:hidden",
          menuOpen ? "max-h-[32rem] border-b opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              aria-current={activeId === link.id ? "true" : undefined}
              className={cn(
                "rounded-md px-3 py-2.5 text-left text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                activeId === link.id
                  ? "bg-secondary text-silver-highlight"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
              )}
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => go("contact")}
            className="mt-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Let&apos;s Connect
          </button>
        </nav>
      </div>
    </header>
  );
}
