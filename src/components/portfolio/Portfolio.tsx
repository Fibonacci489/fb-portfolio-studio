import { useMemo, useState } from "react";
import { ArrowRight, Tag } from "lucide-react";

import { PORTFOLIO_FILTERS, PORTFOLIO_ITEMS, type PortfolioCategory } from "@/data/content";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

import { FacetVisual } from "./FacetVisual";
import { SectionHeading } from "./SectionHeading";

type Filter = "All" | PortfolioCategory;

export function Portfolio() {
  const [filter, setFilter] = useState<Filter>("All");
  const gridRef = useReveal<HTMLDivElement>();

  const items = useMemo(
    () =>
      filter === "All"
        ? PORTFOLIO_ITEMS
        : PORTFOLIO_ITEMS.filter((i) => i.category === filter),
    [filter],
  );

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="portfolio-title"
          eyebrow="Portfolio"
          title="My Work Showcase"
          intro="A collection of product thinking, strategic initiatives, digital experiences, and business growth solutions."
        />

        {/* Category filters */}
        <div
          role="group"
          aria-label="Filter portfolio by category"
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {PORTFOLIO_FILTERS.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={filter === category}
              className={cn(
                "rounded-full border px-4 py-2 text-[13px] font-medium transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
                filter === category
                  ? "border-transparent bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-[oklch(0.966_0.005_258.3/0.35)] hover:text-foreground",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className="reveal grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          aria-live="polite"
        >
          {items.map((item) => (
            <article
              key={item.id}
              className="card-surface group flex flex-col overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:border-[oklch(0.966_0.005_258.3/0.35)] hover:shadow-[0_20px_50px_-20px_oklch(0.846_0.013_255.5/0.25)]"
            >
              <FacetVisual seed={item.facets} title={item.title} className="aspect-[16/10] w-full" />
              <div className="flex flex-1 flex-col p-5">
                <p className="mb-2 inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.16em] text-silver/80 uppercase">
                  <Tag className="size-3" aria-hidden />
                  {item.category}
                </p>
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                {item.tools.length > 0 && (
                  <p className="mt-3 text-xs text-muted-foreground/80">
                    <span className="text-silver/70">Tools &amp; methods: </span>
                    {item.tools.join(" · ")}
                  </p>
                )}
                <p className="mt-4 inline-flex items-center gap-1.5 self-start text-[11px] tracking-wide text-muted-foreground/70 uppercase">
                  Concept project — demonstration work
                </p>
              </div>
            </article>
          ))}
        </div>

        {items.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No projects in this category yet.
          </p>
        )}

        <p className="mt-10 text-center text-xs text-muted-foreground/70">
          All showcase entries are illustrative concept projects. Real client engagements and
          results are never implied.
        </p>
      </div>
    </section>
  );
}
