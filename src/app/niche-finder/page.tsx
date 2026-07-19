"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function NicheFinderPage() {
  return (
    <AgentWorkspace
      area="niche"
      title="Million Dollar Market"
      subtitle="Find the customer market where your astrology, numerology, Tarot or Vastu work can sell clearly."
      questions={[
        { id: "preferred", label: "Who do you feel called to guide?", placeholder: "Professionals, families, founders, couples, students, homeowners..." },
        { id: "excluded", label: "What kind of guidance do you not want to offer?", placeholder: "Fear-based predictions, health claims, legal outcomes..." },
      ]}
    />
  );
}
