import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  AlertCircle,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  Mail,
  MessageCircle,
  Send,
  X,
} from "lucide-react";

import { AREA_OPTIONS, BUDGET_OPTIONS, contactInputSchema, type ContactInput } from "@/lib/contact-schema";
import { submitContactMessage } from "@/lib/contact.functions";
import { CONTACT_CHANNELS, GUIDES, type Guide } from "@/data/content";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./SectionHeading";

/* ---------------- Guides ---------------- */

function GuideDialog({ guide, onClose }: { guide: Guide; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="guide-dialog-title"
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[oklch(0.05_0.01_245/0.75)] p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div className="card-surface relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-xl p-7">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close guide"
          autoFocus
          className="absolute top-4 right-4 rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <X className="size-4" aria-hidden />
        </button>
        <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg border border-[oklch(0.966_0.005_258.3/0.2)] bg-secondary text-silver">
          <guide.icon className="size-5" aria-hidden />
        </div>
        <h3 id="guide-dialog-title" className="text-2xl font-semibold text-foreground">
          {guide.title}
        </h3>
        <div className="mt-5 space-y-4">
          {guide.body.map((paragraph, i) => (
            <p key={i} className="text-sm leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>
        <h4 className="mt-7 text-xs font-semibold tracking-[0.2em] text-silver/80 uppercase">
          Key takeaways
        </h4>
        <ul className="mt-3 space-y-2">
          {guide.takeaways.map((t) => (
            <li key={t} className="flex items-start gap-2 text-sm text-foreground/90">
              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-silver/70" aria-hidden />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Guides() {
  const [open, setOpen] = useState<Guide | null>(null);
  const ref = useReveal<HTMLDivElement>();

  return (
    <div>
      <h3 className="mb-2 text-xl font-semibold text-foreground">Learn &amp; Grow</h3>
      <p className="mb-8 text-sm text-muted-foreground">
        Practical guides on product management and relationship-driven growth — written to be
        useful, not to sell.
      </p>
      <div ref={ref} className="reveal grid gap-5 sm:grid-cols-2">
        {GUIDES.map((guide) => (
          <article
            key={guide.id}
            className="card-surface group flex flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-[oklch(0.966_0.005_258.3/0.35)]"
          >
            <div className="mb-4 inline-flex size-10 items-center justify-center rounded-lg border border-[oklch(0.966_0.005_258.3/0.2)] bg-secondary text-silver">
              <guide.icon className="size-4.5" aria-hidden />
            </div>
            <h4 className="text-base font-semibold text-foreground">{guide.title}</h4>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {guide.summary}
            </p>
            <button
              type="button"
              onClick={() => setOpen(guide)}
              aria-haspopup="dialog"
              className="mt-4 inline-flex items-center gap-1.5 self-start rounded-sm text-sm font-medium text-silver transition-colors hover:text-silver-highlight focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              <BookOpen className="size-3.5" aria-hidden />
              Read Guide
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </button>
          </article>
        ))}
      </div>
      {open && <GuideDialog guide={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

/* ---------------- Contact form ---------------- */

type FormState = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM: Pick<ContactInput, "fullName" | "email" | "details"> & {
  areaOfInterest: string;
  budgetRange: string;
} = { fullName: "", email: "", areaOfInterest: "", details: "", budgetRange: "" };

function ContactForm() {
  const submitFn = useServerFn(submitContactMessage);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof typeof EMPTY_FORM, string>>>({});
  const [status, setStatus] = useState<FormState>("idle");
  const [serverMessage, setServerMessage] = useState("");

  const set = (key: keyof typeof EMPTY_FORM) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    // A fresh edit clears the field's error and re-enables submission.
    setErrors((err) => ({ ...err, [key]: undefined }));
    if (status === "success" || status === "error") setStatus("idle");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting" || status === "success") return;

    const parsed = contactInputSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof typeof EMPTY_FORM | undefined;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      setServerMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    const result = await submitFn({ data: parsed.data });
    if (result.ok) {
      setStatus("success");
      setForm(EMPTY_FORM);
      setErrors({});
    } else {
      setStatus("error");
      setServerMessage(result.message);
    }
  };

  const fieldClass =
    "w-full rounded-md border border-input bg-secondary/40 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-[oklch(0.966_0.005_258.3/0.4)] focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div>
      <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
        Let&apos;s Build Something Global.
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Have a product idea, collaboration opportunity, or business growth challenge? Let&apos;s
        start a conversation.
      </p>

      {status === "success" ? (
        <div
          role="status"
          className="card-surface mt-8 flex items-start gap-3 rounded-xl p-6"
        >
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-silver" aria-hidden />
          <div>
            <p className="font-semibold text-foreground">Message sent</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Thank you for reaching out — your message has been received. I&apos;ll reply to the
              email you provided as soon as possible.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-3 text-sm font-medium text-silver underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Send another message
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-foreground/90">
                Full name <span aria-hidden>*</span>
              </label>
              <input
                id="contact-name"
                name="fullName"
                type="text"
                autoComplete="name"
                value={form.fullName}
                onChange={set("fullName")}
                aria-invalid={!!errors.fullName}
                aria-describedby={errors.fullName ? "contact-name-error" : undefined}
                className={cn(fieldClass, errors.fullName && "border-destructive")}
                placeholder="Your name"
              />
              {errors.fullName && (
                <p id="contact-name-error" role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-destructive-foreground">
                  <AlertCircle className="size-3" aria-hidden /> {errors.fullName}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-foreground/90">
                Email address <span aria-hidden>*</span>
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={set("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className={cn(fieldClass, errors.email && "border-destructive")}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p id="contact-email-error" role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-destructive-foreground">
                  <AlertCircle className="size-3" aria-hidden /> {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-area" className="mb-1.5 block text-xs font-medium text-foreground/90">
                Area of interest <span aria-hidden>*</span>
              </label>
              <select
                id="contact-area"
                name="areaOfInterest"
                value={form.areaOfInterest}
                onChange={set("areaOfInterest")}
                aria-invalid={!!errors.areaOfInterest}
                aria-describedby={errors.areaOfInterest ? "contact-area-error" : undefined}
                className={cn(fieldClass, !form.areaOfInterest && "text-muted-foreground/60", errors.areaOfInterest && "border-destructive")}
              >
                <option value="" disabled>
                  Select an area…
                </option>
                {AREA_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {errors.areaOfInterest && (
                <p id="contact-area-error" role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-destructive-foreground">
                  <AlertCircle className="size-3" aria-hidden /> {errors.areaOfInterest}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="contact-budget" className="mb-1.5 block text-xs font-medium text-foreground/90">
                Budget range <span className="text-muted-foreground">(optional)</span>
              </label>
              <select
                id="contact-budget"
                name="budgetRange"
                value={form.budgetRange}
                onChange={set("budgetRange")}
                className={cn(fieldClass, !form.budgetRange && "text-muted-foreground/60")}
              >
                <option value="">No budget range yet</option>
                {BUDGET_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="contact-details" className="mb-1.5 block text-xs font-medium text-foreground/90">
              Project or collaboration details <span aria-hidden>*</span>
            </label>
            <textarea
              id="contact-details"
              name="details"
              rows={5}
              value={form.details}
              onChange={set("details")}
              aria-invalid={!!errors.details}
              aria-describedby={errors.details ? "contact-details-error" : undefined}
              className={cn(fieldClass, "resize-y", errors.details && "border-destructive")}
              placeholder="Tell me a little about your idea, challenge, or opportunity…"
            />
            {errors.details && (
              <p id="contact-details-error" role="alert" className="mt-1.5 flex items-center gap-1 text-xs text-destructive-foreground">
                <AlertCircle className="size-3" aria-hidden /> {errors.details}
              </p>
            )}
          </div>

          {status === "error" && serverMessage && (
            <p role="alert" className="flex items-center gap-1.5 rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive-foreground">
              <AlertCircle className="size-3.5 shrink-0" aria-hidden /> {serverMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:w-auto"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Sending…
              </>
            ) : (
              <>
                <Send className="size-4" aria-hidden />
                Submit Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}

/* ---------------- Contact channel placeholders ---------------- */

const CHANNEL_META = [
  { key: "email", label: "Business email", icon: Mail },
  { key: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "facebook", label: "Facebook", icon: Facebook },
  { key: "instagram", label: "Instagram", icon: Instagram },
] as const;

function ChannelList() {
  return (
    <ul className="space-y-2.5">
      {CHANNEL_META.map(({ key, label, icon }) => {
        const Icon = icon;
        const value = CONTACT_CHANNELS[key];
        return (
          <li key={key} className="flex items-center gap-3 text-sm">
            <span className="flex size-8 items-center justify-center rounded-md border border-[oklch(0.966_0.005_258.3/0.18)] bg-secondary/60 text-silver/80">
              <Icon className="size-4" aria-hidden />
            </span>
            <span className="text-muted-foreground">{label}:</span>
            {value ? (
              <a
                href={key === "email" ? `mailto:${value}` : value}
                className="text-foreground underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                {value}
              </a>
            ) : (
              <span className="text-xs text-muted-foreground/60 italic">
                To be added
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* ---------------- Section ---------------- */

export function GuidesContact() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="contact-title"
          eyebrow="Guides / Contact"
          title="Insights & Conversations"
          intro="Learn from practical guides — or start a conversation about working together."
        />
        <div
          ref={ref}
          className="reveal grid items-start gap-12 lg:grid-cols-2 lg:gap-16"
        >
          <Guides />
          <div>
            <ContactForm />
            <div className="mt-10 border-t border-border pt-6">
              <h4 className="mb-4 text-xs font-semibold tracking-[0.2em] text-silver/80 uppercase">
                Direct channels
              </h4>
              <ChannelList />
              <p className="mt-4 text-xs text-muted-foreground/60">
                Contact details appear here only once they are supplied — nothing is invented.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
