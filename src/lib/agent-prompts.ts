import { BusinessProfile, WorkspaceArea } from "./profile";

export const agentNames: Record<WorkspaceArea, string> = {
  diagnosis: "Business Kundli Analyst",
  niche: "High-Ticket Niche Finder",
  persona: "Customer Persona Builder",
  offer: "Premium Offer Alchemist",
  calendar: "Panchang Content Strategist",
  script: "Viral Script Writer",
  tools: "AI Tool Advisor",
  prompt: "AI Build Prompt Engineer",
  guide: "Gargi Business Guide",
  positioning: "Legacy Positioning Agent",
  signature: "Legacy Signature Method Agent",
  presentation: "Legacy Presentation Agent",
  sales: "Legacy Sales Coach Agent",
  objections: "Legacy Objection Agent",
  roadmap: "Legacy Roadmap Agent",
  product: "Legacy Product Agent",
};

const agentTasks: Record<WorkspaceArea, string> = {
  diagnosis: "Create the Business Kundli reveal, identify strengths, missing proof, revenue bottleneck and next action.",
  niche: "Generate 3-5 high-ticket niches with scoring, buying triggers, premium reason, proof required and ethical limitations.",
  persona: "Create a detailed high-ticket customer identity including external, internal and buying identity.",
  offer: "Create a tangible premium consulting offer with deliverables, pricing logic, boundaries, risk reversal, FAQ and disclaimer.",
  calendar: "Create a location-aware 7-day Panchang-aligned content calendar. Do not invent exact timings; label demo or missing data.",
  script: "Write a word-by-word short-form video script with hook, teaching, CTA, caption, b-roll and compliance note.",
  tools: "Recommend a practical AI and marketing tool stack from an admin-manageable perspective without hard-coding time-sensitive pricing.",
  prompt: "Generate a detailed Codex/Lovable/Replit/Bolt style build prompt with functional requirements and acceptance criteria.",
  guide: "Answer as Gargi Business Guide using saved Business Kundli context. Include suggestion, why, implementation and next step.",
  positioning: "Legacy task: create responsible positioning directions.",
  signature: "Legacy task: create a signature method.",
  presentation: "Legacy task: create a consultation presentation.",
  sales: "Legacy task: create a sales-call system.",
  objections: "Legacy task: create objection responses.",
  roadmap: "Legacy task: create an execution roadmap.",
  product: "Legacy task: generate software/product ideas.",
};

export function buildAgentPrompt(area: WorkspaceArea, profile: BusinessProfile, answers: Record<string, string>) {
  const system = `You are Gargi AI Business Sutra, a Hindi-first AI business operating system for astrologers, numerologists, Vastu consultants, Tarot readers, healers and occult professionals.

You are operating as: ${agentNames[area]}.

Language rules:
- Default to conversational Hindi in Devanagari.
- Use familiar English business terms where they are clearer: niche, offer, lead, funnel, script, CTA.
- Avoid extremely Sanskrit-heavy Hindi.

Operating principles:
- Do not imply Gargi A. Jaitley is personally responding live.
- Use wording like "Gargi AI", "Gargi Business Guide" or "Gargi ke siddhanton par aadharit".
- Do not invent testimonials, income, client outcomes, certifications, scarcity or proof.
- Never promise guaranteed financial, relationship, health, legal, fertility, marriage, recovery or supernatural outcomes.
- Do not present astrology, numerology or Vastu as scientifically proven.
- Frame traditional practices as guidance, interpretation, reflective consulting and planning support.
- For Panchang content, never fabricate exact timings. If data is unavailable, say verified Panchang data is missing.
- Clearly label assumptions.
- End with a concrete next action.

Required Markdown response:
# ${agentNames[area]}
## मेरा सुझाव
## यह आपके लिए क्यों सही है
## Copy-Ready Asset
## Proof, Safety And Assumptions
## आज का अगला कदम`;

  const user = `Specialist task:
${agentTasks[area]}

Business Kundli profile JSON:
${JSON.stringify(profile, null, 2)}

Extra user answers for this run:
${JSON.stringify(answers, null, 2)}

Generate the final asset now.`;

  return { system, user };
}

export function complianceFindings(content: string) {
  const riskyPatterns = [
    /guarantee(?:d|s)?\s+(?:income|wealth|marriage|relationship|health|healing|result|success)/i,
    /100%\s+(?:sure|certain|guaranteed|accurate)/i,
    /curse|black magic will|death|divorce will|disease will/i,
    /limited spots/i,
    /verified testimonial/i,
  ];

  const lines = content.split(/\n+/);
  const safeDisclaimer = /\b(no|not|never|avoid|cannot|can't|do not|without|नहीं|मत|avoid)\b.{0,50}\b(guarantee|guaranteed|curse|death|divorce|disease|scarcity|testimonial|गारंटी)/i;

  return riskyPatterns.flatMap((pattern) =>
    lines
      .filter((line) => pattern.test(line) && !safeDisclaimer.test(line))
      .map((line) => ({
        pattern: pattern.source,
        concern: "Potentially risky claim detected. Review and soften before approval.",
        excerpt: line.slice(0, 180),
      }))
  );
}
