// Shared BusinessProfile — written by every module, read by every one

export interface BusinessProfile {
  coach: {
    name: string;
    niche_label: string;
    language_pref: "tamil" | "hinglish" | "english";
  };
  onboarding: {
    who_they_help: string;
    the_change: string;
    what_they_call_it: string;
    signature_phrase: string;
    completed: boolean;
  };
  icp: {
    generated: string;
    completed: boolean;
  };
  mind_xray: {
    generated: string;
    completed: boolean;
  };
  high_impact: {
    generated: string;
    transformation_from: string;
    transformation_to: string;
    domain: string;
    completed: boolean;
  };
  mechanism: {
    generated: string;
    name: string;
    steps: string[];
    positioning_line: string;
    completed: boolean;
  };
  offer: {
    generated: string;
    completed: boolean;
  };
  hooks: {
    generated: string;
    completed: boolean;
  };
  pitch: {
    generated: string;
    completed: boolean;
  };
  deck: {
    generated: string;
    completed: boolean;
  };
}

export function emptyProfile(): BusinessProfile {
  return {
    coach: { name: "", niche_label: "", language_pref: "tamil" },
    onboarding: { who_they_help: "", the_change: "", what_they_call_it: "", signature_phrase: "", completed: false },
    icp: { generated: "", completed: false },
    mind_xray: { generated: "", completed: false },
    high_impact: { generated: "", transformation_from: "", transformation_to: "", domain: "", completed: false },
    mechanism: { generated: "", name: "", steps: [], positioning_line: "", completed: false },
    offer: { generated: "", completed: false },
    hooks: { generated: "", completed: false },
    pitch: { generated: "", completed: false },
    deck: { generated: "", completed: false },
  };
}

const STORAGE_KEY = "business-suite-profile";

export function loadProfile(): BusinessProfile {
  if (typeof window === "undefined") return emptyProfile();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProfile();
    return { ...emptyProfile(), ...JSON.parse(raw) };
  } catch {
    return emptyProfile();
  }
}

export function saveProfile(profile: BusinessProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function resetProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

// Helper: get completed module count
export function completedCount(profile: BusinessProfile): number {
  const modules = [
    profile.onboarding,
    profile.icp,
    profile.mind_xray,
    profile.high_impact,
    profile.mechanism,
    profile.offer,
    profile.hooks,
    profile.pitch,
    profile.deck,
  ];
  return modules.filter((m) => m.completed).length;
}
