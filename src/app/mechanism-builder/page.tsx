"use client";

import { useProfile } from "@/context/ProfileContext";
import { ModuleFlow } from "@/components/ModuleFlow";
import { Cog } from "lucide-react";

export default function MechanismBuilder() {
  const { profile, updateNested } = useProfile();

  return (
    <ModuleFlow
      moduleId="mechanism"
      title="Unique Mechanism கட்ட"
      subtitle="3 கேள்விகள். ஞானி உங்கள் method-க்கு பெயர் வைத்து framework build செய்யும்."
      icon={<Cog size={22} />}
      accentGradient="linear-gradient(135deg, #f97316, #d4a853)"
      twoPass={false}
      locked={!profile.high_impact.completed}
      lockMessage="முதலில் Problem Finder முடிக்கவும் — உங்கள் high-impact பிரச்சனைகள் தேவை."
      existingOutput={profile.mechanism.generated}
      questions={[
        {
          id: "secret_sauce",
          label: "மற்ற coaches-ஐ விட நீங்கள் என்ன வித்தியாசமாக செய்கிறீர்கள் — உங்கள் 'secret sauce' அல்லது signature process என்ன?",
          placeholder: 'உதா: "Journaling + real-time accountability calls combine செய்கிறேன். Fluff இல்லை, every week action மட்டும்."',
          type: "textarea",
        },
        {
          id: "steps",
          label: "நீங்கள் மக்களை steps, stages, அல்லது pillars வழியாக கொண்டு செல்கிறீர்களா? சொல்லுங்கள் (messy-ஆ இருந்தாலும் OK).",
          placeholder: 'உதா: "1. Clarity session 2. Weekly mindset work 3. Action plan 4. Accountability loop 5. Review & celebrate"',
          type: "textarea",
        },
        {
          id: "origin",
          label: "இந்த method எங்கிருந்து வந்தது — உங்கள் சொந்த கதை, training, mentor, trial and error?",
          placeholder: 'உதா: "நானே burnout-ல போனேன். Therapy, books, எல்லாம் try பண்ணினேன். உண்மையிலேயே work ஆனதை வைத்து இதை build பண்ணினேன்."',
          type: "textarea",
        },
      ]}
      onSave={(output) => {
        updateNested("mechanism", { generated: output, completed: true });
      }}
    />
  );
}
