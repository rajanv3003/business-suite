"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function BuildPromptGeneratorPage() {
  return (
    <AgentWorkspace
      area="prompt"
      title="Builder Scroll"
      subtitle="Create clean prompts for Codex, Lovable, Replit, Bolt or Cursor."
      questions={[
        { id: "product", label: "What do you want to build?", placeholder: "A light luxury reading booking page..." },
        { id: "features", label: "What must be in the first version?", placeholder: "Lead form, disclaimer, booking CTA, admin export..." },
      ]}
    />
  );
}
