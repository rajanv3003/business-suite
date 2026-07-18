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

export function generateAgentAsset(area: WorkspaceArea, profile: BusinessProfile, answers: Record<string, string>): string {
  const name = profile.practitioner.name || "the practitioner";
  const category = profile.practitioner.categories.join(", ") || "occult practitioner";
  const audience = profile.audience.desiredAudience || profile.audience.currentBuyers || "people seeking spiritual clarity";
  const language = profile.preferences.language || "english";
  const context = `Profile used: ${name} works as a ${category}. Audience: ${audience}. Current fee: ${money(profile.business.currentPrice)}. Preferred language: ${language}. Extra input: ${JSON.stringify(answers)}.`;

  const outputs: Record<string, string> = {
    diagnosis: `# Soul Map Guide
${context}

## Core Reading
Your practice should feel less like a sales machine and more like a clear spiritual guidance room. The strongest direction is to help clients move from confusion to reflection, using astrology, Vastu, numerology or Tarot as a structured mirror.

## Suggested Quest Move
Choose one clear practice path for the next 30 days: decision clarity, home/space harmony, name and number alignment, or emotional reflection through Tarot.

## Copy-Ready Output
"I help people use traditional occult wisdom as a calm reflection system, so they can understand their situation, ask better questions and choose their next step with more clarity."

## Boundaries And Safety
Do not promise outcomes in money, health, marriage, legal matters or recovery. Present the work as interpretation and guidance.

## Next Step
Open Path Finder and choose the one practice path that feels most natural to your real experience.`,

    niche: `# Practice Path Finder
${context}

## Core Reading
Instead of "high-ticket niches", think in terms of practice paths. A path should be specific enough to guide content, but gentle enough to feel authentic.

## Suggested Quest Move
1. Career and timing clarity for professionals
2. Vastu harmony for homes, clinics and offices
3. Numerology for names, identity and brand alignment
4. Tarot reflection for relationship and emotional clarity
5. Spiritual planning for founders and creators

Recommended first path: Vastu harmony for homes, clinics and offices, because it can be explained visually and turned into clear checklists.

## Copy-Ready Output
"My work focuses on space, direction and practical harmony. I help clients look at their home, clinic or office through Vastu principles and leave with a clear, respectful action list."

## Boundaries And Safety
Avoid claiming that Vastu guarantees wealth, patient flow or family peace.

## Next Step
Select one path and create a client avatar for it.`,

    persona: `# Client Avatar Reader
${context}

## Core Reading
Your ideal client is not just someone who can pay. They are someone who wants spiritual insight without fear, drama or pressure.

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
Turn this avatar into one gentle offering.`,

    offer: `# Offering Craft Guide
${context}

## Core Reading
An offering should feel like a guided ritual with a clear beginning, middle and end. It should not sound like a forced business package.

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

    calendar: `# Cosmic Calendar Keeper
${context}

## Core Reading
The calendar should use real 2026 Panchang dates for ${monthKeyFromInput(answers.month || answers.content_month || answers.city)}, but the content must focus on what the viewer should do for life improvement. Do not make festival explanation the main content. Every idea needs a date, Panchang context, best-for action, what to do, what to avoid, hook, solution and CTA.

## Suggested Quest Move
Dated content ritual:
${buildDatedPanchangCalendar(answers)}

## Boundaries And Safety
These are 2026 festival/date-based content ideas. Exact Panchang timings and city-specific muhurat should still be verified before making timing claims.

## Next Step
Open Content Spellbook and turn Day 1 into a Reel.`,

    script: `# Content Spellbook Writer
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

    tools: `# Tool Oracle
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

    prompt: `# Builder Scroll Scribe
${context}

## Copy-Ready Output
Build a light luxury landing page for an occult guidance practice. The page should feel calm, premium and easy to understand. Use a white and pearl background, champagne-gold accents, deep ink text and subtle celestial details. Include sections for: practice philosophy, types of readings, what happens inside a session, responsible disclaimer, intake form and booking CTA. Do not include fake testimonials, income claims or guaranteed outcomes.

## Next Step
Use this prompt in Codex, Lovable or another builder and keep the first version simple.`,

    guide: `# Gargi Business Guide
${context}

## Core Reading
Build this as one guided astro business agent, not as separate random tools. The customer should feel that Gargi is taking them from confusion to a complete business plan in a calm, systematic way.

## Suggested Quest Move
Use this order every time:
1. Business Kundli: clarify the practitioner's category, experience, strengths, proof and safest positioning.
2. Niche: choose one practical path such as clinic Vastu, founder astrology, numerology branding or Tarot reflection.
3. Customer Persona: define what the client is worried about, what they want to understand and what language makes them trust the practitioner.
4. Premium Offer: create a named consultation with clear deliverables, session flow, written summary, follow-up and ethical boundaries.
5. 7-Day Panchang Calendar: use Panchang-style inspiration for daily content themes without inventing exact timings.
6. Viral Script: turn one content idea into hook, teaching, reflection, CTA and caption.
7. Builder Prompt: produce a detailed Codex/build prompt for the app, landing page or consultation tool.

## Copy-Ready Output
"Gargi Sutra helps occult professionals turn their wisdom into a clear business path: first the Business Kundli, then niche, persona, offer, Panchang content, scripts and build prompts. The tone stays mature, premium and easy for customers to understand."

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
"Build a Hindi-first chat-style astro business agent for Gargi Sutra. The first screen must be a working chat, not a landing page. Ask the user to confirm Hindi or English, then guide them through Business Kundli, niche, persona, premium offer, 7-day Panchang content calendar, viral script, CTA and final build prompt. Output must be structured, mature, non-fear-based and customer-friendly. Store each generated asset and let the user approve or regenerate it."

## Boundaries And Safety
No guaranteed money, marriage, health, legal or supernatural results. Panchang is used for content inspiration unless verified timing data is provided.

## Next Step
Open Business Kundli first, complete the profile, then ask Gargi Guide to generate the full path.`,
  };

  return outputs[area] || outputs.guide;
}
