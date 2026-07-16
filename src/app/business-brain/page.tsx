"use client";

import { useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import { demoProfile } from "@/lib/profile";
import { Database, RotateCcw, Save } from "lucide-react";

const sections = [
  ["Practitioner", "practitioner"],
  ["Current Business", "business"],
  ["Expertise", "expertise"],
  ["Audience", "audience"],
  ["Proof", "proof"],
  ["Preferences", "preferences"],
] as const;

export default function BusinessBrainPage() {
  const { profile, update, reset } = useProfile();
  const [draft, setDraft] = useState(JSON.stringify(profile, null, 2));
  const [message, setMessage] = useState("");

  const save = () => {
    try {
      update(JSON.parse(draft));
      setMessage("Business Brain saved.");
    } catch {
      setMessage("JSON is invalid. Fix it before saving.");
    }
  };

  return (
    <div className="relative z-10 min-h-screen p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent-gold">Source Of Truth</p>
            <h1 className="mt-2 text-3xl font-black text-text-primary">Business Brain</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
              Review and edit the central profile reused across positioning, offer, funnel, sales and roadmap agents.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={save} className="primary-button inline-flex items-center gap-2 px-4 py-2.5 text-sm">
              <Save size={16} /> Save JSON
            </button>
            <button
              onClick={() => {
                update(demoProfile());
                setDraft(JSON.stringify(demoProfile(), null, 2));
              }}
              className="secondary-button inline-flex items-center gap-2 px-4 py-2.5 text-sm"
            >
              <Database size={16} /> Load demo
            </button>
            <button
              onClick={() => {
                reset();
                setMessage("Local profile reset. Reload to restore demo defaults.");
              }}
              className="secondary-button inline-flex items-center gap-2 px-4 py-2.5 text-sm"
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>

        {message ? <div className="mb-4 rounded-lg border border-accent-gold/20 bg-accent-gold/8 p-3 text-sm text-accent-gold">{message}</div> : null}

        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="surface rounded-xl p-5">
            <h2 className="text-lg font-bold text-text-primary">Profile Sections</h2>
            <div className="mt-4 space-y-3">
              {sections.map(([label, key]) => (
                <div key={key} className="soft-surface rounded-lg p-4">
                  <p className="text-sm font-bold text-text-primary">{label}</p>
                  <p className="mt-2 line-clamp-3 text-xs leading-5 text-text-secondary">
                    {JSON.stringify(profile[key], null, 2)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="surface rounded-xl p-5">
            <h2 className="text-lg font-bold text-text-primary">Editable JSON</h2>
            <textarea className="input-field mt-4 min-h-[720px] font-mono text-xs leading-5" value={draft} onChange={(event) => setDraft(event.target.value)} />
          </section>
        </div>
      </div>
    </div>
  );
}
