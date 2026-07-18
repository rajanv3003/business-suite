"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function CustomerPersonaPage() {
  return (
    <AgentWorkspace
      area="persona"
      title="Client Avatar"
      subtitle="Understand the seeker’s inner questions, trust needs and preferred style of spiritual support."
      questions={[
        { id: "trigger", label: "What brings this seeker to a session?", placeholder: "A repeated pattern, a life decision, space confusion, name change..." },
        { id: "trust", label: "What helps them feel safe with a practitioner?", placeholder: "Calm language, clear boundaries, written notes, no fear..." },
      ]}
    />
  );
}
