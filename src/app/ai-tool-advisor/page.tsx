"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function AiToolAdvisorPage() {
  return (
    <AgentWorkspace
      area="tools"
      title="AI Tool Advisor"
      subtitle="Non-technical practitioners के लिए landing page, WhatsApp, CRM, booking और content tools की practical stack recommendation."
      questions={[
        { id: "useCase", label: "आप क्या बनाना चाहते हैं?", placeholder: "Landing page, WhatsApp automation, CRM, client report..." },
        { id: "budget", label: "Budget और technical comfort क्या है?", placeholder: "Low budget, no-code preferred, team नहीं है..." },
      ]}
    />
  );
}
