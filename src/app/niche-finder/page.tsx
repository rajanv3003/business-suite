"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function NicheFinderPage() {
  return (
    <AgentWorkspace
      area="niche"
      title="Million Dollar Market"
      subtitle="Find the best niche, the premium buyer, the high-impact problem and a unique mechanism for your occult business."
      questions={[
        { id: "help_line", label: "In one line, how can you help people?", placeholder: "I help founders use astrology to make clearer business and career decisions..." },
        { id: "occult_method", label: "Which method do you use?", placeholder: "Astrology, Vastu, numerology, Tarot, healing, mixed method..." },
        { id: "buyer_market", label: "Who do you want to help?", placeholder: "Business owners, clinic owners, working professionals, couples, parents, real estate buyers..." },
      ]}
    />
  );
}
