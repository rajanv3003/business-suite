"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function BusinessKundliPage() {
  return (
    <AgentWorkspace
      area="diagnosis"
      title="Business Kundli Reveal"
      subtitle="Practitioner profile, proof, audience और revenue goal को मिलाकर strongest business direction निकाले।"
      questions={[
        { id: "goal", label: "अगले 90 दिनों का मुख्य goal क्या है?", placeholder: "Premium clinic Vastu package launch करना..." },
        { id: "proof", label: "कौन-सा proof safely use कर सकते हैं?", placeholder: "Consent वाले testimonials, anonymized results..." },
      ]}
    />
  );
}
