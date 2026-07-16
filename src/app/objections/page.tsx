import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function ObjectionsPage() {
  return (
    <AgentWorkspace
      area="objections"
      title="Objection Handling Agent"
      subtitle="Generate empathetic, proof-aware responses without manipulation or pressure."
      questions={[
        { id: "common_objections", label: "Which objections appear most often?", placeholder: "Too expensive, need to think, ask spouse, tried astrology before..." },
        { id: "response_tone", label: "What tone should responses use?", placeholder: "Warm, direct, traditional, premium, compassionate..." },
      ]}
    />
  );
}
