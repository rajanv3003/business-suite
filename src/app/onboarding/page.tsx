"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useProfile } from "@/context/ProfileContext";
import { Rocket, ArrowRight, Sparkles } from "lucide-react";

export default function Onboarding() {
  const router = useRouter();
  const { profile, update } = useProfile();

  const [name, setName] = useState(profile.coach.name || "");
  const [whoHelp, setWhoHelp] = useState(profile.onboarding.who_they_help || "");
  const [theChange, setTheChange] = useState(profile.onboarding.the_change || "");
  const [whatCall, setWhatCall] = useState(profile.onboarding.what_they_call_it || "");
  const [signature, setSignature] = useState(profile.onboarding.signature_phrase || "");

  const allFilled = name.trim() && whoHelp.trim() && theChange.trim() && whatCall.trim();

  const handleSave = () => {
    update({
      coach: { ...profile.coach, name: name.trim() },
      onboarding: {
        who_they_help: whoHelp.trim(),
        the_change: theChange.trim(),
        what_they_call_it: whatCall.trim(),
        signature_phrase: signature.trim(),
        completed: true,
      },
    });
    router.push("/icp-builder");
  };

  return (
    <div className="min-h-screen p-8 relative z-10">
      <div className="max-w-2xl mx-auto mt-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mx-auto mb-5"
            style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}>
            <Rocket size={28} />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            தொடங்குவோம்!
          </h1>
          <p className="text-text-secondary text-sm">
            சில சின்ன கேள்விகள் மட்டும். மீதி எல்லாம் <span className="text-accent-gold font-medium">ஞானி</span> build செய்யும்.
          </p>
          <p className="text-[10px] text-text-secondary/50 mt-1 uppercase tracking-wider">
            Powered by Sasi Rekha Methodology
          </p>
        </div>

        {/* Questions */}
        <div className="space-y-6 animate-fade-in-up">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              உங்கள் பெயர் என்ன?
            </label>
            <input
              type="text"
              placeholder='உதா: "பிரியா", "ராஜன்", "நேஹா"'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Who they help */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              ஒரு வரியில் — நீங்கள் யாருக்கு உதவுகிறீர்கள்?
            </label>
            <input
              type="text"
              placeholder='உதா: "40 வயது working professionals — stuck-ஆ feel ஆகுறவங்க"'
              value={whoHelp}
              onChange={(e) => setWhoHelp(e.target.value)}
            />
            <p className="text-[10px] text-text-secondary/50 mt-1">அதிகம் யோசிக்காதீர்கள். ஒரு வரி போதும்.</p>
          </div>

          {/* The change */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              ஒரு வரியில் — நீங்கள் என்ன மாற்றம் செய்ய உதவுகிறீர்கள்?
            </label>
            <input
              type="text"
              placeholder='உதா: "stuck-ஆவும் invisible-ஆவும் feel ஆகுறது → confident-ஆவும் clear-ஆவும் ஆவது"'
              value={theChange}
              onChange={(e) => setTheChange(e.target.value)}
            />
            <p className="text-[10px] text-text-secondary/50 mt-1">எங்கிருந்து → எங்கு. அவ்வளவுதான்.</p>
          </div>

          {/* What they call it */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              உங்கள் வேலையை என்னவென்று சொல்வீர்கள்?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {["Life Coach", "Career Coach", "Confidence Coach", "Executive Coach", "Mindset Coach", "Relationship Coach", "Health Coach", "Business Coach"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setWhatCall(opt)}
                  className={`p-2.5 rounded-xl border text-sm font-medium transition-all ${
                    whatCall === opt
                      ? "border-accent-gold bg-accent-gold/10 text-accent-gold"
                      : "border-border-default bg-bg-secondary text-text-secondary hover:border-text-secondary"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="அல்லது உங்கள் சொந்த வார்த்தையில் type செய்யுங்கள்..."
              value={["Life Coach", "Career Coach", "Confidence Coach", "Executive Coach", "Mindset Coach", "Relationship Coach", "Health Coach", "Business Coach"].includes(whatCall) ? "" : whatCall}
              onChange={(e) => setWhatCall(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Signature phrase (optional) */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              ஒரு client சொன்ன ஒரு வாக்கியம் — உங்கள் மனதில் நிற்பது?
              <span className="text-text-secondary/50 font-normal"> (optional)</span>
            </label>
            <textarea
              rows={2}
              placeholder='"உங்கள் sessions-க்கு பிறகு, நான் என்னை apologize பண்றதை நிறுத்தினேன்." — client நிஜமா சொன்ன ஏதாவது.'
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSave}
            disabled={!allFilled}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ background: allFilled ? "linear-gradient(135deg, #d4a853, #f0c75e)" : "#333" }}
          >
            <Sparkles size={18} />
            Save செய்து ஞானி-ஐ தொடங்கு
            <ArrowRight size={18} />
          </button>

          <p className="text-center text-[10px] text-text-secondary/40">
            இது விதை. மீதி எல்லாம் ஞானி இந்த பதில்களில் இருந்து உருவாக்கும்.
          </p>
        </div>
      </div>
    </div>
  );
}
