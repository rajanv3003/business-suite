import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function StrategyRoomPage() {
  return (
    <AgentWorkspace
      area="diagnosis"
      title="Strategy Room"
      subtitle="Diagnose the current business, identify bottlenecks and decide the recommended order of execution."
      questions={[
        { id: "biggest_constraint", label: "What feels like the biggest constraint right now?", placeholder: "Positioning, price, leads, proof, sales calls, follow-up..." },
        { id: "recent_pattern", label: "What pattern do you keep seeing with prospects?", placeholder: "For example: they ask for price, delay decisions, want only predictions..." },
      ]}
    />
  );
}
