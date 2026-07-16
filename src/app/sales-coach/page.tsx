import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function SalesCoachPage() {
  return (
    <AgentWorkspace
      area="sales"
      title="Sales Coach Agent"
      subtitle="Create the discovery-call flow, qualification questions, price presentation and ethical close."
      questions={[
        { id: "sales_context", label: "Where does the sale happen?", placeholder: "WhatsApp, Zoom, phone, in-person consultation, webinar follow-up..." },
        { id: "weak_moment", label: "Where does the practitioner usually lose confidence?", placeholder: "Price, spouse objection, guarantee question, closing..." },
      ]}
    />
  );
}
