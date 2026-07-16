import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function SignatureMethodPage() {
  return (
    <AgentWorkspace
      area="signature"
      title="Signature Method Agent"
      subtitle="Turn practitioner expertise into named intellectual property with stages, logic and client journey."
      questions={[
        { id: "repeatable_process", label: "What steps do you naturally follow with clients?", placeholder: "Intake, chart reading, diagnosis, remedies, action planning..." },
        { id: "method_style", label: "What should the method feel like?", placeholder: "Traditional, practical, premium, compassionate, structured..." },
      ]}
    />
  );
}
