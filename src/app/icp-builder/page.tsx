"use client";

import { useProfile } from "@/context/ProfileContext";
import { ModuleFlow } from "@/components/ModuleFlow";
import { UserCircle } from "lucide-react";

export default function ICPBuilder() {
  const { profile, updateNested } = useProfile();

  return (
    <ModuleFlow
      moduleId="icp"
      title="கனவு Client Profile"
      subtitle="3 கேள்விகள். ஞானி full persona build செய்யும்."
      icon={<UserCircle size={22} />}
      accentGradient="linear-gradient(135deg, #8b5cf6, #ec4899)"
      twoPass={true}
      locked={!profile.onboarding.completed}
      lockMessage="முதலில் தொடக்கம் (Onboarding) முடிக்கவும் — நீங்கள் யாருக்கு உதவுகிறீர்கள் என்று தெரிய வேண்டும்."
      existingOutput={profile.icp.generated}
      questions={[
        {
          id: "favorite_client",
          label: "உங்கள் favourite client-ஐ (அல்லது நீங்கள் மிகவும் உதவ விரும்பும் நபரை) நினைத்துப் பாருங்கள். அவர்களின் வயது, வேலை, வாழ்க்கை நிலை என்ன?",
          placeholder: 'உதா: "35 வயது IT manager, Bangalore-ல, married, corporate loop-ல stuck-ஆ feel ஆகுறார்"',
          type: "textarea",
        },
        {
          id: "struggling_with",
          label: "உங்களிடம் வருவதற்கு முன் அவர்கள் என்ன செய்து கொண்டிருந்தார்கள் — அல்லது எதில் struggle செய்தார்கள்?",
          placeholder: 'உதா: "Quit பண்ணணும்னு நினைக்கிறார், ஆனா salary போகும்னு பயம், spouse-கிட்ட அதை பத்தி சண்டை"',
          type: "textarea",
        },
        {
          id: "never_say",
          label: "அவர்கள் ஒருபோதும் வெளியே சொல்ல மாட்டார்கள், ஆனால் உள்ளுக்குள் feel ஆவது என்ன?",
          placeholder: 'உதா: "என் 20s-ஐ வேற யாரோ dream-க்காக waste பண்ணிட்டேன், இப்போ too late-ஆ feel ஆகுது"',
          type: "textarea",
        },
      ]}
      onSave={(output) => {
        updateNested("icp", { generated: output, completed: true });
      }}
    />
  );
}
