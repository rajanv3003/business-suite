"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function ContentCalendarPage() {
  return (
    <AgentWorkspace
      area="calendar"
      title="Cosmic Calendar"
      subtitle="Turn Panchang-style inspiration into hook-led content with a clear solution, caption and CTA. Exact timings must be verified."
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
