"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useProfile } from "@/context/ProfileContext";
import { areas, completion } from "@/lib/profile";
import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  CalendarDays,
  ChartNoAxesCombined,
  FileText,
  Hammer,
  LayoutDashboard,
  MessagesSquare,
  Search,
  ScrollText,
  ShieldCheck,
  Users,
  WandSparkles,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  diagnosis: ChartNoAxesCombined,
  niche: Search,
  persona: Users,
  offer: BriefcaseBusiness,
  calendar: CalendarDays,
  script: ScrollText,
  tools: WandSparkles,
  prompt: Hammer,
  guide: MessagesSquare,
};

const navItems = [
  { href: "/", label: "Home", icon: LayoutDashboard },
  { href: "/onboarding", label: "Business Profile", icon: BrainCircuit },
  { href: "/business-brain", label: "Saved Work", icon: FileText },
  ...areas.map((area) => ({ href: area.path, label: area.label, icon: iconMap[area.id], area: area.id })),
  { href: "/admin", label: "Admin", icon: ShieldCheck },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile, isLoaded } = useProfile();
  const total = isLoaded ? completion(profile) : 0;

  return (
    <>
    <aside className="app-sidebar fixed left-0 top-0 z-50 hidden h-screen w-72 flex-col border-r border-border-default bg-bg-secondary/92 backdrop-blur-xl lg:flex">
      <div className="border-b border-border-default p-5">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/brand/gargi-ai-universe.jpg" alt="Gargi Sutra" width={48} height={48} className="h-12 w-12 rounded-full border border-accent-gold/30 object-cover shadow-lg" />
          <div>
            <h1 className="text-base font-bold tracking-tight text-text-primary">Gargi Sutra</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-accent-gold">Light Occult OS</p>
          </div>
        </Link>
      </div>

      <div className="border-b border-border-default px-5 py-4">
        <p className="text-xs uppercase tracking-[0.18em] text-text-secondary">Workspace</p>
        <p className="mt-1 truncate text-sm font-semibold text-text-primary">
          {profile.practitioner.name || "Meera Sharma"}
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/6">
          <div className="h-full rounded-full bg-gold-gradient transition-all" style={{ width: `${total}%` }} />
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-text-secondary">
          <span>Progress</span>
          <span className="font-semibold text-accent-gold">{total}%</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          const progress = "area" in item && item.area ? profile.progress[item.area] : undefined;
          return (
            <Link key={item.href} href={item.href} className={`sidebar-nav-item ${active ? "active" : ""}`}>
              <Icon size={16} />
              <span className="flex-1 truncate">{item.label}</span>
              {typeof progress === "number" && progress >= 70 ? (
                <BadgeCheck size={14} className="text-accent-green" />
              ) : typeof progress === "number" ? (
                <span className="text-[10px] text-text-secondary/70">{progress}%</span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border-default p-4">
        <div className="mb-3 grid grid-cols-2 gap-2">
          <Image src="/brand/make-in-india.png" alt="Make in India" width={108} height={40} className="h-10 w-full rounded-lg border border-border-default bg-white object-contain p-1.5" />
          <Image src="/brand/startup-india.png" alt="Startup India" width={108} height={40} className="h-10 w-full rounded-lg border border-border-default bg-white object-contain p-1.5" />
        </div>
        <div className="rounded-lg border border-accent-gold/18 bg-accent-gold/8 p-3">
          <p className="text-xs font-semibold text-accent-gold">Guidance guardrails</p>
          <p className="mt-1 text-[11px] leading-relaxed text-text-secondary">
            Reflective guidance only. No fear-based claims, fake proof, or guaranteed outcomes.
          </p>
        </div>
      </div>
    </aside>
    <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-border-default bg-bg-secondary/95 px-2 py-2 backdrop-blur-xl lg:hidden">
      {navItems.slice(0, 5).map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href} className={`grid place-items-center gap-1 rounded-lg px-1 py-2 text-[10px] font-semibold ${active ? "bg-accent-gold/12 text-accent-gold" : "text-text-secondary"}`}>
            <Icon size={17} />
            <span className="max-w-full truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
    </>
  );
}
