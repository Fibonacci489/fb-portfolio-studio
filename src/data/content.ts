import {
  BookOpen,
  ClipboardList,
  Compass,
  GitBranch,
  Handshake,
  Layers,
  Lightbulb,
  MessageCircleHeart,
  Network,
  PenTool,
  RefreshCw,
  Route,
  Search,
  Target,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import fbLogo from "@/assets/fb-logo.png.asset.json";

/* ============================================================
 * BRAND
 * ============================================================
 * The official FB logo asset (CDN pointer). BrandLogo renders it
 * with object-fit: contain in the hero, header and footer.
 */
export const BRAND = {
  name: "FB",
  title: "Product Manager & Network Marketer",
  tagline: "Building Connections. Creating Opportunities. Growing Together.",
  eyebrow: "PRODUCT STRATEGY • NETWORK GROWTH",
  intro:
    "I combine product thinking, strategic planning, business development, and relationship-driven marketing to help create valuable solutions, connect opportunities, and support sustainable growth.",
  logoUrl: fbLogo.url as string,
};

/* ============================================================
 * CONTACT CHANNELS
 * ============================================================
 * Fill in the real values when available; empty entries render
 * as clearly-labelled placeholders (no invented details, no dead
 * links).
 */
export const CONTACT_CHANNELS: Record<
  "email" | "whatsapp" | "linkedin" | "facebook" | "instagram",
  string
> = {
  email: "",
  whatsapp: "",
  linkedin: "",
  facebook: "",
  instagram: "",
};

/* ============================================================
 * NAVIGATION
 * ============================================================ */
export const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "Services", id: "services" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Process & Procedures", id: "process" },
  { label: "Projects", id: "projects" },
  { label: "Certifications", id: "certifications" },
  { label: "Reviews", id: "reviews" },
  { label: "Guides / Contact", id: "contact" },
] as const;

/* ============================================================
 * SERVICES
 * ============================================================ */
export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
  detail: string;
  includes: string[];
  discipline: "Product Management" | "Network Marketing";
}

export const SERVICES: Service[] = [
  {
    icon: Compass,
    title: "Product Strategy & Vision",
    description:
      "Define product direction, customer value, business goals, and priorities.",
    detail:
      "Clarify what the product should achieve, for whom, and why it wins. We translate ambition into a focused product vision, measurable goals, and a definition of value your team can act on.",
    includes: [
      "Vision & goal framing",
      "Customer value definition",
      "Opportunity framing",
      "Prioritisation principles",
    ],
    discipline: "Product Management",
  },
  {
    icon: Search,
    title: "Product Research & Market Analysis",
    description:
      "Understand customer needs, market opportunities, competitors, and product positioning.",
    detail:
      "Evidence before opinions. Structured customer discovery, market scans, and competitive analysis that reveal where the real opportunity — and the sharpest positioning — sits.",
    includes: [
      "Customer interviews & surveys",
      "Market & competitor scans",
      "Positioning analysis",
      "Insight synthesis",
    ],
    discipline: "Product Management",
  },
  {
    icon: Route,
    title: "Product Roadmaps & Planning",
    description:
      "Organize priorities, milestones, requirements, and delivery plans.",
    detail:
      "A roadmap everyone can read. Sequenced priorities, clear requirements, and realistic milestones that keep teams aligned and stakeholders informed.",
    includes: [
      "Roadmap structuring",
      "Milestone & release planning",
      "Requirement definition",
      "Stakeholder alignment",
    ],
    discipline: "Product Management",
  },
  {
    icon: Network,
    title: "Network Marketing Strategy",
    description:
      "Develop relationship-driven approaches to audience engagement, referrals, and network development.",
    detail:
      "Sustainable networks are built on trust, not pressure. Design referral journeys, engagement rhythms, and community approaches that grow organically over time.",
    includes: [
      "Referral journey design",
      "Audience engagement plans",
      "Messaging frameworks",
      "Network health reviews",
    ],
    discipline: "Network Marketing",
  },
  {
    icon: Handshake,
    title: "Business Development & Partnerships",
    description:
      "Identify opportunities, build professional relationships, and support mutually beneficial partnerships.",
    detail:
      "Find the partners worth pursuing and earn the introduction. Structured prospect research, value-first outreach, and partnership frameworks built for longevity.",
    includes: [
      "Opportunity mapping",
      "Prospect research",
      "Outreach & follow-up systems",
      "Partnership frameworks",
    ],
    discipline: "Network Marketing",
  },
  {
    icon: TrendingUp,
    title: "Customer Acquisition & Growth",
    description:
      "Improve outreach, customer engagement, retention, and sustainable business development.",
    detail:
      "Growth that compounds. Improve how customers are reached, engaged, and retained so the business grows on solid relationships rather than constant replacement.",
    includes: [
      "Acquisition funnel review",
      "Engagement cadences",
      "Retention practices",
      "Growth measurement basics",
    ],
    discipline: "Network Marketing",
  },
];

