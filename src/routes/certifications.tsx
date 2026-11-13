import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { Certifications } from "@/components/portfolio/Certifications";
import { Footer } from "@/components/portfolio/Footer";
import { Header } from "@/components/portfolio/Header";
import { BRAND } from "@/data/content";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title: `Certifications — ${BRAND.name} | ${BRAND.title}` },
      {
        name: "description",
        content: `Official verified industry credentials and certifications for ${BRAND.name}: Google Digital Marketing & E-commerce, n8n Foundations Program, and Zapier Automation Specialist.`,
      },
      { property: "og:title", content: `Certifications — ${BRAND.name}` },
      {
        property: "og:description",
        content: `Verified industry credentials for ${BRAND.name}: Google Digital Marketing & E-commerce, n8n Foundations Program, and Zapier Automation Specialist.`,
      },
    ],
  }),
  component: CertificationsRoute,
});

function CertificationsRoute() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20">
        <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            Back to main portfolio
          </Link>
        </div>
        <Certifications isStandalone={true} />
      </main>
      <Footer />
    </div>
  );
}
