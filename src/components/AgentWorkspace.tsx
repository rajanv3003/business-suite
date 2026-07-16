"use client";

import { useMemo, useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import { createAsset, WorkspaceArea } from "@/lib/profile";
import { ArrowLeft, BadgeCheck, Check, Copy, FileCheck2, Loader2, RadioTower, RefreshCw, Save, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

interface AgentWorkspaceProps {
  area: WorkspaceArea;
  title: string;
  subtitle: string;
  questions: { id: string; label: string; placeholder: string }[];
}

export function AgentWorkspace({ area, title, subtitle, questions }: AgentWorkspaceProps) {
  const { profile, update } = useProfile();
  const existing = useMemo(() => profile.assets.find((asset) => asset.area === area), [profile.assets, area]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [output, setOutput] = useState(existing?.content || "");
  const [phase, setPhase] = useState<"idle" | "generating" | "ready">(existing ? "ready" : "idle");
  const [copied, setCopied] = useState(false);
  const [runMeta, setRunMeta] = useState<{ mode: string; provider: string; model: string; elapsedMs?: number; warning?: string } | null>(null);
  const [error, setError] = useState("");

  const run = async () => {
    setPhase("generating");
    setError("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ area, profile, answers, live: true }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Agent generation failed");
      setOutput(data.output);
      setRunMeta({
        mode: data.mode,
        provider: data.provider,
        model: data.model,
        elapsedMs: data.elapsedMs,
        warning: data.warning,
      });
      setPhase("ready");
    } catch (runError) {
      setError(runError instanceof Error ? runError.message : "Agent generation failed");
      setPhase(output ? "ready" : "idle");
    }
  };

  const saveDraft = (status: "draft" | "approved") => {
    const asset = createAsset(area, title, output);
    asset.status = status;
    const assets = [asset, ...profile.assets.filter((item) => !(item.area === area && item.status !== "archived"))];
    update({
      assets,
      approvedAssetIds: status === "approved" ? { ...profile.approvedAssetIds, [area]: asset.id } : profile.approvedAssetIds,
      progress: { ...profile.progress, [area]: status === "approved" ? 100 : Math.max(profile.progress[area], 70) },
    });
  };

  return (
    <div className="relative z-10 min-h-screen p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-accent-gold">
          <ArrowLeft size={16} />
          Dashboard पर वापस
        </Link>

        <div className="agent-header mb-6 rounded-xl p-5 lg:p-6">
          <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="status-pill status-pill-live">
                <RadioTower size={13} />
                Live specialist agent
              </span>
              <span className="status-pill">
                <ShieldCheck size={13} />
                Proof-safe output
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-text-primary lg:text-4xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">{subtitle}</p>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="metric-card rounded-lg p-4">
              <p className="text-xs text-text-secondary">Asset progress</p>
              <p className="mt-1 text-2xl font-black text-accent-gold">{profile.progress[area]}%</p>
            </div>
            <div className="metric-card rounded-lg p-4">
              <p className="text-xs text-text-secondary">Provider mode</p>
              <p className="mt-1 text-sm font-bold text-text-primary">{runMeta ? runMeta.provider : "Ready"}</p>
            </div>
            <div className="metric-card rounded-lg p-4">
              <p className="text-xs text-text-secondary">Approved state</p>
              <p className="mt-1 text-sm font-bold text-text-primary">{existing?.status === "approved" ? "Approved" : "Draft"}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="surface premium-panel rounded-xl p-5">
            <h2 className="text-lg font-bold text-text-primary">Guided Inputs</h2>
            <p className="mt-1 text-sm leading-6 text-text-secondary">
              Agent पहले saved Business Kundli पढ़ता है। ये answers सिर्फ इस run को sharpen करते हैं।
            </p>
            <div className="mt-5 space-y-4">
              {questions.map((question) => (
                <label key={question.id} className="block">
                  <span className="mb-2 block text-sm font-semibold text-text-primary">{question.label}</span>
                  <textarea
                    className="input-field min-h-24"
                    placeholder={question.placeholder}
                    value={answers[question.id] || ""}
                    onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
                  />
                </label>
              ))}
            </div>
            <button onClick={run} disabled={phase === "generating"} className="primary-button mt-5 flex w-full items-center justify-center gap-2 px-5 py-3">
              {phase === "generating" ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              {output ? "Regenerate करें" : "Asset Generate करें"}
            </button>
            <div className="mt-4 rounded-lg border border-accent-gold/15 bg-accent-gold/7 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-accent-gold">
                <FileCheck2 size={16} />
                Authority checks
              </p>
              <ul className="mt-2 space-y-2 text-xs leading-5 text-text-secondary">
                <li>Specific audience और offer fit</li>
                <li>Proof claims verification के लिए marked</li>
                <li>No manipulative या fear-based claims</li>
                <li>Clear अगला कदम included</li>
              </ul>
            </div>
            {runMeta ? (
              <div className="mt-4 rounded-lg border border-accent-cyan/15 bg-accent-cyan/6 p-4">
                <p className="text-sm font-bold text-accent-cyan">{runMeta.mode === "live" ? "Live agent" : "Fallback mode"}</p>
                <p className="mt-1 text-xs leading-5 text-text-secondary">
                  Provider: {runMeta.provider}. Model: {runMeta.model}. {runMeta.elapsedMs ? `Elapsed: ${(runMeta.elapsedMs / 1000).toFixed(1)}s.` : ""}
                </p>
                {runMeta.warning ? <p className="mt-2 text-xs text-accent-gold">Fallback reason: {runMeta.warning}</p> : null}
              </div>
            ) : null}
            {error ? (
              <div className="mt-4 rounded-lg border border-accent-red/20 bg-accent-red/8 p-4 text-sm text-accent-red">
                {error}
              </div>
            ) : null}
          </section>

          <section className="surface result-panel rounded-xl p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-text-primary">Generated Result</h2>
              {existing?.status === "approved" ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent-green/10 px-3 py-1 text-xs font-bold text-accent-green">
                  <BadgeCheck size={14} /> Approved
                </span>
              ) : null}
            </div>
            {phase === "generating" ? (
              <div className="agent-loading grid min-h-[520px] place-items-center rounded-lg border border-white/8 bg-white/3">
                <div className="text-center">
                  <Loader2 className="mx-auto animate-spin text-accent-gold" size={30} />
                  <p className="mt-4 text-sm font-semibold text-text-primary">Business Kundli analyse हो रही है</p>
                  <p className="mt-1 text-xs text-text-secondary">Proof और ethical claims cross-check हो रहे हैं।</p>
                </div>
              </div>
            ) : output ? (
              <>
                <textarea className="input-field min-h-[520px] font-mono text-sm leading-6" value={output} onChange={(event) => setOutput(event.target.value)} />
                <div className="mt-4 flex flex-wrap gap-2">
                  <button onClick={() => saveDraft("draft")} className="secondary-button inline-flex items-center gap-2 px-4 py-2.5 text-sm">
                    <Save size={16} /> Draft save
                  </button>
                  <button onClick={() => saveDraft("approved")} className="primary-button inline-flex items-center gap-2 px-4 py-2.5 text-sm">
                    <Check size={16} /> Approve
                  </button>
                  <button
                    onClick={async () => {
                      await navigator.clipboard.writeText(output);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1200);
                    }}
                    className="secondary-button inline-flex items-center gap-2 px-4 py-2.5 text-sm"
                  >
                    <Copy size={16} /> {copied ? "Copied" : "Copy"}
                  </button>
                  <button onClick={run} className="secondary-button inline-flex items-center gap-2 px-4 py-2.5 text-sm">
                    <RefreshCw size={16} /> Regenerate
                  </button>
                </div>
              </>
            ) : (
              <div className="grid min-h-[520px] place-items-center rounded-lg border border-dashed border-white/10 p-8 text-center">
                <div>
                  <Sparkles className="mx-auto text-text-secondary" size={32} />
                  <p className="mt-3 text-sm font-semibold text-text-primary">Output अभी ready नहीं है</p>
                  <p className="mt-1 text-sm text-text-secondary">Guided questions भरकर asset generate करें।</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