/* ============================================================
 * PORTFOLIO
 * ============================================================ */
export type PortfolioCategory =
  | "Product Management"
  | "Strategy & Research"
  | "Network Marketing"
  | "Business Development";

export const PORTFOLIO_FILTERS: Array<"All" | PortfolioCategory> = [
  "All",
  "Product Management",
  "Strategy & Research",
  "Network Marketing",
  "Business Development",
];

export interface PortfolioItem {
  id: string;
  title: string;
  category: PortfolioCategory;
  description: string;
  tools: string[];
  facets: number; // visual seed for the faceted placeholder artwork
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "roadmap-framework",
    title: "Unified Roadmap Framework",
    category: "Product Management",
    description:
      "A prioritisation and roadmap structure that connects business goals to sequenced delivery milestones.",
    tools: ["Prioritisation matrix", "OKRs", "Roadmap structuring"],
    facets: 0,
  },
  {
    id: "discovery-program",
    title: "Customer Discovery Program",
    category: "Strategy & Research",
    description:
      "An interview and synthesis program for turning customer conversations into product decisions.",
    tools: ["Interview guides", "JTBD framing", "Affinity mapping"],
    facets: 1,
  },
  {
    id: "referral-playbook",
    title: "Referral Loop Playbook",
    category: "Network Marketing",
    description:
      "A relationship-first referral journey: how audiences are engaged, introduced, and followed up with care.",
    tools: ["Referral journeys", "Messaging cadences", "CRM basics"],
    facets: 2,
  },
  {
    id: "partnership-system",
    title: "Partnership Outreach System",
    category: "Business Development",
    description:
      "A structured approach to identifying, researching, and approaching potential partners with genuine value.",
    tools: ["Prospect research", "Outreach sequencing", "Value propositions"],
    facets: 3,
  },
  {
    id: "positioning-canvas",
    title: "Product Positioning Canvas",
    category: "Strategy & Research",
    description:
      "A one-page canvas for comparing competitors and sharpening a product's value proposition.",
    tools: ["Competitor scan", "Value prop canvas", "Persona snapshots"],
    facets: 4,
  },
  {
    id: "gtm-checklist",
    title: "Go-to-Market Checklist",
    category: "Product Management",
    description:
      "A launch-readiness checklist covering positioning, channels, feedback loops, and post-launch learning.",
    tools: ["Launch checklist", "Channel planning", "Feedback loops"],
    facets: 5,
  },
  {
    id: "community-growth",
    title: "Community-Led Growth Plan",
    category: "Network Marketing",
    description:
      "A community development plan that turns engaged members into advocates and long-term collaborators.",
    tools: ["Community rhythms", "Advocacy paths", "Engagement metrics"],
    facets: 6,
  },
  {
    id: "onboarding-journey",
    title: "Client Onboarding Journey Map",
    category: "Business Development",
    description:
      "An end-to-end onboarding journey that sets expectations early and builds trust from day one.",
    tools: ["Journey mapping", "Touchpoint design", "Feedback surveys"],
    facets: 7,
  },
];

/* ============================================================
 * PROCESS
 * ============================================================ */
export interface ProcessStep {
  icon: LucideIcon;
  step: number;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: Lightbulb,
    step: 1,
    title: "Discovery",
    description:
      "Understand the problem, customers, business goals, and desired outcomes.",
  },
  {
    icon: ClipboardList,
    step: 2,
    title: "Research & Planning",
    description:
      "Evaluate the available information, identify opportunities, and define priorities.",
  },
  {
    icon: PenTool,
    step: 3,
    title: "Strategy & Design",
    description:
      "Develop product direction, business strategies, roadmaps, and actionable plans.",
  },
  {
    icon: Users,
    step: 4,
    title: "Execution & Collaboration",
    description:
      "Coordinate implementation, communicate with stakeholders, and monitor progress.",
  },
  {
    icon: RefreshCw,
    step: 5,
    title: "Evaluation & Optimization",
    description:
      "Review results, learn from feedback, and identify opportunities for improvement.",
  },
];

