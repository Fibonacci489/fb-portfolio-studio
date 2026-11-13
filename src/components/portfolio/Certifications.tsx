import { useEffect, useState } from "react";
import {
  Award,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Eye,
  Maximize2,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import { CERTIFICATIONS, type Certification } from "@/data/content";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./SectionHeading";

interface CertificationsProps {
  isStandalone?: boolean;
}

export function Certifications({ isStandalone = false }: CertificationsProps) {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const gridRef = useReveal<HTMLDivElement>();

  // Lock background scroll when modal is open
  useEffect(() => {
    if (selectedCert) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedCert(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalStyle;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedCert]);

  const handleCopyId = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="certifications"
      aria-labelledby="certifications-title"
      className={cn("relative py-20 sm:py-28", isStandalone && "pt-12 sm:pt-16")}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          id="certifications-title"
          eyebrow="Accreditation & Credentials"
          title="Professional Certifications"
          intro="Verified industry credentials demonstrating certified expertise in digital marketing, e-commerce growth, and advanced workflow automation."
        />

        {/* Highlight trust ribbon */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 backdrop-blur-sm">
            <ShieldCheck className="size-4 text-silver-highlight" aria-hidden />
            <span>3 Verified Professional Credentials</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 backdrop-blur-sm">
            <Award className="size-4 text-silver-highlight" aria-hidden />
            <span>Google · Zapier · n8n</span>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 backdrop-blur-sm">
            <CheckCircle2 className="size-4 text-silver-highlight" aria-hidden />
            <span>100% Verifiable Online</span>
          </div>
        </div>

        {/* Certifications Grid */}
        <div
          ref={gridRef}
          className="reveal grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {CERTIFICATIONS.map((cert) => (
            <article
              key={cert.id}
              className="card-surface group flex flex-col overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:border-silver/40 hover:shadow-elegant"
            >
              {/* Image Preview / Lightbox Trigger */}
              <div
                onClick={() => setSelectedCert(cert)}
                className="group/img relative aspect-[16/11] cursor-pointer overflow-hidden border-b border-border bg-obsidian"
              >
                <img
                  src={cert.imageUrl}
                  alt={`${cert.title} Certificate`}
                  className="size-full object-cover object-top transition-transform duration-500 ease-out group-hover/img:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover/img:opacity-100">
                  <span className="inline-flex items-center gap-2 rounded-full border border-silver/40 bg-card/90 px-4 py-2 text-xs font-semibold text-silver-highlight shadow-lg">
                    <Maximize2 className="size-3.5" aria-hidden />
                    View Certificate
                  </span>
                </div>
                <div className="absolute top-3 left-3 rounded-md border border-border/80 bg-background/85 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-silver uppercase backdrop-blur-xs">
                  {cert.issuer}
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-silver/80">{cert.category}</span>
                  <time dateTime={cert.issueDate}>{cert.issueDate}</time>
                </div>

                <h3 className="mt-3 text-lg font-bold text-foreground transition-colors group-hover:text-silver-highlight sm:text-xl">
                  {cert.title}
                </h3>

                <p className="mt-2 text-xs font-medium text-muted-foreground">
                  Certified to:{" "}
                  <span className="font-semibold text-silver">{cert.recipient}</span>
                </p>

                <p className="mt-3 text-xs leading-relaxed text-muted-foreground/90">
                  {cert.summary}
                </p>

                {/* Skills Tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border/70 bg-secondary/50 px-2.5 py-0.5 text-[11px] font-medium text-silver/90"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Credential ID if present */}
                {cert.credentialId && (
                  <div className="mt-5 flex items-center justify-between rounded-md border border-border/60 bg-background-alt/70 px-3 py-2 text-xs">
                    <div className="min-w-0">
                      <span className="block text-[10px] uppercase tracking-wider text-muted-foreground">
                        Credential ID
                      </span>
                      <span className="font-mono text-[11px] text-silver truncate block">
                        {cert.credentialId}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleCopyId(cert.credentialId!, e)}
                      title="Copy Credential ID"
                      aria-label={`Copy Credential ID: ${cert.credentialId}`}
                      className="ml-2 inline-flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      {copiedId === cert.credentialId ? (
                        <>
                          <Check className="size-3 text-emerald-400" />
                          <span className="text-[10px] text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3" />
                          <span className="text-[10px]">Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Card Actions */}
                <div className="mt-6 flex items-center gap-3 border-t border-border/70 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedCert(cert)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-input bg-card/60 px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <Eye className="size-3.5" aria-hidden />
                    View Certificate
                  </button>
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-md border border-silver/30 bg-primary/10 px-3 py-2 text-xs font-semibold text-silver-highlight transition-all hover:border-silver/60 hover:bg-primary/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                  >
                    <span>Verify</span>
                    <ExternalLink className="size-3" aria-hidden />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted-foreground/70">
          All credentials shown above are officially issued and verifiable directly through the
          respective certification academies and partner platforms.
        </p>
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-cert-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/90 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedCert(null)}
            aria-hidden
          />

          {/* Modal Container */}
          <div className="card-surface relative z-10 flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-silver/30 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <span className="text-[11px] font-semibold tracking-wider text-silver uppercase">
                  {selectedCert.platform}
                </span>
                <h3 id="modal-cert-title" className="text-lg font-bold text-foreground">
                  {selectedCert.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCert(null)}
                aria-label="Close certificate viewer"
                className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-4 sm:p-6">
              {/* Image in Modal */}
              <div className="overflow-hidden rounded-xl border border-border bg-black/60 shadow-inner">
                <img
                  src={selectedCert.imageUrl}
                  alt={selectedCert.title}
                  className="mx-auto max-h-[58vh] w-auto object-contain"
                />
              </div>

              {/* Modal Metadata Grid */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                <div className="rounded-lg border border-border/80 bg-background-alt p-3.5">
                  <span className="block text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                    Issued To
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-foreground">
                    {selectedCert.recipient}
                  </span>
                </div>

                <div className="rounded-lg border border-border/80 bg-background-alt p-3.5">
                  <span className="block text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                    Issuer
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-foreground">
                    {selectedCert.issuer}
                  </span>
                </div>

                <div className="rounded-lg border border-border/80 bg-background-alt p-3.5">
                  <span className="block text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                    Issue Date
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-foreground">
                    {selectedCert.issueDate}
                  </span>
                </div>

                {selectedCert.signatory && (
                  <div className="rounded-lg border border-border/80 bg-background-alt p-3.5">
                    <span className="block text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                      Authorized Signatory
                    </span>
                    <span className="mt-1 block text-xs font-semibold text-silver">
                      {selectedCert.signatory}
                    </span>
                  </div>
                )}
              </div>

              {/* Skills summary in modal */}
              <div className="mt-4 rounded-lg border border-border/80 bg-background-alt p-4">
                <h4 className="text-xs font-semibold tracking-wider text-silver uppercase">
                  Curriculum & Competencies Validated
                </h4>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {selectedCert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-border/70 bg-secondary px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
                {selectedCert.credentialId ? (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      ID: {selectedCert.credentialId}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyId(selectedCert.credentialId!)}
                      className="inline-flex items-center gap-1 rounded border border-border px-2 py-1 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      {copiedId === selectedCert.credentialId ? (
                        <>
                          <Check className="size-3 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3" />
                          <span>Copy ID</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-3">
                  <a
                    href={selectedCert.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-input px-3 py-2 text-xs font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <ExternalLink className="size-3.5" aria-hidden />
                    Open Original Image
                  </a>
                  <a
                    href={selectedCert.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-silver/50 bg-primary/20 px-4 py-2 text-xs font-semibold text-silver-highlight hover:bg-primary/30"
                  >
                    <span>Verify at {selectedCert.issuer}</span>
                    <ExternalLink className="size-3.5" aria-hidden />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
