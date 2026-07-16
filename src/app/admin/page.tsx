"use client";

import { useProfile } from "@/context/ProfileContext";
import { areas } from "@/lib/profile";
import { AlertTriangle, BarChart3, KeyRound, ShieldCheck } from "lucide-react";

export default function AdminPage() {
  const { profile } = useProfile();
  const costEstimate = profile.assets.length * 0.04;

  return (
    <div className="relative z-10 min-h-screen p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.2em] text-accent-gold">Local Admin</p>
        <h1 className="mt-2 text-3xl font-black text-text-primary">Admin Panel</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
          MVP control plane for usage, prompt versions, compliance flags, feature limits and generated asset counts.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            ["Users", "1 demo", ShieldCheck],
            ["Generated assets", String(profile.assets.length), BarChart3],
            ["Estimated AI cost", `$${costEstimate.toFixed(2)}`, KeyRound],
            ["Compliance flags", "0 blocking", AlertTriangle],
          ].map(([label, value, Icon]) => {
            const TypedIcon = Icon as typeof ShieldCheck;
            return (
              <div key={label as string} className="surface rounded-xl p-5">
                <TypedIcon className="text-accent-gold" size={22} />
                <p className="mt-4 text-xs text-text-secondary">{label as string}</p>
                <p className="mt-1 text-xl font-bold text-text-primary">{value as string}</p>
              </div>
            );
          })}
        </div>

        <section className="surface mt-4 rounded-xl p-5">
          <h2 className="text-lg font-bold text-text-primary">Feature Limits</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {areas.map((area) => (
              <div key={area.id} className="soft-surface rounded-lg p-4">
                <p className="text-sm font-bold text-text-primary">{area.label}</p>
                <p className="mt-1 text-xs text-text-secondary">Free: 1 draft. Growth: 10 drafts. Pro: unlimited local drafts.</p>
              </div>
            ))}
          </div>
        </section>

        <section className="surface mt-4 rounded-xl p-5">
          <h2 className="text-lg font-bold text-text-primary">Prompt Versions</h2>
          <p className="mt-2 text-sm text-text-secondary">
            Current local prompt pack: <span className="font-semibold text-accent-gold">astro-advisor-v0.1</span>. Production should store prompt
            versions and agent runs in PostgreSQL with role-based admin permissions.
          </p>
        </section>
      </div>
    </div>
  );
}