/* ============================================================
 * PROJECTS — illustrative case-study templates
 * ============================================================ */
export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  challenge: string;
  objectives: string[];
  role: string;
  researchStrategy: string;
  execution: string;
  tools: string[];
  outcomes: string; // empty string = not verified, rendered as a note
  facets: number;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "roadmap-prioritisation",
    title: "Product Roadmap & Prioritisation",
    category: "Product Management",
    challenge:
      "A growing product idea faces more opportunities than capacity: features, fixes, and experiments all compete for the same attention, and stakeholders disagree on what comes first.",
    objectives: [
      "Establish transparent prioritisation criteria",
      "Sequence work into a readable, shared roadmap",
      "Align stakeholders around near-term milestones",
    ],
    role: "Product lead for strategy and planning: facilitating alignment, defining the prioritisation framework, and maintaining the roadmap.",
    researchStrategy:
      "Structured discovery with customers and stakeholders, a value-versus-effort prioritisation matrix, and scenario planning for capacity trade-offs.",
    execution:
      "Rolling-wave planning: detailed near-term milestones, directional long-term themes, and a regular review rhythm to re-prioritise as evidence arrives.",
    tools: ["Prioritisation matrix", "Roadmap software", "OKRs", "Stakeholder workshops"],
    outcomes: "",
    facets: 8,
  },
  {
    id: "research-positioning",
    title: "Customer Research & Product Positioning",
    category: "Strategy & Research",
    challenge:
      "A product with real strengths is described in the same words as every competitor, so potential customers struggle to see why it matters to them.",
    objectives: [
      "Understand what customers actually value — in their words",
      "Map the competitive landscape honestly",
      "Craft positioning and messaging that reflects real differences",
    ],
    role: "Research and positioning lead: designing the research, running interviews, and synthesising findings into positioning.",
    researchStrategy:
      "Customer interviews focused on jobs-to-be-done, competitor messaging analysis, and iterative drafting of positioning statements validated against real customer language.",
    execution:
      "Insight synthesis into personas and value propositions, followed by messaging guidelines and a positioning canvas the whole team can apply.",
    tools: ["Interview guides", "JTBD framing", "Competitor scans", "Value prop canvas"],
    outcomes: "",
    facets: 9,
  },
  {
    id: "network-partnership",
    title: "Network Growth & Partnership Strategy",
    category: "Network Marketing",
    challenge:
      "Relationship-driven businesses often rely on ad-hoc introductions; growth stalls when outreach is inconsistent and partnerships lack a clear mutual benefit.",
    objectives: [
      "Design a repeatable, respectful outreach approach",
      "Build a referral journey that rewards genuine engagement",
      "Create a partnership framework with clear mutual value",
    ],
    role: "Growth and partnership strategist: mapping the network, designing engagement journeys, and building the outreach system.",
    researchStrategy:
      "Audience and network mapping, review of existing relationship touchpoints, and research into partner motivations to define mutually beneficial propositions.",
    execution:
      "A phased rollout: engagement cadences first, then referral journeys, then structured partnership outreach — with regular reviews of network health and feedback.",
    tools: ["Network mapping", "Outreach sequencing", "CRM basics", "Feedback reviews"],
    outcomes: "",
    facets: 10,
  },
];

/* ============================================================
 * CERTIFICATIONS
 * ============================================================ */
