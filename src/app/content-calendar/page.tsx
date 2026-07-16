"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function ContentCalendarPage() {
  return (
    <AgentWorkspace
      area="calendar"
      title="Panchang Content Calendar"
      subtitle="City-aware Panchang highlights को niche, funnel stage और platform के हिसाब से content opportunities में बदलें।"
      questions={[
        { id: "city", label: "Calendar location क्या है?", placeholder: "Mumbai, Maharashtra, India, Asia/Kolkata" },
        { id: "platform", label: "किस platform के लिए calendar चाहिए?", placeholder: "Instagram Reels, YouTube Shorts, WhatsApp Channel..." },
      ]}
    />
  );
}
