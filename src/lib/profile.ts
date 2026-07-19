export type AssetStatus = "draft" | "approved" | "archived";

export type WorkspaceArea =
  | "diagnosis"
  | "problem"
  | "niche"
  | "persona"
  | "offer"
  | "calendar"
  | "script"
  | "tools"
  | "prompt"
  | "guide"
  | "positioning"
  | "signature"
  | "presentation"
  | "sales"
  | "objections"
  | "roadmap"
  | "product";

export interface GeneratedAsset {
  id: string;
  area: WorkspaceArea;
  title: string;
  status: AssetStatus;
  version: number;
  qualityScore: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessProfile {
  id: string;
  userId: string;
  workspaceName: string;
  practitioner: {
    name: string;
    businessName: string;
    categories: string[];
    experienceYears: string;
    certifications: string;
    methodologies: string;
    markets: string;
    languages: string;
  };
  business: {
    currentRevenue: string;
    targetRevenue: string;
    currentPrice: string;
    monthlyClients: string;
    services: string;
    leadSources: string;
    teamSize: string;
    hoursAvailable: string;
    funnelStatus: string;
  };
  expertise: {
    problemsSolved: string;
    clientResults: string;
    uniqueProcess: string;
    beliefs: string;
    differentiators: string;
    bestClients: string;
    praise: string;
  };
  audience: {
    currentBuyers: string;
    desiredAudience: string;
    urgentProblems: string;
    fears: string;
    desires: string;
    objections: string;
    affordability: string;
  };
  proof: {
    testimonials: string;
    clientCount: string;
    caseStudies: string;
    screenshots: string;
    media: string;
  };
  preferences: {
    businessModels: string[];
    brandVoice: string;
    complianceNotes: string;
    language: "english" | "hindi";
  };
  progress: Record<WorkspaceArea, number>;
  assets: GeneratedAsset[];
  approvedAssetIds: Partial<Record<WorkspaceArea, string>>;
  updatedAt: string;
}

const STORAGE_KEY = "astro-business-os-profile";

const now = () => new Date().toISOString();

export const areas: { id: WorkspaceArea; label: string; path: string }[] = [
  { id: "diagnosis", label: "Business Kundli", path: "/business-kundli" },
  { id: "problem", label: "High Impact Problem", path: "/strategy-room" },
  { id: "niche", label: "Million Dollar Market", path: "/niche-finder" },
  { id: "persona", label: "Customer Type", path: "/customer-persona" },
  { id: "offer", label: "Package & Price", path: "/offer-alchemist" },
  { id: "calendar", label: "Panchang Content", path: "/content-calendar" },
  { id: "script", label: "SM Viral Content", path: "/script-studio" },
  { id: "tools", label: "AI Tools", path: "/ai-tool-advisor" },
  { id: "prompt", label: "App Prompt", path: "/build-prompt-generator" },
  { id: "guide", label: "Talk to Gargi", path: "/ask-gargi-ai" },
];

export function demoProfile(): BusinessProfile {
  return {
    id: "demo-meera-sharma",
    userId: "local-demo-user",
    workspaceName: "Gargi Sutra Demo",
    practitioner: {
      name: "Meera Sharma",
      businessName: "Meera Vastu Guidance",
      categories: ["Vastu Consultant", "Business Vastu", "Home Energy Audit"],
      experienceYears: "8",
      certifications: "Vastu consultation training; demo profile only",
      methodologies: "Floor-plan review, room-wise observation, practical correction matrix",
      markets: "Mumbai, Pune, online consultations",
      languages: "Hindi, Hinglish",
    },
    business: {
      currentRevenue: "180000",
      targetRevenue: "700000",
      currentPrice: "7500",
      monthlyClients: "24",
      services: "Homes, clinics and office Vastu consultations",
      leadSources: "Referrals, WhatsApp and Instagram",
      teamSize: "1",
      hoursAvailable: "18",
      funnelStatus: "No premium package; mostly single consultations",
    },
    expertise: {
      problemsSolved: "Helps clinic owners and premium homeowners understand space planning through Vastu principles.",
      clientResults: "Demo data only: clients report clearer room usage, better consultation flow and calmer home planning.",
      uniqueProcess: "Questionnaire, floor-plan diagnosis, priority correction matrix and 30-day follow-up tracker.",
      beliefs: "Vastu should be practical, respectful and non-fear-based.",
      differentiators: "Clear documentation and simple implementation checklists.",
      bestClients: "Clinic owners, office owners and premium homeowners.",
      praise: "Clients appreciate simple explanations and practical changes.",
    },
    audience: {
      currentBuyers: "Homeowners, clinic owners and small office owners.",
      desiredAudience: "Clinic owners and premium homeowners who want a documented Vastu assessment.",
      urgentProblems: "Confusing floor layout, patient/client flow, renovation decisions and room placement doubts.",
      fears: "Wasting renovation money, making changes repeatedly, being pushed into expensive remedies.",
      desires: "Clear priority list, practical corrections and a premium written roadmap.",
      objections: "Will this require demolition, is online review enough, how much will changes cost?",
      affordability: "Can afford a premium package when deliverables are tangible and documented.",
    },
    proof: {
      testimonials: "Demo testimonials only. Upload consented proof before external use.",
      clientCount: "220 demo consultations",
      caseStudies: "No verified case studies uploaded yet.",
      screenshots: "Not uploaded.",
      media: "Not uploaded.",
    },
    preferences: {
      businessModels: ["Signature reading", "Guided consultation", "Monthly content ritual"],
      brandVoice: "Elegant, mystical, clear, warm, premium, English-first",
      complianceNotes: "Avoid guaranteed wealth, relationship or supernatural claims. Mark proof requiring verification.",
      language: "english",
    },
    progress: {
      diagnosis: 80,
      problem: 0,
      niche: 68,
      persona: 58,
      offer: 35,
      calendar: 45,
      script: 30,
      tools: 20,
      prompt: 10,
      guide: 25,
      positioning: 0,
      signature: 0,
      presentation: 0,
      sales: 0,
      objections: 0,
      roadmap: 0,
      product: 0,
    },
    assets: [],
    approvedAssetIds: {},
    updatedAt: now(),
  };
}

export function emptyProfile(): BusinessProfile {
  return {
    ...demoProfile(),
    id: "local-workspace",
    workspaceName: "Gargi Sutra Workspace",
    practitioner: {
      name: "",
      businessName: "",
      categories: [],
      experienceYears: "",
      certifications: "",
      methodologies: "",
      markets: "",
      languages: "",
    },
    business: {
      currentRevenue: "",
      targetRevenue: "",
      currentPrice: "",
      monthlyClients: "",
      services: "",
      leadSources: "",
      teamSize: "",
      hoursAvailable: "",
      funnelStatus: "",
    },
    expertise: {
      problemsSolved: "",
      clientResults: "",
      uniqueProcess: "",
      beliefs: "",
      differentiators: "",
      bestClients: "",
      praise: "",
    },
    audience: {
      currentBuyers: "",
      desiredAudience: "",
      urgentProblems: "",
      fears: "",
      desires: "",
      objections: "",
      affordability: "",
    },
    proof: {
      testimonials: "",
      clientCount: "",
      caseStudies: "",
      screenshots: "",
      media: "",
    },
    preferences: {
      businessModels: [],
      brandVoice: "Elegant, mystical, clear, warm, premium",
      complianceNotes: "No guaranteed financial, health, relationship or supernatural claims.",
      language: "english",
    },
    progress: {
      diagnosis: 0,
      problem: 0,
      niche: 0,
      persona: 0,
      offer: 0,
      calendar: 0,
      script: 0,
      tools: 0,
      prompt: 0,
      guide: 0,
      positioning: 0,
      signature: 0,
      presentation: 0,
      sales: 0,
      objections: 0,
      roadmap: 0,
      product: 0,
    },
    assets: [],
    approvedAssetIds: {},
    updatedAt: now(),
  };
}

export function loadProfile(): BusinessProfile {
  if (typeof window === "undefined") return emptyProfile();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return demoProfile();
    return mergeProfile(JSON.parse(raw));
  } catch {
    return demoProfile();
  }
}

