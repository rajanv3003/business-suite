"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function BuildPromptGeneratorPage() {
  return (
    <AgentWorkspace
      area="prompt"
      title="AI Build Prompt Generator"
      subtitle="Codex, Lovable, Replit, Bolt या Cursor के लिए detailed build prompt बनाएं।"
      questions={[
        { id: "product", label: "कौन-सा tool या mini-SaaS build करना है?", placeholder: "Clinic Vastu lead magnet landing page..." },
        { id: "features", label: "Launch version में कौन-से features जरूरी हैं?", placeholder: "Login, lead form, admin CSV export, WhatsApp copy..." },
      ]}
    />
  );
}
