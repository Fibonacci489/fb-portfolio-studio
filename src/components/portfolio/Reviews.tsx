import { useEffect, useMemo, useState } from "react";
import {
  Clock,
  ExternalLink,
  Eye,
  FileText,
  Image as ImageIcon,
  Maximize2,
  Play,
  PlusCircle,
  Quote,
  Sparkles,
  Star,
  Video,
  X,
} from "lucide-react";

import { REVIEWS, type Review, type ReviewMediaType } from "@/data/content";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./SectionHeading";

type FilterTab = "all" | ReviewMediaType;

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Parses video URLs into embeddable iframe URLs or direct video source */
function parseVideoSource(url: string): { type: "iframe" | "video"; embedUrl: string } | null {
  if (!url) return null;
  const clean = url.trim();

  // YouTube (watch?v=, embed/, youtu.be/)
  const ytMatch = clean.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  if (ytMatch) {
    return {
      type: "iframe",
      embedUrl: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0`,
    };
  }

  // Vimeo
  const vimeoMatch = clean.match(
    /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)/,
  );
  if (vimeoMatch) {
    return {
      type: "iframe",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`,
    };
  }

  // Loom
  const loomMatch = clean.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9_-]+)/);
  if (loomMatch) {
    return {
      type: "iframe",
      embedUrl: `https://www.loom.com/embed/${loomMatch[1]}?autoplay=1`,
    };
  }

  // Direct video file (mp4, webm, or relative path)
  if (
    clean.endsWith(".mp4") ||
    clean.endsWith(".webm") ||
    clean.includes(".mp4?") ||
    clean.startsWith("/reviews/videos/")
  ) {
    return {
      type: "video",
      embedUrl: clean,
    };
  }

  // Generic iframe fallback
  return {
    type: "iframe",
    embedUrl: clean,
  };
}

// Sample preview items so the user can see how 5-30m videos and images look in the section
const SAMPLE_REVIEWS: Review[] = [
  {
    id: "sample-video-1",
    name: "Alex Morgan",
    role: "Head of Growth",
    company: "Nexus Digital",
    service: "Product Strategy & Growth",
    mediaType: "video",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    videoDuration: "18:40 min",
    videoTitle: "18-Minute Deep Dive: Scaling Product Operations & Acquisition",
    videoDescription:
      "A complete 18-minute walkthrough detailing how FB structured our multi-app customer acquisition journey and streamlined team roadmap priorities.",
    quote:
      "Working with FB completely transformed how we turn discovery insights into actual revenue. The systematic roadmap clarity was unmatched.",
    rating: 5,
    date: "October 2026",
    highlights: [
      "18-min full case walkthrough",
      "Customer acquisition roadmap",
      "3x referral loops",
    ],
  },
  {
    id: "sample-image-1",
    name: "Sarah Chen",
    role: "Founder & CEO",
    company: "Aura Commerce",
    service: "E-Commerce Strategy",
    mediaType: "image",
    imageUrl: "/certificates/google-digital-marketing.jpg",
    imageCaption:
      "WhatsApp & Slack feedback after product launch milestone — 42% retention increase.",
    imageCategory: "Screenshot",
    quote:
      "FB brought structure and discipline to our launch. Every expectation was communicated early and delivered on time.",
    rating: 5,
    date: "September 2026",
    highlights: ["WhatsApp praise screenshot", "+42% retention metric", "Verified milestone"],
  },
  {
    id: "sample-text-1",
    name: "Marcus Vance",
    role: "VP of Partnerships",
    company: "Vanguard Global",
    service: "Network Marketing & Partnerships",
    mediaType: "text",
    quote:
      "The partnership outreach system FB built allowed us to approach high-value enterprise contacts with authentic propositions rather than empty pitches.",
    rating: 5,
    date: "August 2026",
  },
];

