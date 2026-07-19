"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useProfile } from "@/context/ProfileContext";
import { areas, completion } from "@/lib/profile";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Gem,
  MessageCircle,
  MoonStar,
  Send,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";

const prompts = [
  "Build my full astro business path",
  "What should I post today using Panchang?",
  "Create my consultation package and price",
  "Write a Codex build prompt for my astrology app",
];

type ChatMessage = {
  role: "guide" | "user";
  content: string;
  meta?: string;
};

const copy = {
  english: {
    greeting: "Hi, I’m Gargi.",
    intro: "Tell me what you want to improve today. I’ll respond like a thoughtful guide, not like a copy-paste bot.",
    placeholder: "Ask Gargi about content, market, package, Panchang or app prompt...",
    typing: "Gargi is typing",
    feedback: "What should I improve in this answer?",
    quick: "Quick questions",
    quest: "Your Work Steps",
    partners: "Highlighted ecosystem logos",
  },
  hindi: {
    greeting: "Hi, I’m Gargi.",
    intro: "आज क्या improve करना है बताइए. मैं copy-paste bot की तरह नहीं, एक thoughtful guide की तरह जवाब दूंगी.",
    placeholder: "Content, market, package, Panchang या app prompt के बारे में पूछें...",
    typing: "Gargi is typing",
    feedback: "इस answer में क्या improve करूं?",
    quick: "Quick questions",
    quest: "Your Work Steps",
    partners: "Highlighted ecosystem logos",
  },
};

