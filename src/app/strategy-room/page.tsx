import { AgentWorkspace } from "@/components/AgentWorkspace";

export default function StrategyRoomPage() {
  return (
    <AgentWorkspace
      area="problem"
      title="High Impact Problem"
      subtitle="Find the expensive real-life problem your occult work can solve so your package feels worth paying for."
      questions={[
        { id: "help_line", label: "In one line, how do you help people?", placeholder: "I help business owners use Vastu to improve office energy, team focus and decision clarity..." },
        { id: "buyer_market", label: "Who is the market with money and urgency?", placeholder: "Clinic owners, founders, real estate buyers, career professionals, couples, parents..." },
        { id: "pain_pattern", label: "What painful pattern are they already facing?", placeholder: "Wrong property decisions, career confusion, repeated business stress, team conflict, fear before big decisions..." },
      ]}
    />
  );
}