export function Reviews() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [videoModal, setVideoModal] = useState<Review | null>(null);
  const [imageModal, setImageModal] = useState<Review | null>(null);
  const [showSamples, setShowSamples] = useState(false);
  const [showAddGuide, setShowAddGuide] = useState(false);
  const ref = useReveal<HTMLDivElement>();

  // Lock scroll when any modal is open
  useEffect(() => {
    if (videoModal || imageModal) {
      const original = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setVideoModal(null);
          setImageModal(null);
        }
      };
      window.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = original;
        window.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [videoModal, imageModal]);

  const activeReviews = useMemo(() => {
    const list = REVIEWS.length > 0 ? REVIEWS : showSamples ? SAMPLE_REVIEWS : [];
    if (activeTab === "all") return list;
    return list.filter((r) => (r.mediaType || "text") === activeTab);
  }, [activeTab, showSamples]);

  const counts = useMemo(() => {
    const list = REVIEWS.length > 0 ? REVIEWS : showSamples ? SAMPLE_REVIEWS : [];
    return {
      all: list.length,
      video: list.filter((r) => r.mediaType === "video").length,
      image: list.filter((r) => r.mediaType === "image").length,
      text: list.filter((r) => !r.mediaType || r.mediaType === "text").length,
    };
  }, [showSamples]);

  const parsedVideo = useMemo(
    () => (videoModal?.videoUrl ? parseVideoSource(videoModal.videoUrl) : null),
    [videoModal],
  );

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-obsidian py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="reviews-title"
          eyebrow="Reviews & Proof"
          title="What People Say"
          intro="Authentic perspectives, 5–30 minute video walkthroughs, client conversations, and visual proof from collaborative projects."
        />

        {/* Media filter tabs */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              activeTab === "all"
                ? "border-silver bg-primary text-primary-foreground shadow-sm"
                : "border-border text-muted-foreground hover:border-silver/40 hover:text-foreground",
            )}
          >
            <span>All Reviews & Media</span>
            <span className="rounded-full bg-secondary/80 px-2 py-0.5 text-[10px] text-foreground">
              {counts.all}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("video")}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              activeTab === "video"
                ? "border-silver bg-primary text-primary-foreground shadow-sm"
                : "border-border text-muted-foreground hover:border-silver/40 hover:text-foreground",
            )}
          >
            <Video className="size-3.5 text-silver-highlight" />
            <span>Video Reviews (5–30 min)</span>
            <span className="rounded-full bg-secondary/80 px-2 py-0.5 text-[10px] text-foreground">
              {counts.video}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("image")}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              activeTab === "image"
                ? "border-silver bg-primary text-primary-foreground shadow-sm"
                : "border-border text-muted-foreground hover:border-silver/40 hover:text-foreground",
            )}
          >
            <ImageIcon className="size-3.5 text-silver-highlight" />
            <span>Visual Evidence & Photos</span>
            <span className="rounded-full bg-secondary/80 px-2 py-0.5 text-[10px] text-foreground">
              {counts.image}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("text")}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
              activeTab === "text"
                ? "border-silver bg-primary text-primary-foreground shadow-sm"
                : "border-border text-muted-foreground hover:border-silver/40 hover:text-foreground",
            )}
          >
            <Quote className="size-3.5 text-silver-highlight" />
            <span>Written Feedback</span>
            <span className="rounded-full bg-secondary/80 px-2 py-0.5 text-[10px] text-foreground">
              {counts.text}
            </span>
          </button>
        </div>

        {/* Content Grid */}
        {activeReviews.length > 0 ? (
          <div ref={ref} className="reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activeReviews.map((review) => {
              const type = review.mediaType || "text";

              /* --- VIDEO CARD --- */
              if (type === "video") {
                return (
                  <article
                    key={review.id || review.name}
                    className="card-surface group flex flex-col overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:border-silver/50 hover:shadow-elegant"
                  >
                    {/* Video Thumbnail with Play Button */}
                    <div
                      onClick={() => setVideoModal(review)}
                      className="group/thumb relative aspect-video cursor-pointer overflow-hidden bg-background border-b border-border"
                    >
                      {review.videoThumbnail ? (
                        <img
                          src={review.videoThumbnail}
                          alt={review.videoTitle || `${review.name} Video Review`}
                          className="size-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center bg-gradient-to-br from-card via-background-alt to-obsidian">
                          <div className="absolute inset-0 bg-facets opacity-25" />
                          <div className="relative z-10 flex size-14 items-center justify-center rounded-full border border-silver/40 bg-background/80 text-silver shadow-xl transition-all duration-300 group-hover/thumb:scale-110 group-hover/thumb:border-silver group-hover/thumb:text-silver-highlight">
                            <Play className="ml-1 size-6 fill-current" />
                          </div>
                        </div>
                      )}

                      {/* Video overlay badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-md border border-border/80 bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-silver backdrop-blur-xs">
                        <Video className="size-3 text-silver-highlight" />
                        <span>Video Review</span>
                      </div>

                      {/* Video Duration Badge (e.g. 15 min) */}
                      {review.videoDuration && (
                        <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded-md border border-border/80 bg-background/90 px-2.5 py-1 text-[11px] font-mono font-medium text-silver-highlight backdrop-blur-xs">
                          <Clock className="size-3 text-silver" />
                          <span>{review.videoDuration}</span>
                        </div>
                      )}

                      {/* Play hover effect */}
                      <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 transition-opacity duration-300 group-hover/thumb:opacity-100">
                        <span className="inline-flex items-center gap-2 rounded-full border border-silver/50 bg-card/90 px-4 py-2 text-xs font-semibold text-silver-highlight shadow-xl">
                          <Play className="size-3.5 fill-current" />
                          Watch Video Review
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{review.service || "Client Testimonial"}</span>
                        {review.date && <span>{review.date}</span>}
                      </div>

                      <h3 className="mt-2 text-base font-bold text-foreground group-hover:text-silver-highlight transition-colors">
                        {review.videoTitle || `${review.name}'s Experience`}
                      </h3>

                      {review.quote && (
                        <p className="mt-2 text-xs italic leading-relaxed text-muted-foreground line-clamp-3">
                          &ldquo;{review.quote}&rdquo;
                        </p>
                      )}

                      {review.highlights && review.highlights.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {review.highlights.map((h, i) => (
                            <span
                              key={i}
                              className="rounded-full border border-border/70 bg-secondary/60 px-2.5 py-0.5 text-[10px] text-silver"
                            >
                              {h}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Reviewer signature */}
                      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                        <div className="flex items-center gap-3">
                          <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-silver">
                            {initials(review.name)}
                          </span>
                          <div>
                            <span className="block text-xs font-semibold text-foreground">
                              {review.name}
                            </span>
                            <span className="block text-[11px] text-muted-foreground">
                              {review.role}
                              {review.company ? ` · ${review.company}` : ""}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setVideoModal(review)}
                          className="inline-flex items-center gap-1.5 rounded-md border border-silver/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-silver-highlight hover:bg-primary/20"
                        >
                          <Play className="size-3 fill-current" />
                          Watch
                        </button>
                      </div>
                    </div>
                  </article>
                );
              }

              /* --- IMAGE / PROOF CARD --- */
              if (type === "image") {
                return (
                  <article
                    key={review.id || review.name}
                    className="card-surface group flex flex-col overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:border-silver/50 hover:shadow-elegant"
                  >
                    {/* Image Container with Zoom trigger */}
                    <div
                      onClick={() => setImageModal(review)}
                      className="group/img relative aspect-[4/3] cursor-pointer overflow-hidden bg-background border-b border-border"
                    >
                      <img
                        src={review.imageUrl}
                        alt={review.imageCaption || `${review.name} review proof`}
                        className="size-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                        loading="lazy"
                      />

                      <div className="absolute top-3 left-3 rounded-md border border-border/80 bg-background/90 px-2.5 py-1 text-[11px] font-semibold text-silver backdrop-blur-xs">
                        {review.imageCategory || "Visual Proof"}
                      </div>

                      <div className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 transition-opacity duration-300 group-hover/img:opacity-100">
                        <span className="inline-flex items-center gap-2 rounded-full border border-silver/40 bg-card/90 px-4 py-2 text-xs font-semibold text-silver-highlight shadow-lg">
                          <Maximize2 className="size-3.5" />
                          View Full Image
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-xs font-medium text-foreground">
                        {review.imageCaption || "Verified client communication and results."}
                      </p>

                      {review.quote && (
                        <blockquote className="mt-3 text-xs italic leading-relaxed text-muted-foreground">
                          &ldquo;{review.quote}&rdquo;
                        </blockquote>
                      )}

                      <div className="mt-auto border-t border-border pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="flex size-8 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-silver">
                              {initials(review.name)}
                            </span>
                            <div>
                              <span className="block text-xs font-semibold text-foreground">
                                {review.name}
                              </span>
                              <span className="block text-[11px] text-muted-foreground">
                                {review.role}
                                {review.company ? ` · ${review.company}` : ""}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => setImageModal(review)}
                            className="text-xs text-muted-foreground hover:text-silver-highlight"
                          >
                            <Maximize2 className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              }

              /* --- WRITTEN REVIEW CARD --- */
              return (
                <figure
                  key={review.id || review.name}
                  className="card-surface flex flex-col rounded-2xl border border-border p-6 sm:p-7"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <Quote className="size-5 text-silver/60" aria-hidden />
                    {review.rating != null && (
                      <span
                        className="flex items-center gap-0.5"
                        aria-label={`Rated ${review.rating} out of 5`}
                      >
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={
                              i < review.rating! ? "size-3.5 text-silver" : "size-3.5 text-muted"
                            }
                            fill={i < review.rating! ? "currentColor" : "none"}
                            aria-hidden
                          />
                        ))}
                      </span>
                    )}
                  </div>

                  <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>

                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
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
                        {review.role}
                        {review.company ? ` · ${review.company}` : ""}
                        {review.service ? ` (${review.service})` : ""}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        ) : (
          /* Honest Empty State with Media Placeholder & Guide */
          <div ref={ref} className="reveal card-surface mx-auto max-w-2xl rounded-2xl p-8 sm:p-10">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-silver/30 bg-secondary/50 text-silver shadow-inner">
              <Video className="size-6 text-silver-highlight" />
            </div>

            <h3 className="mt-5 text-center text-xl font-bold text-foreground">
              Reviews & Media Ready
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-center text-sm leading-relaxed text-muted-foreground">
              This section is configured to host written reviews, <strong>5–30 minute video testimonials</strong>{" "}
              (YouTube, Vimeo, Loom, or uploaded MP4), and <strong>visual evidence</strong> (WhatsApp
              screenshots, dashboard results, and client endorsements).
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setShowSamples(!showSamples)}
                className="inline-flex items-center gap-2 rounded-md border border-silver/40 bg-primary/10 px-4 py-2 text-xs font-semibold text-silver-highlight transition-all hover:bg-primary/20"
              >
                <Sparkles className="size-3.5" />
                <span>{showSamples ? "Hide Sample Previews" : "Preview Sample Media Cards"}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowAddGuide(!showAddGuide)}
                className="inline-flex items-center gap-2 rounded-md border border-input bg-card px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <PlusCircle className="size-3.5" />
                <span>{showAddGuide ? "Hide Guide" : "How to Add Your Videos & Images"}</span>
              </button>
            </div>

            {/* Quick Guide Panel */}
            {showAddGuide && (
              <div className="mt-6 rounded-xl border border-border/80 bg-background-alt p-5 text-left text-xs">
                <h4 className="font-semibold text-silver">
                  Adding your videos & images in <code className="text-silver-highlight">src/data/content.ts</code>:
                </h4>
                <ul className="mt-3 space-y-2.5 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-silver font-bold">1.</span>
                    <span>
                      <strong>5–30 Min Videos:</strong> Paste a YouTube, Loom, Vimeo link or place an MP4 file in{" "}
                      <code className="text-silver">public/reviews/videos/</code>. Set <code className="text-silver">mediaType: "video"</code> and <code className="text-silver">videoDuration: "18 min"</code>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-silver font-bold">2.</span>
                    <span>
                      <strong>Images & Screenshots:</strong> Drop any screenshot, client message, or metrics chart into{" "}
                      <code className="text-silver">public/reviews/images/</code> and set <code className="text-silver">mediaType: "image"</code>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono text-silver font-bold">3.</span>
                    <span>
                      <strong>Written Reviews:</strong> Add quote, name, role, and optional 1–5 star rating.
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* --- VIDEO PLAYER MODAL (Supports 5-30 min videos) --- */}
      {videoModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="fixed inset-0 bg-background/90 backdrop-blur-md transition-opacity"
            onClick={() => setVideoModal(null)}
            aria-hidden
          />

          <div className="card-surface relative z-10 flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-silver/40 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-secondary/80 px-2 py-0.5 text-[10px] font-semibold text-silver uppercase">
                    Video Testimonial
                  </span>
                  {videoModal.videoDuration && (
                    <span className="text-xs font-mono text-silver-highlight">
                      {videoModal.videoDuration}
                    </span>
                  )}
                </div>
                <h3 id="video-modal-title" className="mt-1 truncate text-base font-bold text-foreground">
                  {videoModal.videoTitle || `${videoModal.name} — Review`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setVideoModal(null)}
                aria-label="Close video player"
                className="ml-3 rounded-full border border-border p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="relative aspect-video w-full bg-black">
              {parsedVideo?.type === "iframe" ? (
                <iframe
                  src={parsedVideo.embedUrl}
                  title={videoModal.videoTitle || "Video Review"}
                  className="size-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : parsedVideo?.type === "video" ? (
                <video
                  src={parsedVideo.embedUrl}
                  controls
                  autoPlay
                  playsInline
                  className="size-full"
                />
              ) : (
                <div className="flex size-full items-center justify-center text-sm text-muted-foreground">
                  Video preview unavailable
                </div>
              )}
            </div>

            {/* Video Details & Speaker Info */}
            <div className="overflow-y-auto p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-sm font-semibold text-silver">
                    {initials(videoModal.name)}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-foreground">{videoModal.name}</h4>
                    <p className="text-xs text-muted-foreground">
                      {videoModal.role}
                      {videoModal.company ? ` · ${videoModal.company}` : ""}
                    </p>
                  </div>
                </div>

                {videoModal.videoUrl && (
                  <a
                    href={videoModal.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 self-start text-xs text-muted-foreground hover:text-silver-highlight sm:self-auto"
                  >
                    <span>Open in new window</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                )}
              </div>

              {videoModal.videoDescription && (
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  {videoModal.videoDescription}
                </p>
              )}

              {videoModal.quote && (
                <blockquote className="mt-3 rounded-lg border border-border/70 bg-background-alt p-3.5 text-xs italic text-foreground/90">
                  &ldquo;{videoModal.quote}&rdquo;
                </blockquote>
              )}

              {videoModal.highlights && videoModal.highlights.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {videoModal.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-border/80 bg-secondary px-2.5 py-0.5 text-[11px] text-silver"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- IMAGE / EVIDENCE LIGHTBOX MODAL --- */}
      {imageModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="image-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          <div
            className="fixed inset-0 bg-background/90 backdrop-blur-md transition-opacity"
            onClick={() => setImageModal(null)}
            aria-hidden
          />

          <div className="card-surface relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-silver/40 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-silver">
                  {imageModal.imageCategory || "Visual Proof"}
                </span>
                <h3 id="image-modal-title" className="text-sm font-bold text-foreground">
                  {imageModal.name} — Review Proof
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setImageModal(null)}
                aria-label="Close image viewer"
                className="rounded-full border border-border p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-4 sm:p-6">
              <div className="overflow-hidden rounded-xl border border-border bg-black/70">
                <img
                  src={imageModal.imageUrl}
                  alt={imageModal.imageCaption || "Review image"}
                  className="mx-auto max-h-[60vh] w-auto object-contain"
                />
              </div>

              {imageModal.imageCaption && (
                <p className="mt-4 text-xs font-medium text-foreground">
                  {imageModal.imageCaption}
                </p>
              )}

              {imageModal.quote && (
                <blockquote className="mt-3 text-xs italic text-muted-foreground">
                  &ldquo;{imageModal.quote}&rdquo;
                </blockquote>
              )}

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                <span>
                  {imageModal.name} · {imageModal.role}
                </span>
                {imageModal.imageUrl && (
                  <a
                    href={imageModal.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-silver hover:text-silver-highlight"
                  >
                    <span>Open original file</span>
                    <ExternalLink className="size-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