export function saveProfile(profile: BusinessProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...profile, updatedAt: now() }));
}

export function resetProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function completion(profile: BusinessProfile): number {
  const values = Object.values(profile.progress);
  return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
}

export function areaAsset(profile: BusinessProfile, area: WorkspaceArea): GeneratedAsset | undefined {
  const approvedId = profile.approvedAssetIds[area];
  return profile.assets.find((asset) => asset.id === approvedId) || profile.assets.find((asset) => asset.area === area);
}

export function createAsset(area: WorkspaceArea, title: string, content: string): GeneratedAsset {
  const timestamp = now();
  return {
    id: `${area}-${Date.now()}`,
    area,
    title,
    status: "draft",
    version: 1,
    qualityScore: scoreContent(content),
    content,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function scoreContent(content: string): number {
  const checks = [
    content.includes("Recommended"),
    content.includes("Why"),
    content.includes("Proof"),
    content.includes("Next"),
    content.length > 1200,
    !/guaranteed|100%|certain result/i.test(content),
  ];
  return Math.max(45, Math.round((checks.filter(Boolean).length / checks.length) * 100));
}

function mergeProfile(input: Partial<BusinessProfile>): BusinessProfile {
  const base = demoProfile();
  return {
    ...base,
    ...input,
    practitioner: { ...base.practitioner, ...input.practitioner },
    business: { ...base.business, ...input.business },
    expertise: { ...base.expertise, ...input.expertise },
    audience: { ...base.audience, ...input.audience },
    proof: { ...base.proof, ...input.proof },
    preferences: { ...base.preferences, ...input.preferences },
    progress: { ...base.progress, ...input.progress },
    assets: input.assets || [],
    approvedAssetIds: input.approvedAssetIds || {},
  };
}
