"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function NicheFinderPage() {
  return (
    <AgentWorkspace
      area="niche"
      title="High-Ticket Niche Finder"
      subtitle="Expertise, proof, buying power और ethical suitability के आधार पर premium niches score करें।"
      questions={[
        { id: "preferred", label: "किस audience के साथ काम करना पसंद है?", placeholder: "Clinic owners, premium homeowners, office owners..." },
        { id: "excluded", label: "किस तरह के clients avoid करने हैं?", placeholder: "Fear-based urgent remedy seekers..." },
      ]}
    />
  );
}
