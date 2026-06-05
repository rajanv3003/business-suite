"use client";

import { useProfile } from "@/context/ProfileContext";
import { ModuleFlow } from "@/components/ModuleFlow";
import { Mic } from "lucide-react";

export default function PitchBuilder() {
  const { profile, updateNested } = useProfile();

  return (
    <ModuleFlow
      moduleId="pitch"
      title="Pitch உருவாக்கு"
      subtitle="2 கேள்விகள். ஞானி உங்கள் channel-க்கு adapt செய்த pitch எழுதும்."
      icon={<Mic size={22} />}
      accentGradient="linear-gradient(135deg, #8b5cf6, #22d3ee)"
      twoPass={false}
      locked={!profile.offer.completed}
      lockMessage="முதலில் Godfather Offer முடிக்கவும் — pitch build செய்ய உங்கள் offer தேவை."
      existingOutput={profile.pitch.generated}
      questions={[
        {
          id: "channel",
          label: "யாரிடம் pitch செய்கிறீர்கள் — எங்கே?",
          placeholder: "உங்கள் channel select செய்யுங்கள்",
          type: "select",
          options: ["DM (Instagram / WhatsApp)", "1:1 Sales Call", "Stage / Webinar", "Written Proposal"],
        },
        {
          id: "desired_action",
          label: "கடைசியில் அவர்கள் என்ன action எடுக்க வேண்டும்?",
          placeholder: 'உதா: "Free clarity call book செய்யுங்கள்", "₹25,000 pay செய்து join ஆகுங்கள்", "Free session-க்கு yes சொல்லுங்கள்"',
          type: "text",
        },
      ]}
      onSave={(output) => {
        updateNested("pitch", { generated: output, completed: true });
      }}
    />
  );
}
