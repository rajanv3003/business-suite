"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function AiToolAdvisorPage() {
  return (
    <AgentWorkspace
      area="tools"
      title="AI Tools"
      subtitle="Choose simple tools for forms, client notes, content, booking and follow-up."
      questions={[
        { id: "useCase", label: "What do you want to set up first?", placeholder: "Intake form, client notes, booking page, content calendar..." },
        { id: "budget", label: "How technical do you want this to be?", placeholder: "No-code, simple tools only, low budget..." },
      ]}
    />
  );
}
