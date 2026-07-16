import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function PositioningPage() {
  return (
    <AgentWorkspace
      area="positioning"
      title="Niche And Positioning Agent"
      subtitle="Create safe, premium and bold positioning directions with scoring and a recommended choice."
      questions={[
        { id: "audience_choice", label: "Which audience are you most interested in serving?", placeholder: "Coaches, founders, couples, students, executives, families..." },
        { id: "positioning_boundary", label: "What should the positioning avoid?", placeholder: "Cheap prediction language, fear, too much mysticism, corporate jargon..." },
      ]}
    />
  );
}
