"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function ScriptStudioPage() {
  return (
    <AgentWorkspace
      area="script"
      title="Viral Script Studio"
      subtitle="Calendar idea से word-by-word Reel, Short, carousel या WhatsApp script generate करें।"
      questions={[
        { id: "topic", label: "आज का topic क्या है?", placeholder: "Clinic renovation से पहले 3 Vastu checks..." },
        { id: "tone", label: "Tone कैसा चाहिए?", placeholder: "Simple, authoritative, emotional, story-based..." },
      ]}
    />
  );
}
