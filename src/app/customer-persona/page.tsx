"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function CustomerPersonaPage() {
  return (
    <AgentWorkspace
      area="persona"
      title="Customer Persona"
      subtitle="Age और city से आगे जाकर buyer की private worries, trust needs और purchase triggers समझें।"
      questions={[
        { id: "trigger", label: "Client किस trigger पर consultation खरीदता है?", placeholder: "Renovation, clinic launch, business name change..." },
        { id: "trust", label: "उन्हें advisor पर trust करने के लिए क्या चाहिए?", placeholder: "Clear report, proof, calm explanation, no demolition pressure..." },
      ]}
    />
  );
}
