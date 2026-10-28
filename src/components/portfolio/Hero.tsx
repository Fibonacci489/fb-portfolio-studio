import { ArrowRight, Handshake } from "lucide-react";

import { BRAND } from "@/data/content";
import { scrollToSection, useReveal } from "@/hooks/use-reveal";

import { BrandLogo } from "./BrandLogo";

/** Subtle connected-nodes globe: a world of opportunities, quietly drawn. */
function NetworkGlobe() {
  const nodes: Array<[number, number]> = [
    [50, 18], [28, 30], [72, 28], [18, 48], [50, 44], [82, 50],
    [34, 62], [64, 66], [46, 80], [24, 78], [76, 80], [58, 26],
  ] as const;
  const links: Array<[number, number]> = [
    [0, 5], [0, 11], [1, 3], [1, 4], [2, 5], [3, 4], [4, 6], [4, 7],
    [5, 7], [6, 8], [7, 8], [6, 9], [7, 10], [8, 10], [2, 11],
  ];
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden
      className="absolute inset-0 h-full w-full text-silver/25"
    >
      {/* Meridians */}
      {[14, 32, 50, 68, 86].map((x) => (
        <ellipse
          key={`m${x}`}
          cx="50"
          cy="50"
          rx={Math.abs(50 - x) + 6}
          ry="46"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.28"
        />
      ))}
      {/* Parallels */}
      {[20, 38, 56, 74].map((y) => (
        <ellipse
          key={`p${y}`}
          cx="50"
          cy="50"
          rx="46"
          ry={Math.abs(50 - y) + 4}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.2"
        />
      ))}
      {/* Connection graph */}
      {links.map(([a, b], i) => (
        <line
          key={`l${i}`}
          x1={nodes[a]![0]}
          y1={nodes[a]![1]}
          x2={nodes[b]![0]}
          y2={nodes[b]![1]}
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="0.35"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={`n${i}`} cx={x} cy={y} r={i % 4 === 0 ? 1.1 : 0.7} fill="currentColor" fillOpacity="0.7" />
      ))}
    </svg>
  );
}

export function Hero() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="home"
      className="bg-hero-vignette relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <div className="bg-facets pointer-events-none absolute inset-0" aria-hidden />
      {/* Faint world-map / connected-node graphic */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 opacity-40 sm:h-[56rem] sm:w-[56rem]"
      >
        <NetworkGlobe />
      </div>

      <div
        ref={ref}
        className="reveal relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
      >
        {/* Left — brand mark */}
        <div className="flex flex-col items-center gap-6 lg:items-start">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-5 rounded-full bg-[radial-gradient(circle,oklch(0.846_0.013_255.5/0.12),transparent_70%)] blur-md"
            />
            <div className="rounded-full border border-[oklch(0.966_0.005_258.3/0.25)] p-2 shadow-[0_0_80px_oklch(0.846_0.013_255.5/0.15)]">
              <BrandLogo size={200} framed />
            </div>
          </div>
          <p className="text-center text-xs tracking-[0.3em] text-silver/70 uppercase lg:text-left">
            Est. relationships &middot; Global mindset
          </p>
        </div>

        {/* Right — introduction */}
        <div className="text-center lg:text-left">
          <p className="mb-4 text-xs font-semibold tracking-[0.3em] text-silver/80 uppercase">
            {BRAND.eyebrow}
          </p>
          <h1 className="text-metallic font-display text-6xl leading-none tracking-wide sm:text-7xl">
            {BRAND.name}
          </h1>
          <p className="mt-3 text-xl font-semibold text-foreground sm:text-2xl">
            {BRAND.title}
          </p>
          <p className="font-display mt-4 text-lg text-silver/90 italic sm:text-xl">
            {BRAND.tagline}
          </p>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground lg:mx-0">
            {BRAND.intro}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <button
              type="button"
              onClick={() => scrollToSection("portfolio")}
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_oklch(0.966_0.005_258.3/0.4)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Explore My Work
              <ArrowRight className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contact")}
              className="inline-flex items-center gap-2 rounded-md border border-input bg-transparent px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <Handshake className="size-4" aria-hidden />
              Work With Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