export default function Dashboard() {
  const { profile, updateNested } = useProfile();
  const language = profile.preferences.language || "english";
  const t = copy[language];
  const total = completion(profile);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "guide",
      content:
        "I can build the complete astro business path for you: Business Kundli, Million Dollar Market, Customer Type, Package & Price, Panchang Content, SM Viral Content and App Prompt. Ask in one line and I will answer in a clear step-by-step way.",
      meta: "Gargi",
    },
  ]);
  const [chatError, setChatError] = useState("");

  const nextArea = useMemo(() => areas.find((area) => profile.progress[area.id] < 70) || areas[1], [profile.progress]);

  const ask = async (text: string) => {
    const question = text.trim();
    if (!question || isTyping) return;
    setMessages((current) => [...current, { role: "user", content: question }]);
    setInput("");
    setChatError("");
    setIsTyping(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          area: "guide",
          profile,
          answers: {
            question,
            constraint:
              "Answer like the Gargi astro business agent. Give a professional, systematic, customer-friendly response in simple words. Include Business Kundli, Million Dollar Market, Customer Type, Package & Price, Panchang Content, SM Viral Content, CTA and App Prompt guidance when relevant.",
          },
          live: true,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Gargi agent failed");
      setMessages((current) => [
        ...current,
        {
          role: "guide",
          content: data.output,
          meta: data.mode === "live" ? `${data.provider} · ${data.model}` : "Local fallback agent",
        },
      ]);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Gargi agent failed";
      setChatError(message);
      setMessages((current) => [
        ...current,
        {
          role: "guide",
          content:
            "I could not reach the live agent, but the fallback path is still clear: complete Business Kundli first, then generate Million Dollar Market, Customer Type, Package & Price, Panchang Content, SM Viral Content and App Prompt in that order.",
          meta: "Fallback guidance",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderGuideOutput = (content: string) => {
    const sections = content
      .split(/\n##\s+/)
      .map((section, index) => (index === 0 ? section.replace(/^#\s*/, "") : section))
      .map((section) => {
        const [title, ...rest] = section.split("\n");
        return { title: title.trim(), body: rest.join("\n").trim() };
      })
      .filter((section) => section.title || section.body);

    if (sections.length <= 1) {
      return <p className="whitespace-pre-wrap text-sm leading-6 text-text-secondary">{content}</p>;
    }

    return (
      <div className="grid gap-3">
        {sections.map((section, index) => (
          <article key={`${section.title}-${index}`} className="answer-card">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-text-secondary">{index === 0 ? "Gargi Answer" : section.title}</p>
            {index === 0 ? <h3 className="mt-1 text-lg font-black text-text-primary">{section.title}</h3> : null}
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-text-secondary">{section.body}</p>
          </article>
        ))}
      </div>
    );
  };

  return (
    <div className="relative z-10 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto grid max-w-7xl gap-5 xl:grid-cols-[1fr_380px]">
        <main className="surface premium-panel overflow-hidden rounded-xl">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border-default bg-white/70 p-5 lg:p-6">
            <div className="flex items-center gap-4">
              <Image src="/brand/gargi-ai-universe.jpg" alt="Gargi Sutra logo" width={64} height={64} className="h-16 w-16 rounded-full border border-accent-gold/30 object-cover shadow-lg" priority />
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="status-pill status-pill-live"><Gem size={13} /> Official Gargi workspace</span>
                  <span className="status-pill"><ShieldCheck size={13} /> Responsible guidance</span>
                  <span className="status-pill"><MoonStar size={13} /> Occult business OS</span>
                </div>
                <h1 className="mt-3 font-serif text-3xl font-black leading-tight text-text-primary lg:text-5xl">
                  Chat with Gargi about your occult business.
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
                  A WhatsApp-style advisor for astrology, Vastu, numerology, Tarot and spiritual consulting. Clear answers, expert structure, and gentle follow-up questions.
                </p>
              </div>
            </div>
            <div className="inline-flex rounded-full border border-border-default bg-white/80 p-1 shadow-sm">
              <button onClick={() => updateNested("preferences", { language: "english" })} className={`rounded-full px-4 py-2 text-sm font-bold ${language === "english" ? "bg-text-primary text-white" : "text-text-secondary"}`}>English</button>
              <button onClick={() => updateNested("preferences", { language: "hindi" })} className={`rounded-full px-4 py-2 text-sm font-bold ${language === "hindi" ? "bg-text-primary text-white" : "text-text-secondary"}`}>Hindi</button>
            </div>
          </header>

          <section className="chat-canvas p-4 sm:p-6 lg:p-8">
            <div className="chat-row">
              <Image src="/brand/gargi-ai-universe.jpg" alt="" width={42} height={42} className="chat-avatar" />
              <div className="chat-bubble guide">
                <p className="text-sm font-black text-text-primary">{t.greeting}</p>
                <p className="mt-1 text-sm leading-6 text-text-secondary">{t.intro}</p>
              </div>
            </div>

            {messages.map((message, index) =>
              message.role === "user" ? (
                <div key={`${message.role}-${index}`} className="chat-row user-row">
                  <div className="chat-bubble user">
                    <p className="text-sm font-semibold">{message.content}</p>
                  </div>
                </div>
              ) : (
                <div key={`${message.role}-${index}`} className="chat-row">
                  <Image src="/brand/gargi-ai-universe.jpg" alt="" width={42} height={42} className="chat-avatar" />
                  <div className="chat-bubble guide expert-answer">
                    <div className="mb-4 flex items-center gap-2 text-sm font-black text-accent-gold">
                      <Sparkles size={17} /> {message.meta || "Gargi’s structured reading"}
                    </div>
                    {renderGuideOutput(message.content)}
                    <div className="mt-4 rounded-lg border border-accent-gold/20 bg-accent-gold/8 p-4">
                      <p className="text-sm font-bold text-text-primary">{t.feedback}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {["Make it deeper", "Make it simpler", "Make it more premium", "Turn into content"].map((item) => (
                          <button key={item} onClick={() => ask(item)} className="secondary-button px-3 py-2 text-xs">
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}

            {isTyping ? (
              <div className="chat-row">
                <Image src="/brand/gargi-ai-universe.jpg" alt="" width={42} height={42} className="chat-avatar" />
                <div className="chat-bubble guide typing-bubble">
                  <span>{t.typing}</span>
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            ) : null}

            {chatError ? <div className="rounded-lg border border-accent-red/20 bg-accent-red/8 p-3 text-sm text-accent-red">{chatError}</div> : null}
          </section>

          <footer className="border-t border-border-default bg-white/76 p-4">
            <div className="flex gap-3">
              <input
                className="input-field"
                value={input}
                placeholder={t.placeholder}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && input.trim()) ask(input.trim());
                }}
              />
              <button onClick={() => input.trim() && ask(input.trim())} className="primary-button grid min-h-12 min-w-12 place-items-center px-4" aria-label="Send">
                <Send size={18} />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="py-2 text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">{t.quick}</span>
              {prompts.map((prompt) => (
                <button key={prompt} onClick={() => ask(prompt)} className="secondary-button px-3 py-2 text-xs">
                  {prompt}
                </button>
              ))}
            </div>
          </footer>
        </main>

        <aside className="grid gap-5">
          <section className="surface premium-panel rounded-xl p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-text-secondary">{t.quest}</p>
            <div className="mt-3 flex items-end justify-between">
              <h2 className="text-3xl font-black text-text-primary">{total}%</h2>
              <Link href={nextArea.path} className="text-sm font-black text-accent-gold">Continue <ArrowRight className="inline" size={15} /></Link>
            </div>
            <div className="mt-4 grid gap-2">
              {areas.slice(0, 6).map((area, index) => (
                <Link key={area.id} href={area.path} className="module-tile rounded-lg p-3">
                  <div className="flex items-center gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-gold/12 text-xs font-black text-accent-gold">{index + 1}</span>
                    <span className="flex-1 text-sm font-bold text-text-primary">{area.label}</span>
                    {profile.progress[area.id] >= 70 ? <CheckCircle2 size={15} className="text-accent-green" /> : <span className="text-xs text-text-secondary">{profile.progress[area.id]}%</span>}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="surface premium-panel rounded-xl p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-text-secondary">{t.partners}</p>
            <div className="mt-4 grid gap-3">
              <div className="brand-highlight">
                <Image src="/brand/gargi-ai-universe.jpg" alt="Gargi Sutra" width={64} height={64} className="h-16 w-16 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-black text-text-primary">Gargi Sutra</p>
                  <p className="text-xs text-text-secondary">Primary company logo</p>
                </div>
              </div>
              <div className="brand-highlight">
                <Image src="/brand/make-in-india.png" alt="Make in India" width={80} height={48} className="h-12 w-20 object-contain" />
                <div>
                  <p className="text-sm font-black text-text-primary">Make in India</p>
                  <p className="text-xs text-text-secondary">Highlighted ecosystem mark</p>
                </div>
              </div>
              <div className="brand-highlight">
                <Image src="/brand/startup-india.png" alt="Startup India" width={96} height={48} className="h-12 w-24 object-contain" />
                <div>
                  <p className="text-sm font-black text-text-primary">Startup India</p>
                  <p className="text-xs text-text-secondary">Highlighted ecosystem mark</p>
                </div>
              </div>
            </div>
          </section>

          <section className="surface premium-panel rounded-xl p-5">
            <h2 className="text-lg font-black text-text-primary">Quick Actions</h2>
            <div className="mt-4 space-y-2">
              {[
                ["/offer-alchemist", "Make Package", WandSparkles],
                ["/content-calendar", "Panchang Ideas", CalendarDays],
                ["/script-studio", "Write SM Content", MessageCircle],
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
        </aside>
      </div>
    </div>
  );
}
