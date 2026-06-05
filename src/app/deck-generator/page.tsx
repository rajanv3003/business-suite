"use client";

import { useProfile } from "@/context/ProfileContext";
import { ModuleFlow } from "@/components/ModuleFlow";
import { Presentation } from "lucide-react";

export default function DeckGenerator() {
  const { profile, updateNested } = useProfile();

  return (
    <ModuleFlow
      moduleId="deck"
      title="Deck உருவாக்கு"
      subtitle="2 கேள்விகள். ஞானி slides + speaker notes build செய்யும்."
      icon={<Presentation size={22} />}
      accentGradient="linear-gradient(135deg, #ec4899, #8b5cf6)"
      twoPass={false}
      locked={!profile.offer.completed}
      lockMessage="முதலில் Godfather Offer முடிக்கவும் — deck-க்கு உங்கள் offer தேவை."
      existingOutput={profile.deck.generated}
      questions={[
        {
          id: "deck_purpose",
          label: "இந்த deck எதற்கு?",
          placeholder: "Purpose select செய்யுங்கள்",
          type: "select",
          options: ["Webinar / Free Training", "Sales Presentation", "1:1 Client Pitch", "Workshop / Masterclass"],
        },
        {
          id: "slide_count",
          label: "எத்தனை slides / எவ்வளவு நேரம்?",
          placeholder: 'உதா: "30 min webinar-க்கு 10-12 slides" அல்லது "Quick pitch-க்கு 5 slides"',
          type: "text",
        },
      ]}
      onSave={(output) => {
        updateNested("deck", { generated: output, completed: true });
      }}
    />
  );
}
