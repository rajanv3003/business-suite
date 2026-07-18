"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function AiToolAdvisorPage() {
  return (
    <AgentWorkspace
      area="tools"
      title="Tool Oracle"
      subtitle="Choose simple tools for forms, notes, content and follow-up without overwhelming the practitioner."
      questions={[
        { id: "useCase", label: "What do you want to set up first?", placeholder: "Intake form, client notes, booking page, content calendar..." },
        { id: "budget", label: "How technical do you want this to be?", placeholder: "No-code, simple tools only, low budget..." },
      ]}
    />
  );
}
