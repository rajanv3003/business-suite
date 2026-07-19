"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function ContentCalendarPage() {
  return (
    <AgentWorkspace
      area="calendar"
      title="Panchang Content"
      subtitle="Use Panchang dates to create useful content ideas with hook, reason, solution and CTA."
      questions={[
        { id: "month", label: "Which month should Gargi plan?", placeholder: "June 2026, July 2026, August 2026..." },
        { id: "city", label: "Which city should the calendar respect?", placeholder: "Mumbai, Maharashtra, India, Asia/Kolkata" },
        { id: "platform", label: "Where will you publish?", placeholder: "Instagram Reels, YouTube Shorts, WhatsApp Channel..." },
        { id: "audience_moment", label: "What customer moment should the hook stop?", placeholder: "Before renovation, before name change, before marriage decision, before business launch..." },
        { id: "cta_goal", label: "What CTA should the content drive?", placeholder: "DM CLARITY, book consultation, save post, open intake form..." },
      ]}
    />
  );
}
