import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function PresentationBuilderPage() {
  return (
    <AgentWorkspace
      area="presentation"
      title="Offer Presentation Agent"
      subtitle="Generate slide-by-slide sales, webinar or consultation presentation content with notes and proof prompts."
      questions={[
        { id: "presentation_type", label: "What type of presentation is needed?", placeholder: "Consultation deck, webinar, workshop, proposal, discovery-call deck..." },
        { id: "length", label: "How long should it be?", placeholder: "8 slides, 15 minutes, 45-minute webinar..." },
      ]}
    />
  );
}
