import { useState } from "react";
import { ArrowRight, X } from "lucide-react";

import { SERVICES } from "@/data/content";
import { scrollToSection, useReveal } from "@/hooks/use-reveal";

import { SectionHeading } from "./SectionHeading";

export function Services() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = SERVICES.find((s) => s.title === openId) ?? null;
  const gridRef = useReveal<HTMLDivElement>();

  return (
    <section id="services" aria-labelledby="services-title" className="bg-obsidian py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="services-title"
          eyebrow="What I Do"
          title="Professional Services"
          intro="Strategic solutions that connect product development, business growth, and relationship-driven marketing."
        />

        <div ref={gridRef} className="reveal grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.title}
              className="card-surface group flex flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[oklch(0.966_0.005_258.3/0.35)] hover:shadow-[0_20px_50px_-20px_oklch(0.846_0.013_255.5/0.25)]"
            >
              <div className="mb-5 inline-flex size-11 items-center justify-center rounded-lg border border-[oklch(0.966_0.005_258.3/0.2)] bg-secondary text-silver transition-colors group-hover:text-silver-highlight">
                <service.icon className="size-5" aria-hidden />
              </div>
              <p className="mb-1 text-[11px] font-medium tracking-[0.18em] text-muted-foreground/80 uppercase">
                {service.discipline}
              </p>
              <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <button
                type="button"
                onClick={() => setOpenId(service.title)}
                className="mt-4 inline-flex items-center gap-1.5 self-start rounded-sm text-sm font-medium text-silver transition-colors hover:text-silver-highlight focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                aria-haspopup="dialog"
              >
                Explore Service
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </button>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setOpenId(SERVICES[0]!.title)}
            className="rounded-md border border-input px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            View All Services
          </button>
        </div>
      </div>

      {/* Service detail dialog */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-dialog-title"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[oklch(0.05_0.01_245/0.75)] p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpenId(null);
          }}
          onKeyDown={(e) => e.key === "Escape" && setOpenId(null)}
        >
          <div className="card-surface relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl p-7">
            <button
              type="button"
              onClick={() => setOpenId(null)}
              aria-label="Close service details"
              autoFocus
              className="absolute top-4 right-4 rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <X className="size-4" aria-hidden />
            </button>
            <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg border border-[oklch(0.966_0.005_258.3/0.2)] bg-secondary text-silver">
              <open.icon className="size-5" aria-hidden />
            </div>
            <p className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground/80 uppercase">
              {open.discipline}
            </p>
            <h3 id="service-dialog-title" className="mt-1 text-2xl font-semibold text-foreground">
              {open.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{open.detail}</p>
            <h4 className="mt-6 text-xs font-semibold tracking-[0.2em] text-silver/80 uppercase">
              What this includes
            </h4>
            <ul className="mt-3 space-y-2">
              {open.includes.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/90">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-silver/60" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => {
                setOpenId(null);
                window.setTimeout(() => scrollToSection("contact"), 60);
              }}
              className="mt-7 w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Discuss this service
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
