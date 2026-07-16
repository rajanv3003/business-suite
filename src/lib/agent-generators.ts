import { BusinessProfile, WorkspaceArea } from "./profile";

const money = (value: string) => (value ? `₹${Number(value).toLocaleString("en-IN")}` : "अभी तय नहीं");

export function generateAgentAsset(area: WorkspaceArea, profile: BusinessProfile, answers: Record<string, string>): string {
  const name = profile.practitioner.name || "practitioner";
  const category = profile.practitioner.categories.join(", ") || "occult professional";
  const audience = profile.audience.desiredAudience || profile.audience.currentBuyers || "premium clients";
  const proof = profile.proof.testimonials || profile.proof.clientCount || "proof upload pending";
  const context = `Context: ${name} is a ${category}. Audience: ${audience}. Current fee: ${money(profile.business.currentPrice)}. Revenue goal: ${money(profile.business.targetRevenue)}. Proof: ${proof}. User input for this run: ${JSON.stringify(answers)}.`;

  const outputs: Record<string, string> = {
    diagnosis: `# Business Kundli Reveal
${context}

## सबसे मजबूत Business Direction
${name} के लिए सबसे practical direction है: premium documented consulting, जहां client को सिर्फ एक verbal reading नहीं बल्कि diagnosis, roadmap, checklist और follow-up मिलता है।

## Current Strength
- Expertise category clear है: ${category}
- Audience premium हो सकती है: ${audience}
- Existing fee ${money(profile.business.currentPrice)} है, इसलिए high-ticket ladder बनाना realistic है।

## Missing Pieces
1. Verified testimonials और consented screenshots upload करने होंगे।
2. Offer को tangible deliverables में बदलना होगा।
3. Content calendar को city-specific verified Panchang provider से connect करना होगा।
4. Fear-based selling और guaranteed outcome language हटानी होगी।

## अगला कदम
Niche Finder में 3-5 niche options score करके एक primary niche approve करें।`,

    niche: `# High-Ticket Niche Finder
${context}

## Option 1: Clinic Owners Vastu Audit
Ideal client: clinic owners renovating or improving patient flow.
Expensive problem: layout confusion, repeated changes and trust concerns.
Premium reason: written report, priority matrix and follow-up reduce decision confusion.
Score: 86/100.

## Option 2: Premium Home Renovation Vastu
Ideal client: premium homeowners before renovation.
Expensive problem: costly layout decisions and family disagreement.
Premium reason: room-wise clarity before civil work begins.
Score: 79/100.

## Option 3: Office Owner Decision Clarity
Ideal client: small office owners changing seating, entrance or cabin layout.
Expensive problem: productivity and client experience concerns.
Premium reason: practical implementation checklist.
Score: 74/100.

## Recommended Niche
Clinic Owners Vastu Audit. यह niche urgent, specific और tangible deliverables के लिए अच्छा है।

## Ethical Limitation
Vastu को scientifically guaranteed business growth की तरह present न करें। इसे traditional guidance, spatial interpretation और planning support के रूप में frame करें।`,

    persona: `# Customer Persona
${context}

## Persona Name
Dr. Neha - premium clinic owner.

## External Identity
Profession: dentist, dermatologist, physiotherapist or wellness clinic owner.
Location: Mumbai / Pune / Tier-1 city.
Digital behaviour: Instagram, WhatsApp, Google reviews, YouTube explainers.

## Internal Identity
वह renovation पर खर्च कर रही हैं पर unsure हैं कि reception, consultation room और treatment flow सही है या नहीं।
वह demolition-heavy advice से डरती हैं और practical, elegant corrections चाहती हैं।

## Buying Triggers
- New clinic launch
- Renovation before expansion
- Patient experience complaints
- Family or partner disagreement on layout

## Top Questions
1. क्या online floor-plan review enough है?
2. क्या बिना तोड़फोड़ के corrections हो सकते हैं?
3. Report में exactly क्या मिलेगा?
4. Follow-up support होगा?
5. Remedies practical होंगी या expensive?

## Best CTA
“Clinic layout clarity चाहिए तो comment में CLINIC लिखें।”`,

    offer: `# Premium Offer Alchemist
${context}

## Offer Name
Clinic Vastu Clarity Blueprint

## One-Line Promise
Clinic owners को floor-plan, room placement और implementation priorities पर practical Vastu guidance देने वाला documented premium audit.

## Delivery Timeline
14 days: intake, floor-plan review, 90-minute consultation, written report, checklist and follow-up.

## Deliverables
- Pre-consultation questionnaire
- Floor-plan and photo review
- Room-wise observation report
- Priority correction matrix
- Shopping / placement checklist
- 30-day implementation tracker
- One follow-up review

## Suggested Price Range
₹35,000-₹75,000. Logic: current fee ${money(profile.business.currentPrice)}, documentation depth, custom floor-plan review and follow-up effort.

## Risk Reversal
Guarantee नहीं. Instead: अगर first consultation के बाद priority list clear नहीं है, one clarification session included.

## Disclaimer
यह traditional Vastu guidance और planning support है। किसी income, health, legal या business success की guarantee नहीं दी जाती।`,

    calendar: `# Panchang Content Calendar - 7 Days
${context}

## Provider Status
DemoPanchangProvider active. Production में verified API, admin CSV/JSON या editorial-reviewed data connect करें।

| Date | Panchang Highlight | Content Idea | Format | CTA |
| --- | --- | --- | --- | --- |
| Day 1 | Shukla Paksha | Renovation से पहले 3 Vastu checks | Reel | CHECKLIST |
| Day 2 | Rohini Nakshatra | Clinic reception placement mistakes | Carousel | CLINIC |
| Day 3 | Ekadashi theme | Space cleansing vs practical planning | Short | SAVE |
| Day 4 | Guru influence | Advisor चुनते समय proof क्या देखें | Reel | GUIDE |
| Day 5 | Purnima prep | Home energy audit myths | Story | ASK |
| Day 6 | Vastu awareness | बिना demolition corrections | Reel | PLAN |
| Day 7 | Weekly recap | 5-point clinic Vastu audit | WhatsApp | AUDIT |

## Safety Note
Exact timings verified Panchang data के बिना publish न करें।`,

    script: `# Viral Script Studio
${context}

## Platform
Instagram Reel / YouTube Short

## On-Screen Headline
Clinic renovate करने से पहले ये 3 Vastu checks कर लें

## 3-Second Hook
अगर आप clinic renovate कर रहे हैं, तो reception की सुंदरता से पहले यह check कीजिए।

## Script
“कई clinic owners renovation में लाखों खर्च कर देते हैं, लेकिन flow clear नहीं होता। सबसे पहले entrance से patient की movement देखिए। दूसरा, consultation room में privacy और confidence दोनों होने चाहिए। तीसरा, waiting area सिर्फ सुंदर नहीं, calm और uncluttered होना चाहिए। Vastu में हम इसे direction, placement और practical usage के साथ देखते हैं। यह guarantee नहीं है, लेकिन decision clarity का बहुत useful framework है।”

## CTA
अगर आप अपनी clinic layout checklist चाहते हैं, comment में “CLINIC” लिखें।

## Caption
Renovation से पहले clarity लेना बाद में expensive rework से बेहतर है.

## Compliance Note
Guaranteed patient growth या medical outcome claim न करें।`,

    tools: `# AI Tool Advisor
${context}

## Recommended Stack
- Landing page: Framer / Webflow / Next.js depending on team comfort
- Lead capture: Tally or Typeform
- WhatsApp follow-up: Interakt / WATI after compliance review
- CRM: Airtable or HubSpot free tier
- Content planning: Notion calendar

## Setup Sequence
1. Lead magnet checklist बनाएं।
2. Landing page पर clear disclaimer जोड़ें।
3. Form में city, floor-plan status और consultation goal पूछें।
4. WhatsApp follow-up templates approve करें।
5. Payment provider abstraction रखें; Razorpay key मिलने पर activate करें।

## Security
Birth details, floor plans and client screenshots private data हैं। Public sharing default off रखें।`,

    prompt: `# AI Build Prompt Generator
${context}

## Prompt For Codex / Lovable
Build a Hindi-first lead magnet landing page for “Clinic Vastu Clarity Blueprint”. The page should collect name, city, clinic type, renovation stage, floor-plan availability and WhatsApp number. Use premium midnight indigo, antique gold and warm ivory styling. Include sections for problem, process, deliverables, ethical disclaimer, FAQ and booking CTA. Do not include fake testimonials or guaranteed business/health outcomes. Store leads securely and create an admin view to export CSV.

## Acceptance Criteria
- Mobile-first form
- Hindi default with Hinglish option
- Consent checkbox
- Private data warning
- Thank-you page with next-step WhatsApp copy`,

    guide: `# Ask Gargi AI
${context}

## मेरा सुझाव
आप पहले “Clinic Vastu Clarity Blueprint” को primary offer बनाइए, क्योंकि इसमें tangible deliverables और urgent buying trigger दोनों हैं।

## यह आपके लिए क्यों सही है
आपकी experience floor-plan review और practical corrections में है। Premium client verbal advice से अधिक written clarity चाहता है।

## इसे कैसे लागू करें
आज niche approve करें, फिर एक sample anonymized report template बनाएं और 7-day content calendar से 3 Reels publish करें।

## आज का अगला कदम
Script Studio खोलकर “renovation mistakes” Reel generate करें और CTA रखें: comment “CLINIC”.`,
  };

  return outputs[area] || outputs.guide;
}
