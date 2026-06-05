"use client";

import { useProfile } from "@/context/ProfileContext";
import { ModuleFlow } from "@/components/ModuleFlow";
import { Zap } from "lucide-react";

export default function HookBuilder() {
  const { profile, updateNested } = useProfile();

  return (
    <ModuleFlow
      moduleId="hooks"
      title="Hooks & Headlines"
      subtitle="2 கேள்விகள். ஞானி 10 hooks with win-rates எழுதும்."
      icon={<Zap size={22} />}
      accentGradient="linear-gradient(135deg, #3b82f6, #10b981)"
      twoPass={false}
      locked={!profile.offer.completed}
      lockMessage="முதலில் Godfather Offer முடிக்கவும் — hooks எழுத உங்கள் offer தேவை."
      existingOutput={profile.hooks.generated}
      questions={[
        {
          id: "platform",
          label: "இவை எங்கு run ஆகும்?",
          placeholder: "Platform select செய்யுங்கள்",
          type: "select",
          options: ["Meta / Facebook Ads", "Instagram Reels / Stories", "WhatsApp Broadcast", "Webinar Title", "YouTube", "LinkedIn"],
        },
        {
          id: "tone",
          label: "Tone தேர்ந்தெடுங்கள்:",
          placeholder: "உங்கள் tone select செய்யுங்கள்",
          type: "select",
          options: ["Bold / எதிர்மறை", "Warm / நெருக்கமான", "Authority / Proof"],
        },
      ]}
      onSave={(output) => {
        updateNested("hooks", { generated: output, completed: true });
      }}
    />
  );
}