export interface Certification {
  id: string;
  title: string;
  issuer: string;
  platform: string;
  recipient: string;
  issueDate: string;
  credentialId?: string;
  verificationUrl: string;
  imageUrl: string;
  signatory?: string;
  category: string;
  summary: string;
  skills: string[];
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: "google-digital-marketing",
    title: "Google Digital Marketing & E-commerce Certificate",
    issuer: "Google Career Certificates",
    platform: "Coursera (In collaboration with Google)",
    recipient: "Fibonacci II",
    issueDate: "April 12, 2025",
    credentialId: "GCC-7F3K-9J2Q-4B8M",
    verificationUrl: "https://coursera.org/verify/GCC-7F3K-9J2Q-4B8M",
    imageUrl: "/certificates/google-digital-marketing.jpg",
    signatory: "Ruth K. Porat, President, Google Careers",
    category: "Digital Marketing & E-commerce",
    summary:
      "Demonstrated the knowledge and skills required to apply digital marketing strategies, build an online store, analyze data, and drive business growth in the digital economy.",
    skills: [
      "Digital Marketing Strategy",
      "E-Commerce & Online Stores",
      "Marketing Analytics & Data",
      "Customer Acquisition",
      "Conversion & Growth",
    ],
  },
  {
    id: "zapier-automation-specialist",
    title: "Zapier Automation Specialist",
    issuer: "Zapier Academy",
    platform: "Zapier Academy",
    recipient: "FIBONACCI II",
    issueDate: "November 28, 2024",
    credentialId: "7f4e3c2d-9a88-4e7b-8c1d-6f3a2b1e9c7e",
    verificationUrl: "https://zapier.com/academy",
    imageUrl: "/certificates/zapier-automation-specialist.jpg",
    signatory: "Wade Foster, CEO & Co-Founder, Zapier",
    category: "Workflow Automation",
    summary:
      "Recognized for completing the Zapier Academy curriculum and demonstrating skills in building automated workflows, connecting multi-app stacks, transforming data, and streamlining business processes.",
    skills: [
      "Zapier Fundamentals",
      "Building Multi-Step Zaps",
      "App Integrations & Triggers",
      "Data & Transformations",
      "Testing & Troubleshooting",
      "Best Practices & Scaling",
    ],
  },
  {
    id: "n8n-foundations-program",
    title: "n8n Foundations Program",
    issuer: "n8n Academy",
    platform: "n8n Academy",
    recipient: "FIBONACCI II",
    issueDate: "June 15, 2023",
    verificationUrl: "https://learn.n8n.io",
    imageUrl: "/certificates/n8n-foundations-program.jpg",
    signatory: "n8n Academy",
    category: "Workflow Automation & AI",
    summary:
      "Completed all three official n8n Academy courses demonstrating practical knowledge and skills in workflow automation with n8n, including integrations, APIs, AI, testing and best practices.",
    skills: [
      "n8n101 · Essentials: Your First Workflows",
      "n8n102 · Integrations: APIs & Connected Workflows",
      "n8n103 · In Practice: AI, Testing & Best Practices",
      "API & Webhook Integrations",
      "AI & Automation Testing",
    ],
  },
];

/* ============================================================
 * REVIEWS
 * ============================================================
 * No invented testimonials. Add genuine reviews here as they are
 * collected; until then the section renders an honest empty state.
 * Example entry:
 * { name: "", role: "", service: "", quote: "", rating: undefined }
 */
export interface Review {
  name: string;
  role: string;
  service: string;
  quote: string;
  rating?: number; // 1–5, only when the reviewer gave one
}

export const REVIEWS: Review[] = [];

/* ============================================================
 * GUIDES
 * ============================================================ */
export interface Guide {
  id: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  body: string[];
  takeaways: string[];
}

