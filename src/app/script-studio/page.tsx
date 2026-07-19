"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function ScriptStudioPage() {
  return (
    <AgentWorkspace
      area="script"
      title="SM Viral Content"
      subtitle="Create social media hooks, Reels, Shorts, carousel ideas and WhatsApp scripts that normal people understand."
      questions={[
        { id: "topic", label: "What is today’s topic?", placeholder: "Before you ask for a prediction, ask this..." },
        { id: "tone", label: "What tone should it have?", placeholder: "Calm, reflective, elegant, practical, beginner-friendly..." },
        { id: "hook_style", label: "Which hook style should Gargi use?", placeholder: "Mistake, myth-bust, before-you-decide, 3-step method, comparison..." },
        { id: "cta", label: "What should viewers do next?", placeholder: "Comment CLARITY, DM NAME, book reading, save this, share with family..." },
      ]}
    />
  );
}
