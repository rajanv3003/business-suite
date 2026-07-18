"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function NicheFinderPage() {
  return (
    <AgentWorkspace
      area="niche"
      title="Path Finder"
      subtitle="Choose a focused occult practice path without making the brand sound pushy or generic."
      questions={[
        { id: "preferred", label: "Who do you feel called to guide?", placeholder: "Professionals, families, founders, couples, students, homeowners..." },
        { id: "excluded", label: "What kind of guidance do you not want to offer?", placeholder: "Fear-based predictions, health claims, legal outcomes..." },
      ]}
    />
  );
}