export const GUIDES: Guide[] = [
  {
    id: "pm-fundamentals",
    icon: Layers,
    title: "Product Management Fundamentals",
    summary:
      "What a product manager is actually responsible for — and how to think about value, customers, and outcomes.",
    body: [
      "Product management sits at the intersection of customers, business, and delivery. A product manager's job is not to have every idea; it is to make sure the team is building the right thing, for the right people, at the right time — and to be able to explain why.",
      "Everything starts with a clear problem. Before features come opinions; before opinions should come evidence: who has this problem, how painful is it, how do they solve it today, and what would 'better' actually look like for them?",
      "From there, product management becomes a practice of translation — turning customer understanding into priorities, priorities into plans, and plans into outcomes the business can measure. The craft is keeping all three connected as conditions change.",
    ],
    takeaways: [
      "Define the problem before the solution",
      "Connect every initiative to customer value and business goals",
      "Prioritisation is the core skill — everything cannot be first",
      "Measure outcomes, not just shipped features",
    ],
  },
  {
    id: "roadmaps-prioritisation",
    icon: Route,
    title: "Product Roadmaps & Prioritisation",
    summary:
      "How to build a roadmap people trust — and frameworks for deciding what makes the cut.",
    body: [
      "A roadmap is a communication tool, not a task list. Its purpose is to show direction, sequence, and reasoning — so stakeholders understand not just what is coming, but why it comes before something else.",
      "Effective prioritisation needs explicit criteria. Common frameworks compare value against effort, impact against confidence, or strategic fit against urgency. The specific framework matters less than applying it consistently and making trade-offs visible.",
      "Good roadmaps separate confidence levels: near-term work is specific and committed, mid-term work is directional, and long-term themes stay open to discovery. This keeps the plan honest without pretending the future is known.",
    ],
    takeaways: [
      "Roadmaps communicate reasoning, not just dates",
      "Choose one prioritisation framework and apply it consistently",
      "Separate commitments from directions to keep plans honest",
      "Re-prioritise on a rhythm as evidence arrives",
    ],
  },
  {
    id: "customer-research",
    icon: Search,
    title: "Customer Research & Product Discovery",
    summary:
      "Practical discovery: asking better questions, hearing what customers mean, and turning it into decisions.",
    body: [
      "Customer research fails most often in the questions. \"Would you use X?\" invites polite fiction. Better questions ask about past behaviour: \"Tell me about the last time you dealt with this problem — what did you do?\" History is evidence; hypotheticals are aspirations.",
      "Discovery is continuous, not a phase. Teams that talk to a few customers every week build a compounding understanding that no quarterly report can replace. The goal is not a perfect research repository; it is better instincts across the whole team.",
      "Synthesis turns conversations into decisions. Group observations into patterns, separate facts from interpretations, and write down what you now believe — plus what would change your mind. That last part is what makes research trustworthy.",
    ],
    takeaways: [
      "Ask about past behaviour, not future intentions",
      "A small weekly research habit beats a big annual study",
      "Separate observations from interpretations when synthesising",
      "Write down what would change your mind",
    ],
  },
  {
    id: "network-relationships",
    icon: Network,
    title: "Network Marketing & Relationship Building",
    summary:
      "Why durable networks are built on service and consistency — and how to grow one without burning trust.",
    body: [
      "Network marketing works when the network does — and networks thrive on trust, not transactions. The strongest professionals in relationship-driven businesses are the ones who consistently create value for others before asking for anything.",
      "Consistency beats intensity. A short, genuine check-in every month outperforms a burst of enthusiastic contact followed by silence. Simple systems — a contact list, a light cadence, real notes about what matters to each person — make consistency sustainable.",
      "Grow by serving, not selling. Introductions, useful resources, honest advice, and remembering details people shared are the currency of referral. When someone's experience with you is genuinely good, recommending you costs them nothing and benefits them socially.",
    ],
    takeaways: [
      "Create value before asking for value",
      "Consistency beats intensity in relationship building",
      "Keep a simple system so follow-up actually happens",
      "Recommendations flow from good experiences, not pressure",
    ],
  },
  {
    id: "partnerships",
    icon: Handshake,
    title: "Business Development & Strategic Partnerships",
    summary:
      "How to identify partners worth pursuing and structure relationships where both sides genuinely win.",
    body: [
      "Good partnerships start with selection, not persuasion. Map who already serves the audience you want to reach, whose strengths complement your weaknesses, and who shares your standards. A partnership with the wrong partner costs more than no partnership.",
      "Approach with a proposition, not a request. Before the first conversation, articulate what you offer the potential partner — access, capability, audience, credibility — and why the timing makes sense now. Mutual benefit stated plainly is the most persuasive document in business development.",
      "Structure prevents drift. Agree early on what each side contributes, who owns what, how success is measured, and when you will review the relationship. Most partnership disappointments are not bad intentions; they are unstated expectations.",
    ],
    takeaways: [
      "Select partners for fit, not convenience",
      "Lead with what you bring, not what you need",
      "Put expectations, ownership, and review points in writing",
      "Review the relationship on a schedule, not after a problem",
    ],
  },
  {
    id: "acquisition-retention",
    icon: MessageCircleHeart,
    title: "Customer Acquisition & Retention",
    summary:
      "Getting customers is one system; keeping them is another. Both matter more together than either alone.",
    body: [
      "Acquisition answers one question: how do the right people discover, understand, and choose you? Start by mapping the journey — awareness, consideration, decision — and be honest about where it leaks. Improving one broken stage beats sprinkling effort across all of them.",
      "Retention is the quieter discipline with the larger return. A customer who stays, buys again, and refers others is worth several new ones — and costs far less. Retention work is mostly fundamentals: clear expectations, reliable delivery, and communication that continues after the sale.",
      "The two systems feed each other. Retained customers become the referral engine that lowers acquisition costs, and well-acquired customers — ones whose expectations were set honestly — stay longer. Sustainable growth means improving both loops together.",
    ],
    takeaways: [
      "Find the leakiest journey stage and fix that first",
      "Retention usually returns more than acquisition spend",
      "Honest expectations at acquisition reduce early churn",
      "Referrals are the bridge between the two systems",
    ],
  },
];

/* ============================================================
 * MISC
 * ============================================================ */
export const BUDGET_NOTE = "Budget range is optional and helps set context.";
