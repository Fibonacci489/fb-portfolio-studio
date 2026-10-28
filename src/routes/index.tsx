import { createFileRoute } from "@tanstack/react-router";

import { Footer } from "@/components/portfolio/Footer";
import { GuidesContact } from "@/components/portfolio/GuidesContact";
import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { Portfolio } from "@/components/portfolio/Portfolio";
import { Process } from "@/components/portfolio/Process";
import { Projects } from "@/components/portfolio/Projects";
import { Reviews } from "@/components/portfolio/Reviews";
import { Services } from "@/components/portfolio/Services";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FB — Product Manager & Network Marketer" },
      {
        name: "description",
        content:
          "FB combines product strategy, research, and relationship-driven network marketing to build valuable products and sustainable business opportunities. Building Connections. Creating Opportunities. Growing Together.",
      },
      { property: "og:title", content: "FB — Product Manager & Network Marketer" },
      {
        property: "og:description",
        content:
          "Product strategy, business development, and relationship-driven growth — Building Connections. Creating Opportunities. Growing Together.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "FB — Product Manager & Network Marketer" },
      {
        name: "twitter:description",
        content:
          "Product strategy, business development, and relationship-driven growth — Building Connections. Creating Opportunities. Growing Together.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Process />
        <Projects />
        <Reviews />
        <GuidesContact />
      </main>
      <Footer />
    </div>
  );
}
