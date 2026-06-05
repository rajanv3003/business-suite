"use client";

import { useProfile } from "@/context/ProfileContext";
import { ModuleFlow } from "@/components/ModuleFlow";
import { Crown } from "lucide-react";

export default function GodfatherOffer() {
  const { profile, updateNested } = useProfile();

  return (
    <ModuleFlow
      moduleId="offer"
      title="மறுக்க முடியாத Offer"
      subtitle="3 கேள்விகள். ஞானி இல்லை என்று சொல்ல முடியாத offer build செய்யும்."
      icon={<Crown size={22} />}
      accentGradient="linear-gradient(135deg, #d4a853, #f0c75e)"
      twoPass={false}
      locked={!profile.mechanism.completed}
      lockMessage="முதலில் Mechanism Builder முடிக்கவும் — உங்கள் unique method தேவை."
      existingOutput={profile.offer.generated}
      questions={[
        {
          id: "what_they_get",
          label: "உங்களிடம் work செய்யும்போது மக்களுக்கு exactly என்ன கிடைக்கும்? (calls, duration, support, materials — எல்லாம் சொல்லுங்கள்)",
          placeholder: 'உதா: "வாரம் ஒரு 1:1 call (60 min), WhatsApp support Mon-Fri, workbook, templates, private community"',
          type: "textarea",
        },
        {
          id: "price",
          label: "உங்கள் விலை என்ன — அல்லது எவ்வளவு charge செய்ய விரும்புகிறீர்கள்?",
          placeholder: 'உதா: "₹25,000 full 8-week program-க்கு" அல்லது "₹15,000 — ஆனா ₹30,000 charge செய்ய விரும்புகிறேன்"',
          type: "text",
        },
        {
          id: "dream_result",
          label: "Dream result என்ன, எவ்வளவு நேரம் ஆகும்?",
          placeholder: 'உதா: "Confused-ல இருந்து clear career transition plan-உடன் 8 weeks-ல வருவார்கள்"',
          type: "textarea",
        },
      ]}
      onSave={(output) => {
        updateNested("offer", { generated: output, completed: true });
      }}
    />
  );
}
