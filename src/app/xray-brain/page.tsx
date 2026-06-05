"use client";

import { useProfile } from "@/context/ProfileContext";
import { ModuleFlow } from "@/components/ModuleFlow";
import { Brain } from "lucide-react";

export default function XRayBrain() {
  const { profile, updateNested } = useProfile();

  return (
    <ModuleFlow
      moduleId="mind_xray"
      title="மன ஆராய்ச்சி"
      subtitle="ஒரே ஒரு கேள்வி. ஞானி முழு psychology map செய்யும்."
      icon={<Brain size={22} />}
      accentGradient="linear-gradient(135deg, #ec4899, #f97316)"
      twoPass={true}
      locked={!profile.icp.completed}
      lockMessage="முதலில் ICP Builder முடிக்கவும் — உங்கள் ideal client யார் என்று தெரிய வேண்டும்."
      existingOutput={profile.mind_xray.generated}
      questions={[
        {
          id: "midnight_worry",
          label: "இந்த நபர் இரவு 1 மணிக்கு தூக்கமின்றி படுத்திருக்கும்போது, எந்த கவலை switch off ஆகாமல் இருக்கும்?",
          placeholder: 'உதா: "50 வயசுலயும் இதே job-ல இருப்பேனா? நான் உண்மையிலேயே என்ன want பண்றேன்னு ஒருநாளும் figure out பண்ண முடியாதா?"',
          type: "textarea",
        },
      ]}
      onSave={(output) => {
        updateNested("mind_xray", { generated: output, completed: true });
      }}
    />
  );
}
