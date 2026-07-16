"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function AskGargiAiPage() {
  return (
    <AgentWorkspace
      area="guide"
      title="Ask Gargi AI"
      subtitle="Saved Business Kundli के context से contextual business, content और offer guidance लें।"
      questions={[
        { id: "question", label: "Gargi AI से क्या पूछना है?", placeholder: "मेरा high-ticket client कौन हो सकता है? आज क्या post करूं?" },
        { id: "constraint", label: "कोई constraint या preference?", placeholder: "Hindi में, practical रखें, no fear-based selling..." },
      ]}
    />
  );
}
