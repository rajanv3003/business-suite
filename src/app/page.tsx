"use client";

import Link from "next/link";
import { useProfile } from "@/context/ProfileContext";
import { areas, completion } from "@/lib/profile";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  FileText,
  MapPin,
  MessagesSquare,
  MoonStar,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const stats = [
  ["Niche selected", "Demo: Clinic Vastu"],
  ["Scripts created", "3 ready"],
  ["Calendar city", "Mumbai"],
  ["Exports", "PDF / Markdown"],
];

const recentWork = [
  "Clinic owners के लिए premium Vastu audit",
  "7-day Panchang aligned content plan",
  "Instagram Reel: renovation से पहले 3 checks",
];

export default function Dashboard() {
  const { profile } = useProfile();
  const total = completion(profile);
  const nextArea = areas.find((area) => profile.progress[area.id] < 70) || areas[1];

  return (
    <div className="relative z-10 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <section className="command-hero mb-5 overflow-hidden rounded-xl p-5 sm:p-6 lg:p-7">
          <div className="relative z-10 grid gap-6 xl:grid-cols-[1.18fr_0.82fr] xl:items-end">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="status-pill status-pill-live">
                  <Sparkles size={13} />
                  Hindi-first Business OS
                </span>
                <span className="status-pill">
                  <ShieldCheck size={13} />
                  Ethical claim review
                </span>
                <span className="status-pill">
                  <MoonStar size={13} />
                  Panchang provider ready
                </span>
              </div>
              <p className="text-sm font-semibold text-accent-gold">Powered by Gargi A. Jaitley</p>
              <h1 className="mt-2 max-w-4xl font-serif text-4xl font-black tracking-tight text-text-primary lg:text-5xl">
                नमस्ते, {profile.practitioner.name || "Meera"}। आज आपका Business Growth Path तैयार है।
              </h1>
              <p className="mt-3 max-w-3xl text-base font-medium leading-7 text-text-primary/86">
                Gargi AI Business Sutra™ आपकी occult knowledge को niche, premium offer, Panchang-aligned content और word-by-word scripts में बदलता है।
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={nextArea.path} className="primary-button inline-flex items-center justify-center gap-2 px-5 py-3">
                  अगला कदम: {nextArea.label}
                  <ArrowRight size={18} />
                </Link>
                <Link href="/script-studio" className="secondary-button inline-flex items-center justify-center gap-2 px-5 py-3">
                  आज का Script बनाएं
                </Link>
              </div>
            </div>

            <aside className="authority-panel">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-text-secondary">Daily Cosmic Card</p>
                  <h2 className="mt-2 text-2xl font-black text-text-primary">शुक्ल पक्ष • रोहिणी</h2>
                  <p className="mt-2 text-sm leading-6 text-text-secondary">
                    Demo Panchang data. Production में city, timezone और verified provider से timing आएगी।
                  </p>
                </div>
                <CalendarDays className="text-accent-gold" size={38} />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="soft-surface rounded-lg p-3">
                  <p className="text-xs text-text-secondary">Content Opportunity</p>
                  <p className="mt-1 text-sm font-bold text-text-primary">Renovation से पहले Vastu checklist</p>
                </div>
                <div className="soft-surface rounded-lg p-3">
                  <p className="text-xs text-text-secondary">CTA</p>
                  <p className="mt-1 text-sm font-bold text-text-primary">Comment “CHECKLIST”</p>
                </div>
              </div>
              <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-text-secondary">
                <MapPin size={14} /> समय आपके चुने हुए शहर के अनुसार है।
              </p>
            </aside>
          </div>
        </section>

        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <section className="surface premium-panel rounded-xl p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-text-secondary">Business Kundli Progress</p>
                <h2 className="mt-1 text-2xl font-bold text-text-primary">{total}% journey completed</h2>
              </div>
              <Link href="/onboarding" className="secondary-button inline-flex items-center gap-2 px-4 py-2.5 text-sm">
                परिचय अपडेट करें <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {areas.map((area) => (
                <Link key={area.id} href={area.path} className="module-tile rounded-lg p-4 transition">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-text-primary">{area.label}</p>
                    {profile.progress[area.id] >= 70 ? <BadgeCheck size={15} className="text-accent-green" /> : null}
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/6">
                    <div className="h-full rounded-full bg-gold-gradient" style={{ width: `${profile.progress[area.id]}%` }} />
                  </div>
                  <p className="mt-2 text-xs text-text-secondary">{profile.progress[area.id]}% ready</p>
                </Link>
              ))}
            </div>
          </section>

          <aside className="surface premium-panel rounded-xl p-5">
            <div className="flex items-center gap-3">
              <MessagesSquare className="text-accent-cyan" />
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-text-secondary">Gargi Business Guide</p>
                <h2 className="font-bold text-text-primary">आज का अगला कदम</h2>
              </div>
            </div>
            <div className="mt-5 rounded-lg border border-accent-gold/18 bg-accent-gold/8 p-4">
              <p className="text-sm leading-6 text-text-primary">
                पहले niche को approve करें, फिर उसी persona के लिए premium offer और 7-day content calendar generate करें।
              </p>
              <Link href="/ask-gargi-ai" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent-gold">
                Gargi AI से पूछें <ArrowRight size={15} />
              </Link>
            </div>
            <div className="mt-5 grid gap-2">
              {stats.map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-3 rounded-lg bg-white/4 px-3 py-2">
                  <span className="text-xs text-text-secondary">{label}</span>
                  <span className="text-xs font-bold text-text-primary">{value}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <section className="surface premium-panel rounded-xl p-5 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-text-primary">Recent Work</h2>
              <Link href="/business-brain" className="text-sm font-semibold text-accent-gold">Saved Library</Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {recentWork.map((item) => (
                <div key={item} className="soft-surface rounded-lg p-4">
                  <FileText className="mb-3 text-accent-gold" size={18} />
                  <p className="text-sm font-semibold leading-6 text-text-primary">{item}</p>
                  <p className="mt-2 text-xs text-text-secondary">Demo output • editable</p>
                </div>
              ))}
            </div>
          </section>

          <section className="surface premium-panel rounded-xl p-5">
            <h2 className="text-lg font-bold text-text-primary">Quick Actions</h2>
            <div className="mt-4 space-y-2">
              {[
                ["/offer-alchemist", "नया Offer बनाएं", WandSparkles],
                ["/content-calendar", "आज का Content", CalendarDays],
                ["/build-prompt-generator", "Lovable Prompt", Sparkles],
              ].map(([href, label, Icon]) => {
                const TypedIcon = Icon as typeof Sparkles;
                return (
                  <Link key={href as string} href={href as string} className="secondary-button flex items-center gap-3 px-4 py-3">
                    <TypedIcon size={17} className="text-accent-gold" />
                    <span className="text-sm">{label as string}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
