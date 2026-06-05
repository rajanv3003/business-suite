"use client";

import { useProfile } from "@/context/ProfileContext";
import { ModuleFlow } from "@/components/ModuleFlow";
import { Target } from "lucide-react";

export default function ProblemFinder() {
  const { profile, updateNested } = useProfile();

  return (
    <ModuleFlow
      moduleId="high_impact"
      title="High-Impact பிரச்சனை கண்டுபிடி"
      subtitle="2 கேள்விகள். ஞானி premium-க்கு மக்கள் பணம் கொடுக்கும் பிரச்சனைகளைக் கண்டுபிடிக்கும்."
      icon={<Target size={22} />}
      accentGradient="linear-gradient(135deg, #10b981, #22d3ee)"
      twoPass={true}
      locked={!profile.mind_xray.completed}
      lockMessage="முதலில் Mind X-Ray முடிக்கவும் — psychology map தேவை."
      existingOutput={profile.high_impact.generated}
      questions={[
        {
          id: "transformation",
          label: 'இதை நிரப்புங்கள்: "என்கிட்ட வருவதற்கு முன், என் client ______ feel ஆகிறார். என்கிட்ட work செய்த பிறகு, ______ feel ஆகிறார்."',
          placeholder: 'உதா: "முன்: career-ல drain ஆகி lost-ஆவும் stuck-ஆவும் இருப்பார். பின்: clear, confident, Monday காலை excitement-ஆ எழுவார்"',
          type: "textarea",
        },
        {
          id: "domain",
          label: "இது நிஜ வாழ்க்கையில் எங்கு அதிகம் தெரியும்?",
          placeholder: 'உதா: "Career growth — promotions miss ஆவது, meetings-ல பேசாமல் இருப்பது"',
          type: "select",
          options: ["Career", "பணம் & Finance", "உறவுகள்", "உடல்நலம் & Energy", "Confidence & Identity", "Business Growth"],
        },
      ]}
      onSave={(output, answers) => {
        updateNested("high_impact", {
          generated: output,
          transformation_from: answers.transformation?.split("After")[0] || "",
          transformation_to: answers.transformation?.split("After")[1] || "",
          domain: answers.domain || "",
          completed: true,
        });
      }}
    />
  );
}
