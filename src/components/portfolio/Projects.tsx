import { useState } from "react";
import { ArrowRight, X } from "lucide-react";

import { CASE_STUDIES, type CaseStudy } from "@/data/content";
import { scrollToSection, useReveal } from "@/hooks/use-reveal";

import { FacetVisual } from "./FacetVisual";
import { SectionHeading } from "./SectionHeading";

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-semibold tracking-[0.2em] text-silver/80 uppercase">{label}</h4>
      <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<CaseStudy | null>(null);
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="projects-title"
          eyebrow="Projects"
          title="Featured Projects"
          intro="Explore detailed case studies that demonstrate how structured thinking and business strategy can address real-world challenges."
        />

        <div ref={ref} className="reveal space-y-8">
          {CASE_STUDIES.map((study) => (
            <article
              key={study.id}
              className="card-surface group grid overflow-hidden rounded-2xl lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
            >
              <FacetVisual seed={study.facets} title={study.title} className="min-h-48 lg:min-h-full" />
              <div className="flex flex-col p-6 sm:p-8">
                <p className="text-[11px] font-medium tracking-[0.18em] text-silver/80 uppercase">
                  {study.category} · Case-study template
                </p>
                <h3 className="mt-2 text-xl font-semibold text-foreground sm:text-2xl">
                  {study.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {study.challenge}
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(study)}
                  aria-haspopup="dialog"
                  className="mt-5 inline-flex items-center gap-2 self-start rounded-md border border-input px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  View Case Study
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </button>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground/70">
          These are illustrative case-study templates. They describe an approach — not completed
          engagements or verified client results.
        </p>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-dialog-title"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[oklch(0.05_0.01_245/0.75)] p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setOpen(null);
          }}
          onKeyDown={(e) => e.key === "Escape" && setOpen(null)}
        >
          <div className="card-surface relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-xl">
            <FacetVisual
              seed={open.facets}
              title={open.title}
              className="h-36 w-full rounded-t-xl"
            />
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close case study"
              autoFocus
              className="absolute top-4 right-4 rounded-md bg-card/80 p-1.5 text-foreground backdrop-blur hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <X className="size-4" aria-hidden />
            </button>
            <div className="space-y-6 p-7">
              <div>
                <p className="text-[11px] font-medium tracking-[0.18em] text-silver/80 uppercase">
                  {open.category} · Illustrative template
                </p>
                <h3 id="case-dialog-title" className="mt-1 text-2xl font-semibold text-foreground">
                  {open.title}
                </h3>
              </div>
              <Detail label="Business challenge">{open.challenge}</Detail>
              <Detail label="Objectives">
                <ul className="space-y-1.5">
                  {open.objectives.map((o) => (
                    <li key={o} className="flex items-start gap-2">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-silver/60" />
                      {o}
                    </li>
                  ))}
                </ul>
              </Detail>
              <Detail label="My role & responsibilities">{open.role}</Detail>
              <Detail label="Research & strategy">{open.researchStrategy}</Detail>
              <Detail label="Execution approach">{open.execution}</Detail>
              <Detail label="Tools & methods">{open.tools.join(" · ")}</Detail>
              <Detail label="Outcomes">
                {open.outcomes ? (
                  open.outcomes
                ) : (
                  <em className="text-muted-foreground/80">
                    No verified outcomes are published for this template — results are shared only
                    when real, verifiable engagements exist.
                  </em>
                )}
              </Detail>
              <button
                type="button"
                onClick={() => {
                  setOpen(null);
                  window.setTimeout(() => scrollToSection("contact"), 60);
                }}
                className="w-full rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Discuss a project like this
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
