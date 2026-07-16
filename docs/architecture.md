# Architecture

- Framework: Next.js App Router, React, TypeScript, Tailwind CSS.
- Persistence now: browser `localStorage` demo profile.
- AI: server-only `/api/generate` route calling `src/lib/ai-provider.ts`.
- Fallback: deterministic local generators in `src/lib/agent-generators.ts`.
- Shared UI: `src/components/AgentWorkspace.tsx`.

Production upgrade should add Supabase auth, PostgreSQL tables, storage, row-level security and background generation records.
