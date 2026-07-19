import { BusinessProfile, WorkspaceArea } from "./profile";
import { viralHookPatterns } from "./hook-framework";
import { getPanchangFestivals, lifeGuidanceForFestival, monthKeyFromInput } from "./panchang-festivals";

const money = (value: string) => (value ? `₹${Number(value).toLocaleString("en-IN")}` : "not defined yet");

function buildDatedPanchangCalendar(answers: Record<string, string>) {
  const month = monthKeyFromInput(answers.month || answers.content_month || answers.city);
  const events = getPanchangFestivals(month).slice(0, 7);
  return events
    .map((event, index) => {
      const guidance = lifeGuidanceForFestival(event);
      const hooks = [
        `On ${event.date}, do this for ${guidance.lifeArea}.`,
        `Most people know ${event.name}, but they miss what to do on this day.`,
        `Use ${event.name} for this simple ${guidance.lifeArea.split(",")[0]} reset.`,
        `Before ${event.name}, avoid this one mistake.`,
      ];
      const hook = hooks[index % hooks.length];
      return `Day ${index + 1}: ${event.name}
- Date: ${event.date}, ${event.weekday}
- Panchang context: ${event.name} (${event.lunar})
- Hook: "${hook}"
- Best for: ${guidance.bestFor}.
- What to do: ${guidance.doThis}
- Avoid: ${guidance.avoidThis}
- Astrology/Numerology/Vastu angle: ${event.contentAngle}
- Problem: People ask what the festival means, but they do not know what practical action to take for their life.
- Solution: Give one spiritual action, one practical action and one reflection question.
- Script: "Today is ${event.date}. According to Panchang context, ${event.name} carries the theme of ${event.theme}. This is not just about knowing the festival name. Use this day for ${guidance.bestFor}. Do this: ${guidance.doThis} And avoid this: ${guidance.avoidThis}"
- CTA: ${answers.cta_goal || "DM CLARITY if you want a simple reading."}`;
    })
    .join("\n\n");
}

function methodLabel(profile: BusinessProfile, answers: Record<string, string>) {
  return answers.occult_method || profile.practitioner.categories.join(", ") || "astrology, Vastu or numerology";
}

function buyerLabel(profile: BusinessProfile, answers: Record<string, string>) {
  return answers.buyer_market || answers.preferred || profile.audience.desiredAudience || profile.audience.currentBuyers || "buyers who need clear spiritual guidance before important decisions";
}

