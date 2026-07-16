import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function RoadmapPage() {
  return (
    <AgentWorkspace
      area="roadmap"
      title="Execution Roadmap Agent"
      subtitle="Convert approved assets into a practical 7-day, 30-day and 90-day execution plan."
      questions={[
        { id: "hours", label: "How many hours per week are available?", placeholder: "For example: 8, 15, 25..." },
        { id: "resources", label: "What resources are available?", placeholder: "Budget, team, designer, editor, ad spend, audience size..." },
      ]}
    />
  );
}
