# Gargi Sutra Implementation Plan

## Phase 1 - Working Core
- Convert existing Next.js app into Hindi-first Gargi Sutra.
- Keep local demo persistence through `localStorage`.
- Add core journey routes: Business Kundli, Niche, Persona, Offer, Calendar, Script, Tools, Build Prompt and Ask Gargi AI.
- Use server-side `/api/generate` with Gemini/OpenAI provider abstraction and local fallback.

## Phase 2 - Production Foundation
- Replace local persistence with Supabase auth, PostgreSQL and row-level security.
- Add migrations for users, profiles, niches, personas, offers, calendar items, scripts, tool catalogue and generations.
- Add admin-managed knowledge base and tool catalogue.

## Phase 3 - Panchang Provider
- Keep `DemoPanchangProvider` for development.
- Add configurable production provider, admin CSV/JSON upload and editorial review status.
- Cache city/timezone specific records.

## Phase 4 - QA And Launch
- Add Playwright journeys for onboarding, generation, save/approve and mobile navigation.
- Add export flows for PDF/Markdown/CSV.
- Add deployment configuration and protected environment variables.
