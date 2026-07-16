import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function OfferLabPage() {
  return (
    <AgentWorkspace
      area="offer"
      title="Premium Offer Architect"
      subtitle="Interview the business context and generate entry, core premium and high-ticket offers with responsible promises."
      questions={[
        { id: "delivery_capacity", label: "What support can realistically be delivered?", placeholder: "Private calls, group sessions, WhatsApp support, reports, workshops..." },
        { id: "price_goal", label: "What price range feels ambitious but realistic?", placeholder: "Current price, desired price, payment plan constraints..." },
        { id: "proof_available", label: "What proof can be verified?", placeholder: "Testimonials, client count, screenshots, case studies, certifications..." },
      ]}
    />
  );
}
