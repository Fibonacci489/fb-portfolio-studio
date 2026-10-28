import { Quote, Star } from "lucide-react";

import { REVIEWS, type Review } from "@/data/content";
import { useReveal } from "@/hooks/use-reveal";

import { SectionHeading } from "./SectionHeading";

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="card-surface flex flex-col rounded-xl p-6">
      <Quote className="mb-4 size-5 text-silver/50" aria-hidden />
      <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
        &ldquo;{review.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <span
          aria-hidden
          className="flex size-10 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-silver"
        >
          {initials(review.name)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-foreground">
            {review.name}
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            {review.role} · {review.service}
          </span>
        </span>
        {review.rating != null && (
          <span
            className="ml-auto flex shrink-0 items-center gap-0.5"
            aria-label={`Rated ${review.rating} out of 5`}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={i < review.rating! ? "size-3.5 text-silver" : "size-3.5 text-muted"}
                fill={i < review.rating! ? "currentColor" : "none"}
                aria-hidden
              />
            ))}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-title"
      className="bg-obsidian py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="reviews-title"
          eyebrow="Reviews"
          title="What People Say"
          intro="Professional relationships are built through communication, collaboration, and trust."
        />

        {REVIEWS.length > 0 ? (
          <div ref={ref} className="reveal grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review) => (
              <ReviewCard key={review.name} review={review} />
            ))}
          </div>
        ) : (
          <div
            ref={ref}
            className="reveal card-surface mx-auto max-w-2xl rounded-xl p-8 text-center"
          >
            <Quote className="mx-auto mb-4 size-6 text-silver/40" aria-hidden />
            <h3 className="text-lg font-semibold text-foreground">No reviews published yet</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              This space is reserved for genuine feedback from real clients and collaborators.
              Nothing here is invented — reviews appear only once they are collected and authorized
              for publication.
            </p>
            <p className="mt-4 text-xs text-muted-foreground/70">
              Worked together? Your honest perspective is welcome — get in touch below.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
