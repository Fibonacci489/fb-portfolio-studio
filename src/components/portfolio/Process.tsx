import { PROCESS_STEPS } from "@/data/content";
import { useReveal } from "@/hooks/use-reveal";

import { SectionHeading } from "./SectionHeading";

export function Process() {
  const ref = useReveal<HTMLOListElement>();

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="bg-obsidian bg-facets py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="process-title"
          eyebrow="Process & Procedures"
          title="My Working Process"
          intro="A clear, structured approach designed to connect business objectives with thoughtful execution."
        />

        <ol
          ref={ref}
          className="reveal relative grid gap-8 lg:grid-cols-5 lg:gap-4"
        >
          {/* Connector line — horizontal on desktop, vertical on mobile */}
          <span
            aria-hidden
            className="absolute top-6 left-6 h-[calc(100%-3rem)] w-px bg-[linear-gradient(oklch(0.966_0.005_258.3/0.25),transparent)] lg:top-6 lg:left-[10%] lg:h-px lg:w-[80%] lg:bg-[linear-gradient(90deg,transparent,oklch(0.966_0.005_258.3/0.25),transparent)]"
          />
          {PROCESS_STEPS.map((step) => (
            <li key={step.step} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
              <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border border-[oklch(0.966_0.005_258.3/0.3)] bg-card text-silver shadow-[0_0_24px_oklch(0.846_0.013_255.5/0.15)] transition-colors hover:text-silver-highlight">
                <step.icon className="size-5" aria-hidden />
              </div>
              <div className="lg:max-w-48">
                <p className="text-[11px] font-semibold tracking-[0.24em] text-silver/70 uppercase">
                  Step {step.step}
                </p>
                <h3 className="mt-1 text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
