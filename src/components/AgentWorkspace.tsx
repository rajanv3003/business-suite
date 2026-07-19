"use client";

import { useMemo, useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import { createAsset, WorkspaceArea } from "@/lib/profile";
import { ArrowLeft, BadgeCheck, Check, Copy, FileCheck2, Loader2, RadioTower, RefreshCw, Save, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface AgentWorkspaceProps {
  area: WorkspaceArea;
  title: string;
  subtitle: string;
  questions: { id: string; label: string; placeholder: string }[];
}

function StructuredOutput({ content }: { content: string }) {
  const sections = content
    .split(/\n##\s+/)
    .map((section, index) => (index === 0 ? section.replace(/^#\s*/, "") : section))
    .map((section) => {
      const [title, ...rest] = section.split("\n");
      return { title: title.trim(), body: rest.join("\n").trim() };
    })
    .filter((section) => section.title || section.body);

  return (
    <div className="grid gap-3">
      {sections.map((section, index) => (
        <article key={`${section.title}-${index}`} className="answer-card">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-text-secondary">
            {index === 0 ? "Gargi Answer" : section.title}
          </p>
          {index === 0 ? <h3 className="mt-1 text-xl font-black text-text-primary">{section.title}</h3> : null}
          <div className="mt-2 whitespace-pre-wrap text-sm leading-7 text-text-secondary">{section.body}</div>
        </article>
      ))}
    </div>
  );
}

export function AgentWorkspace({ area, title, subtitle, questions }: AgentWorkspaceProps) {
  const { profile, update, updateNested } = useProfile();
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
          Back to Home
        </Link>

        <div className="agent-header mb-6 rounded-xl p-5 lg:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex gap-4">
              <Image src="/brand/gargi-ai-universe.jpg" alt="Gargi Sutra" width={64} height={64} className="h-16 w-16 rounded-full border border-accent-gold/30 object-cover shadow-lg" />
              <div>
            <div className="mb-3 flex flex-wrap gap-2">
              <span className="status-pill status-pill-live">
                <RadioTower size={13} />
                Live guide
              </span>
              <span className="status-pill">
                <ShieldCheck size={13} />
                Responsible output
              </span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-text-primary lg:text-4xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">{subtitle}</p>
              </div>
            </div>
            <div className="mt-5 inline-flex rounded-full border border-border-default bg-white/80 p-1 shadow-sm">
              <button
                onClick={() => updateNested("preferences", { language: "english" })}
                className={`rounded-full px-4 py-2 text-sm font-bold ${profile.preferences.language === "english" ? "bg-text-primary text-white" : "text-text-secondary"}`}
              >
                English
              </button>
              <button
                onClick={() => updateNested("preferences", { language: "hindi" })}
                className={`rounded-full px-4 py-2 text-sm font-bold ${profile.preferences.language === "hindi" ? "bg-text-primary text-white" : "text-text-secondary"}`}
              >
              Hindi
              </button>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="metric-card rounded-lg p-4">
              <p className="text-xs text-text-secondary">Progress</p>
              <p className="mt-1 text-2xl font-black text-accent-gold">{profile.progress[area]}%</p>
            </div>
            <div className="metric-card rounded-lg p-4">
              <p className="text-xs text-text-secondary">Output mode</p>
              <p className="mt-1 text-sm font-bold text-text-primary">{runMeta ? runMeta.provider : "Ready"}</p>
            </div>
            <div className="metric-card rounded-lg p-4">
              <p className="text-xs text-text-secondary">Saved state</p>
              <p className="mt-1 text-sm font-bold text-text-primary">{existing?.status === "approved" ? "Approved" : "Draft"}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.78fr_1.22fr]">
          <section className="surface premium-panel rounded-xl p-5">
            <h2 className="text-lg font-bold text-text-primary">Answer These Questions</h2>
            <p className="mt-1 text-sm leading-6 text-text-secondary">
              Give simple, real answers. Gargi will use your profile, language and this page to write the output.
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
              {output ? "Regenerate" : "Create Output"}
            </button>
            <div className="mt-4 rounded-lg border border-accent-gold/15 bg-accent-gold/7 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-accent-gold">
                <FileCheck2 size={16} />
                Quality checks
              </p>
              <ul className="mt-2 space-y-2 text-xs leading-5 text-text-secondary">
                <li>Clear, natural English unless Hindi is selected</li>
                <li>Astrology and occult context stays respectful</li>
                <li>No manipulative or fear-based claims</li>
                <li>Content outputs include hook, solution and CTA</li>
                <li>Next move is practical and easy to follow</li>
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
              <h2 className="text-lg font-bold text-text-primary">Gargi’s Reply</h2>
              {existing?.status === "approved" ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent-green/10 px-3 py-1 text-xs font-bold text-accent-green">
                  <BadgeCheck size={14} /> Approved
                </span>
              ) : null}
            </div>
            {phase === "generating" ? (
              <div className="agent-loading grid min-h-[520px] place-items-center rounded-lg border border-border-default bg-white/70">
                <div className="text-center">
                  <Image src="/brand/gargi-ai-universe.jpg" alt="" width={64} height={64} className="mx-auto h-16 w-16 rounded-full border border-accent-gold/30 object-cover" />
                  <p className="mt-4 text-sm font-semibold text-text-primary">Reading the profile and shaping the guidance</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-text-secondary">Gargi is typing <span className="typing-bubble !p-0 !shadow-none"><i /><i /><i /></span></p>
                </div>
              </div>
            ) : output ? (
              <>
                <div className="min-h-[520px] rounded-lg border border-border-default bg-white/72 p-4">
                  <StructuredOutput content={output} />
                </div>
                <details className="mt-3 rounded-lg border border-border-default bg-white/70 p-3">
                  <summary className="cursor-pointer text-sm font-bold text-text-primary">Edit raw text</summary>
                  <textarea className="input-field mt-3 min-h-64 font-mono text-sm leading-6" value={output} onChange={(event) => setOutput(event.target.value)} />
                </details>
                <div className="mt-4 rounded-lg border border-accent-gold/20 bg-accent-gold/8 p-4">
                  <p className="text-sm font-bold text-text-primary">What feedback should Gargi apply next?</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Make it deeper", "Make it simpler", "Make it more premium", "Add examples"].map((item) => (
                      <button key={item} onClick={() => setAnswers((current) => ({ ...current, feedback: item }))} className="secondary-button px-3 py-2 text-xs">
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
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
                  <p className="mt-3 text-sm font-semibold text-text-primary">No output yet</p>
                  <p className="mt-1 text-sm text-text-secondary">Answer the questions and create your output.</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
