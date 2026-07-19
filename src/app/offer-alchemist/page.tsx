"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function OfferAlchemistPage() {
  return (
    <AgentWorkspace
      area="offer"
      title="Package & Price"
      subtitle="Create a simple consultation package with clear value, steps, deliverables and price logic."
      questions={[
        { id: "deliverables", label: "What should the client receive after the session?", placeholder: "Reading notes, reflection prompts, Vastu checklist, follow-up summary..." },
        { id: "capacity", label: "How much time can you give each client?", placeholder: "60 minutes, 90 minutes, one follow-up, written summary..." },
      ]}
    />
  );
}
