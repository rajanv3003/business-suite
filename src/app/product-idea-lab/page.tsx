import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function ProductIdeaLabPage() {
  return (
    <AgentWorkspace
      area="product"
      title="Product And Software Idea Lab"
      subtitle="Generate ethical software ideas, MVP features, architecture, validation plan and a Codex build prompt."
      questions={[
        { id: "tool_type", label: "Should the tool be internal or customer-facing?", placeholder: "Internal CRM, public assessment, report generator, learning assistant..." },
        { id: "technical_capacity", label: "What is the budget and technical capacity?", placeholder: "No-code first, Codex build, developer budget, timeline..." },
      ]}
    />
  );
}
