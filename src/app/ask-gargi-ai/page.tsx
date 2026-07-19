"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function AskGargiAiPage() {
  return (
    <AgentWorkspace
      area="guide"
      title="Talk to Gargi"
      subtitle="Ask Gargi for simple help on content, market, package, Panchang ideas or app prompts."
      questions={[
        { id: "question", label: "What do you want guidance on?", placeholder: "What should I post today? How should I explain my reading style?" },
        { id: "constraint", label: "Any preference?", placeholder: "Keep it English, elegant, practical, no fear-based wording..." },
      ]}
    />
  );
}
