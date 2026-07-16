"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/context/ProfileContext";
import { BusinessProfile } from "@/lib/profile";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";

const questions = [
  { path: "practitioner.name", label: "आपका नाम क्या है?", placeholder: "Meera Sharma" },
  { path: "practitioner.businessName", label: "आपका Business या Brand Name क्या है?", placeholder: "Meera Vastu Guidance" },
  { path: "practitioner.categories", label: "आपकी मुख्य Expertise क्या है?", placeholder: "Vastu consultant, numerologist, tarot reader..." },
  { path: "practitioner.experienceYears", label: "आपको इस क्षेत्र में कितने वर्षों का अनुभव है?", placeholder: "8" },
  { path: "business.currentRevenue", label: "आपकी औसत monthly income कितनी है? Optional और private.", placeholder: "180000" },
  { path: "business.targetRevenue", label: "आप आगे कितना revenue generate करना चाहते हैं?", placeholder: "700000" },
  { path: "business.currentPrice", label: "आपकी current consultation fee कितनी है?", placeholder: "7500" },
  { path: "business.leadSources", label: "Leads अभी कहाँ से आते हैं?", placeholder: "Referrals, Instagram, WhatsApp..." },
  { path: "expertise.problemsSolved", label: "Clients आपके पास सबसे अधिक किस problem के लिए आते हैं?", placeholder: "Clinic layout, renovation, business name..." },
  { path: "expertise.uniqueProcess", label: "आपका unique framework, method या process क्या है?", placeholder: "Floor-plan review plus priority correction matrix..." },
  { path: "audience.desiredAudience", label: "आप किस प्रकार के premium clients के साथ काम करना चाहते हैं?", placeholder: "Clinic owners, premium homeowners..." },
  { path: "audience.objections", label: "Prospects कौन-सी objections raise करते हैं?", placeholder: "Demolition लगेगा? Online enough है? Price high है?" },
  { path: "proof.testimonials", label: "आपके पास कौन-सा proof है?", placeholder: "Consent testimonials, screenshots, case studies..." },
  { path: "preferences.businessModels", label: "आप कौन-सा business model बनाना चाहते हैं?", placeholder: "Premium consultation, group program, course, membership..." },
];

function getValue(source: Record<string, unknown>, path: string) {
  return path.split(".").reduce<unknown>((value, key) => (value as Record<string, unknown>)?.[key], source) || "";
}

function setValue<T extends Record<string, unknown>>(source: T, path: string, value: string): T {
  const [group, key] = path.split(".");
  const currentGroup = source[group] as Record<string, unknown>;
  return {
    ...source,
    [group]: {
      ...currentGroup,
      [key]: path.endsWith("categories") || path.endsWith("businessModels")
        ? value.split(",").map((item) => item.trim()).filter(Boolean)
        : value,
    },
  };
}

export default function OnboardingPage() {
  const router = useRouter();
  const { profile, update } = useProfile();
  const [step, setStep] = useState(0);
  const question = questions[step];
  const initial = useMemo(() => {
    const value = getValue(profile as unknown as Record<string, unknown>, question.path);
    return Array.isArray(value) ? value.join(", ") : String(value);
  }, [profile, question.path]);
  const [answer, setAnswer] = useState(initial);

  const next = () => {
    const patched = setValue(profile as unknown as Record<string, unknown>, question.path, answer) as unknown as BusinessProfile;
    update({
      ...patched,
      progress: { ...patched.progress, diagnosis: Math.max(30, Math.round(((step + 1) / questions.length) * 70)) },
    });

    if (step === questions.length - 1) {
      update({ progress: { ...patched.progress, diagnosis: 70 } });
      router.push("/business-kundli");
      return;
    }

    const nextStep = step + 1;
    setStep(nextStep);
    const nextValue = getValue(patched as unknown as Record<string, unknown>, questions[nextStep].path);
    setAnswer(Array.isArray(nextValue) ? nextValue.join(", ") : String(nextValue || ""));
  };

  return (
    <div className="relative z-10 min-h-screen p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-text-secondary hover:text-accent-gold">
          <ArrowLeft size={16} />
          Dashboard पर वापस
        </Link>
        <div className="surface rounded-xl p-6 lg:p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent-gold">परिचय मंडल</p>
              <h1 className="mt-2 text-3xl font-black text-text-primary">आपकी Business Kundli तैयार हो रही है</h1>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                यही profile Niche, Persona, Offer, Calendar और Gargi AI Guide का source of truth बनेगी।
              </p>
            </div>
            <div className="grid h-14 w-14 place-items-center rounded-xl bg-accent-gold/10 text-accent-gold">
              <Sparkles size={24} />
            </div>
          </div>

          <div className="mb-6 flex gap-1">
            {questions.map((item, index) => (
              <div key={item.path} className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-gold-gradient" : "bg-white/8"}`} />
            ))}
          </div>

          <label className="block">
            <span className="text-xl font-bold text-text-primary">{question.label}</span>
            <textarea
              className="input-field mt-4 min-h-36 text-base"
              value={answer}
              placeholder={question.placeholder}
              onChange={(event) => setAnswer(event.target.value)}
              autoFocus
            />
          </label>

          <div className="mt-6 flex items-center justify-between">
            <button
              className="secondary-button px-4 py-2.5 text-sm disabled:opacity-40"
              disabled={step === 0}
              onClick={() => {
                const previous = step - 1;
                setStep(previous);
                const value = getValue(profile as unknown as Record<string, unknown>, questions[previous].path);
                setAnswer(Array.isArray(value) ? value.join(", ") : String(value || ""));
              }}
            >
              पिछला
            </button>
            <button onClick={next} disabled={!answer.trim()} className="primary-button inline-flex items-center gap-2 px-5 py-3">
              {step === questions.length - 1 ? <Check size={18} /> : <ArrowRight size={18} />}
              {step === questions.length - 1 ? "Business Kundli बनाएं" : "अगला प्रश्न"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
