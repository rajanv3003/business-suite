# Gargi Sutra

Hindi-first AI business operating system for astrologers, numerologists, Vastu consultants and occult professionals. The app focuses on the core path:

Business Kundli -> High Impact Problem -> Million Dollar Market -> Customer Type -> Package & Price -> Panchang Content -> SM Viral Content.

## What Works

- Premium Hindi-first dashboard with daily cosmic card and next action.
- Guided परिचय मंडल onboarding.
- Server-side Gemini/OpenAI generation with deterministic fallback.
- Editable generated assets with draft and approve workflow.
- Demo profile for Meera Sharma, a Vastu consultant.
- Core module routes for Business Kundli, High Impact Problem, Million Dollar Market, Customer Type, Package & Price, Panchang Content, SM Viral Content, AI Tools, App Prompt and Talk to Gargi.
- Documentation for architecture, AI agents, Panchang provider, admin, deployment and privacy.

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Use `.env.local` for real keys. Keep secrets server-side only.

```bash
GEMINI_API_KEY=""
GEMINI_MODEL="gemini-2.5-flash"
OPENAI_API_KEY=""
CHAT_MODEL="gpt-4.1-mini"
```

If a live provider fails, `/api/generate` returns a local fallback output and shows the fallback reason.

## Important Files

- `src/app/page.tsx` - Hindi dashboard.
- `src/components/Sidebar.tsx` - desktop and mobile navigation.
- `src/components/AgentWorkspace.tsx` - shared generation workspace.
- `src/lib/profile.ts` - demo profile, module progress and asset model.
- `src/lib/ai-provider.ts` - server-side provider abstraction.
- `src/lib/agent-prompts.ts` - Gargi agent instructions and guardrails.
- `src/lib/agent-generators.ts` - fallback outputs.

## Known Limitations

- Authentication, Supabase/PostgreSQL persistence, RLS and payments are documented but not wired yet.
- Panchang uses demo/fallback content until a verified provider or admin-uploaded calendar data is configured.
- Admin surfaces still need database-backed roles.
- PDF/DOCX/CSV exports are planned next.