export function generateAgentAsset(area: WorkspaceArea, profile: BusinessProfile, answers: Record<string, string>): string {
  const name = profile.practitioner.name || "the practitioner";
  const category = profile.practitioner.categories.join(", ") || "occult practitioner";
  const audience = profile.audience.desiredAudience || profile.audience.currentBuyers || "people seeking spiritual clarity";
  const language = profile.preferences.language || "english";
  const context = `Profile used: ${name} works as a ${category}. Audience: ${audience}. Current fee: ${money(profile.business.currentPrice)}. Preferred language: ${language}. Extra input: ${JSON.stringify(answers)}.`;
  const method = methodLabel(profile, answers);
  const buyer = buyerLabel(profile, answers);
  const pain = answers.pain_pattern || profile.audience.urgentProblems || "confusion, delay and repeated wrong decisions";
  const helpLine = answers.help_line || profile.expertise.problemsSolved || `I help ${buyer} use ${method} to make clearer decisions.`;

  const outputs: Record<string, string> = {
    diagnosis: `# Business Kundli Expert
${context}

## Core Reading
Your practice should feel less like a sales machine and more like a clear spiritual guidance room. The strongest direction is to help clients move from confusion to reflection, using astrology, Vastu, numerology or Tarot as a structured mirror.

## Suggested Quest Move
Choose one clear market for the next 30 days: decision clarity, home/space harmony, name and number alignment, or emotional reflection through Tarot.

## Copy-Ready Output
"I help people use traditional occult wisdom as a calm reflection system, so they can understand their situation, ask better questions and choose their next step with more clarity."

## Boundaries And Safety
Do not promise outcomes in money, health, marriage, legal matters or recovery. Present the work as interpretation and guidance.

## Next Step
Open Million Dollar Market and choose the one customer market that feels most natural to your real experience.`,

    problem: `# High Impact Problem Expert
${context}

## 1. New Tangible Transformation Statement
From ${pain} -> to clearer decisions, stronger self-trust and practical next steps using ${method}.

In simple words:
"${helpLine} The real value is not only the reading. The value is helping the client stop repeating costly decisions and move with clarity."

## 2. Real-World Domain it Impacts
This transformation impacts: business decisions, career direction, property choices, family conversations, renovation planning, founder confidence and daily mental peace.

For ${buyer}, the strongest domain is decision-making under pressure. They are not only buying spiritual knowledge. They are buying clarity before a decision that can affect money, time, reputation, relationships or peace of mind.

## 3. List of Measurable Outcomes
After this work, the client should be able to:
- Identify the real pattern behind the current problem within 1-2 sessions.
- Decide the next practical step without asking ten different people.
- Reduce repeated delay before property, career, business or relationship decisions.
- Create a 30-day action list based on the reading or consultation.
- Track what changed in behavior: focus, communication, planning, timing and follow-through.

## 4. Cost of Inaction (Tangible + Emotional)
If this problem stays unsolved, it can cost the client:
- ₹2-10L in wrong property, renovation, hiring, career or business decisions, depending on the market.
- 6-18 months of delay because they keep waiting for certainty.
- Repeated stress from asking everyone but still not trusting the final decision.
- Damaged confidence because every wrong step feels like personal failure.
- Emotional fatigue from living with doubt, fear and confusion every week.

## 5. High Impact Problems List That People Would Pay Premium For
1. Business owners feel stuck even after working hard and cannot understand the hidden pattern.
2. Clinic or office owners are unsure if their space supports trust, focus and smooth client flow.
3. Career professionals cannot decide whether to switch, stay, start something new or ask for growth.
4. Families delay property, renovation or room decisions because every option feels risky.
5. Founders keep repeating cash-flow stress, team conflict or wrong timing decisions.
6. Couples and families face repeated emotional patterns but do not know how to discuss them calmly.
7. Parents worry about education, direction and confidence but do not want fear-based predictions.
8. Personal brands struggle with name, date, identity and positioning confusion.
9. High-responsibility clients make big decisions from fear instead of a clear process.
10. Spiritual seekers consume too much advice online but still do not know what applies to them.

## 6. Best Premium Problem To Own
Best problem to own for this profile:
"Helping ${buyer} make important decisions with clarity by reading the hidden pattern through ${method} and turning it into a practical 30-day action plan."

Why this can become premium:
- The problem is urgent.
- The buyer can feel the cost of delay.
- The solution can be documented.
- The practitioner can show process, not just prediction.
- The client receives clear next steps, not only information.

## 7. Simple Offer Direction
Offer name:
Decision Clarity Reading

Simple promise:
"In one focused session, we will identify the pattern behind your current confusion, map the timing or space signals, and create a clear next-step plan you can follow for 30 days."

CTA:
DM CLARITY if you want help finding the real problem behind your current decision.`,

    niche: `# Million Dollar Market Finder
${context}

## 1. Primary Promise (P.P.)
Help ${buyer} move from ${pain} to clearer, calmer and more confident decisions using ${method}, with a practical action plan they can follow for the next 30-90 days.

Premium version:
"I help ${buyer} identify the hidden decision pattern behind their current block and turn it into a clear, practical next-step plan using ${method}."

## 2. Emotionally Compelling (E.C.)
Primary emotion: frustration turning into confident clarity.

This buyer is tired of being talented, hardworking or sincere but still feeling stuck. They want someone to help them understand why the same pattern keeps repeating and what to do next without fear, drama or confusing language.

## 3. Your Unique Mechanism (U.M.) - 5 Indian Market Names
A. Decision Dosh Map
- Maps the repeating decision block and shows where the person keeps losing clarity.

B. Lakshmi Flow Check
- Looks at money, space, timing and behavior patterns before big business or property decisions.

C. Karma Pattern Decoder
- Turns repeating life or business patterns into simple observations and next steps.

D. Vastu Profit Path
- For business Vastu: connects office, clinic or home layout observations to client flow, team focus and planning discipline.

E. Kismet Clarity Method
- Helps clients stop blaming luck and start seeing the specific timing, behavior and decision pattern they can work with.

## 4. Best Buyer Segment
Recommended first market:
${buyer}

Why:
- They already feel urgency.
- Their decisions have money, time or reputation attached.
- They can understand the value of a structured reading.
- They are more likely to pay for clarity when the output is documented.

## 5. High Impact Problem
The premium problem is:
"I am making important decisions with doubt, fear or repeated confusion, and it is costing me money, time, confidence and peace."

For this niche, do not sell only ${method}. Sell the resolution of a costly decision pattern.

## 6. Proof Needed
To make this premium, collect:
- Before/after clarity notes from clients.
- Screenshots only with consent.
- Case examples without private birth details or private floor plans.
- A simple checklist that shows your process.
- A written summary format after every consultation.

## 7. Next Action
Create one offer around the best problem:
"Decision Clarity Reading for ${buyer}"

Then create three posts:
1. "3 mistakes ${buyer} make before taking guidance."
2. "The hidden cost of delaying one important decision."
3. "Before you blame luck, check this one pattern."`,

    persona: `# Customer Type Expert
${context}

## Core Reading
Your best customer is not just someone who can pay. They are someone who has a clear worry, respects spiritual guidance and wants simple next steps without fear, drama or pressure.

## Suggested Quest Move
Create content for "The Thoughtful Seeker": a person who respects tradition, wants clarity, and prefers a calm practitioner over sensational claims.

## Copy-Ready Output
The Thoughtful Seeker is asking:
- What is the meaning behind this pattern?
- What should I pay attention to before I decide?
- Can this be explained without fear?
- What can I do practically after the consultation?

## Boundaries And Safety
Do not exploit anxiety. Invite reflection and informed choice.

## Next Step
Turn this customer type into one simple consultation package.`,

    offer: `# Package And Price Expert
${context}

## Core Reading
A package should be easy to understand in one minute. The customer should know what they get, how the session works, what support comes after and what the price is based on.

## Suggested Quest Move
Create a "Clarity Reading Session" with an intake form, focused reading, written summary and one follow-up reflection.

## Copy-Ready Output
Offering name: The Clarity Reading
Flow:
1. Intention setting questionnaire
2. 60-90 minute focused consultation
3. Key insights and reflective notes
4. Practical next-step list
5. One follow-up check-in

Suggested price logic: Start from your current fee of ${money(profile.business.currentPrice)} and increase only when you add preparation, written notes and follow-up support.

## Boundaries And Safety
No guaranteed outcomes. The value is clarity, structure and grounded reflection.

## Next Step
Create a short content piece explaining what happens inside this reading.`,

    calendar: `# Panchang Content Planner
${context}

## Core Reading
The calendar should use real 2026 Panchang dates for ${monthKeyFromInput(answers.month || answers.content_month || answers.city)}, but the content must focus on what the viewer should do for life improvement. Do not make festival explanation the main content. Every idea needs a date, Panchang context, best-for action, what to do, what to avoid, hook, solution and CTA.

## Suggested Quest Move
Dated content ritual:
${buildDatedPanchangCalendar(answers)}

## Boundaries And Safety
These are 2026 festival/date-based content ideas. Exact Panchang timings and city-specific muhurat should still be verified before making timing claims.

## Next Step
Open SM Viral Content and turn Day 1 into a Reel.`,

    script: `# SM Viral Content Writer
${context}

## Core Reading
The script should sound like a real practitioner speaking simply. Start with a mistake or myth, explain the problem, give a useful solution and end with a clear CTA.

## Copy-Ready Output
On-screen title: 3 astrology myths people still believe

Hook:
"3 astrology myths people still believe before booking a reading."

Panchang angle:
Use today's Panchang mood as a reminder to pause before deciding from fear. This is inspiration only; exact Panchang timing should be verified for the city.

Named method:
The Calm Reading Check

Solution:
1. Do not treat astrology as a fixed guarantee.
2. Do not book a reading only when you are panicking.
3. Do not follow remedies without understanding the actual issue.

Script:
"Three astrology myths people still believe. First, astrology will tell you a fixed future. No. A good reading helps you understand pattern and timing. Second, you should book a reading only when you are scared. No. It is better to come when you are ready to understand clearly. Third, one remedy will solve everything. No. First understand the issue, then choose the right step. Astrology should not create fear. It should give you clarity."

Caption:
Astrology should not scare you. A good reading should help you understand your pattern, your timing and your next step.

CTA:
DM CLARITY if you want a calm astrology reading.

## Boundaries And Safety
This script avoids guaranteed outcomes and fear-based claims.

## Next Step
Record it slowly, keep the title visible for muted viewers, and put the CTA on screen in the final 3 seconds.

## Hook Pattern Bank
${viralHookPatterns}`,

    tools: `# AI Tools Guide
${context}

## Core Reading
Keep the tool stack simple. A spiritual practitioner needs clarity, not a complicated dashboard.

## Suggested Quest Move
Use:
- Notion for saved readings and content ideas
- Tally for intake forms
- Google Drive for documents
- Canva for elegant carousels
- WhatsApp Business for follow-up

## Boundaries And Safety
Protect birth details, floor plans, screenshots and client messages as private data.

## Next Step
Create one intake form before adding automation.`,

    prompt: `# App Prompt Writer
${context}

## Copy-Ready Output
Build a light luxury landing page for an occult guidance practice. The page should feel calm, premium and easy to understand. Use a white and pearl background, champagne-gold accents, deep ink text and subtle celestial details. Include sections for: practice philosophy, types of readings, what happens inside a session, responsible disclaimer, intake form and booking CTA. Do not include fake testimonials, income claims or guaranteed outcomes.

## Next Step
Use this prompt in Codex, Lovable or another builder and keep the first version simple.`,

    guide: `# Talk to Gargi
${context}

## Core Reading
Build this as one guided astro business agent, not as separate random tools. The customer should feel that Gargi is taking them from confusion to a complete business plan in a calm, systematic way.

## Suggested Quest Move
Use this order every time:
1. Business Kundli: clarify the practitioner's category, experience, strengths, proof and safest positioning.
2. High Impact Problem: identify the expensive real-life problem, measurable outcome and cost of inaction.
3. Million Dollar Market: choose one clear buyer market such as clinic Vastu, founder astrology, numerology branding or Tarot reflection.
4. Customer Type: define what the customer is worried about, what they want to understand and what language makes them trust the practitioner.
5. Package & Price: create a named consultation with clear deliverables, session flow, written summary, follow-up and ethical boundaries.
6. Panchang Content: use Panchang-style inspiration for daily content themes without inventing exact timings.
7. SM Viral Content: turn one content idea into hook, teaching, reflection, CTA and caption.
8. App Prompt: produce a detailed Codex/build prompt for the app, landing page or consultation tool.

## Copy-Ready Output
"Gargi Sutra helps astrologers, numerologists, Vastu consultants and Tarot readers turn their knowledge into a clear business path: Business Kundli, High Impact Problem, Million Dollar Market, Customer Type, Package & Price, Panchang Content, SM Viral Content and App Prompt."

Content CTA format:
- Reflection CTA: "If this feels familiar, write CLARITY and I will share what to observe next."
- Consultation CTA: "Book a calm reading if you want a structured second lens before your next decision."
- Content CTA: "Save this for your next Panchang-inspired content day."

Hook-script formula:
1. Hook the exact seeker and situation in the first frame.
2. Add Panchang-style context without inventing exact timing.
3. Give a named micro-method.
4. Teach 2-4 steps.
5. End with one CTA button or keyword.

Builder prompt:
"Build a Hindi-first chat-style astro business agent for Gargi Sutra. The first screen must be a working chat, not a landing page. Ask the user to confirm Hindi or English, then guide them through Business Kundli, High Impact Problem, Million Dollar Market, Customer Type, Package & Price, Panchang Content, SM Viral Content, CTA and final App Prompt. Output must be structured, mature, non-fear-based and customer-friendly. Store each generated asset and let the user approve or regenerate it."

## Boundaries And Safety
No guaranteed money, marriage, health, legal or supernatural results. Panchang is used for content inspiration unless verified timing data is provided.

## Next Step
Open Business Kundli first, complete the profile, then use Talk to Gargi to generate the full path.`,
  };

  return outputs[area] || outputs.guide;
}
