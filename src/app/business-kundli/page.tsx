"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function BusinessKundliPage() {
  return (
    <AgentWorkspace
      area="diagnosis"
      title="Business Kundli"
      subtitle="Understand your work, your strength, your audience and the next best business step."
      questions={[
        { id: "goal", label: "What kind of guidance do you most naturally provide?", placeholder: "Career clarity, Vastu harmony, numerology alignment, Tarot reflection..." },
        { id: "proof", label: "What real proof or experience can be safely mentioned?", placeholder: "Years of practice, consented testimonials, anonymized client reflections..." },
      ]}
    />
  );
}
