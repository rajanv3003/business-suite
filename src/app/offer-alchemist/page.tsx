"use client";

import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function OfferAlchemistPage() {
  return (
    <AgentWorkspace
      area="offer"
      title="Premium Offer Alchemist"
      subtitle="Single consultation को tangible high-ticket package में बदलें: diagnosis, report, roadmap, checklist और follow-up."
      questions={[
        { id: "deliverables", label: "Offer में कौन-से tangible deliverables देने हैं?", placeholder: "Floor-plan report, priority matrix, tracker..." },
        { id: "capacity", label: "हर week delivery के लिए कितना time है?", placeholder: "10 hours, 4 clients/month..." },
      ]}
    />
  );
}
