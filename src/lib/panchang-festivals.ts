export interface PanchangFestival {
  date: string;
  weekday: string;
  name: string;
  lunar: string;
  theme: string;
  contentAngle: string;
}

export const panchang2026: Record<string, PanchangFestival[]> = {
  june: [
    {
      date: "June 5, 2026",
      weekday: "Friday",
      name: "World Environment Day",
      lunar: "fixed Gregorian day",
      theme: "clean space, nature and responsibility",
      contentAngle: "Vastu content about why plants, light and clutter-free corners affect how a home feels.",
    },
    {
      date: "June 11, 2026",
      weekday: "Thursday",
      name: "Parama Ekadashi",
      lunar: "Jyeshtha Adhika, Krishna Ekadashi",
      theme: "discipline, fasting and self-control",
      contentAngle: "Astrology content about why remedies need discipline, not fear.",
    },
    {
      date: "June 15, 2026",
      weekday: "Monday",
      name: "Mithuna Sankranti",
      lunar: "Sun transit from Vrishabha to Mithuna",
      theme: "communication, learning and decisions",
      contentAngle: "Numerology or astrology content about checking words, names and communication before launching something.",
    },
    {
      date: "June 21, 2026",
      weekday: "Sunday",
      name: "International Yoga Day",
      lunar: "fixed Gregorian day",
      theme: "body, breath and daily routine",
      contentAngle: "Simple spiritual content about why daily practice works better than random remedies.",
    },
    {
      date: "June 25, 2026",
      weekday: "Thursday",
      name: "Nirjala Ekadashi and Gayatri Jayanti",
      lunar: "Jyeshtha, Shukla Ekadashi",
      theme: "devotion, mantra and strong intention",
      contentAngle: "Content about one simple mantra or routine to build mental clarity.",
    },
    {
      date: "June 29, 2026",
      weekday: "Monday",
      name: "Vat Purnima Vrat",
      lunar: "Jyeshtha, Shukla Purnima",
      theme: "family, commitment and blessings",
      contentAngle: "Relationship astrology content about commitment, patience and emotional maturity.",
    },
    {
      date: "June 30, 2026",
      weekday: "Tuesday",
      name: "Jyeshtha Purnima and Kabirdas Jayanti",
      lunar: "Jyeshtha, Shukla Purnima",
      theme: "wisdom, truth and full moon reflection",
      contentAngle: "Astrology content about full moon reflection and honest self-checking.",
    },
  ],
  july: [
    {
      date: "July 3, 2026",
      weekday: "Friday",
      name: "Krishnapingala Sankashti",
      lunar: "Ashadha, Krishna Chaturthi",
      theme: "removing obstacles with patience",
      contentAngle: "Content about removing one practical obstacle before blaming luck.",
    },
    {
      date: "July 10, 2026",
      weekday: "Friday",
      name: "Yogini Ekadashi",
      lunar: "Ashadha, Krishna Ekadashi",
      theme: "clean habits and spiritual discipline",
      contentAngle: "Content about why a simple daily practice works better than one dramatic remedy.",
    },
    {
      date: "July 12, 2026",
      weekday: "Sunday",
      name: "Ravi Pradosh Vrat and Masik Shivaratri",
      lunar: "Ashadha, Krishna Trayodashi/Chaturdashi",
      theme: "Shiva, release and correction",
      contentAngle: "Content about releasing one wrong habit in home, name or decision-making.",
    },
    {
      date: "July 14, 2026",
      weekday: "Tuesday",
      name: "Darsha Amavasya / Ashadha Amavasya",
      lunar: "Ashadha, Krishna Amavasya",
      theme: "new moon, ancestors and closure",
      contentAngle: "Content about pausing, cleaning and closing old patterns before starting something new.",
    },
    {
      date: "July 15, 2026",
      weekday: "Wednesday",
      name: "Ashadha Navratri Begins and Chandra Darshana",
      lunar: "Ashadha, Shukla Pratipada",
      theme: "new beginning, Devi energy and first step",
      contentAngle: "Content about starting a 9-day self-discipline or space-cleaning practice.",
    },
    {
      date: "July 16, 2026",
      weekday: "Thursday",
      name: "Jagannath Rathyatra and Karka Sankranti",
      lunar: "Ashadha, Shukla Dwitiya; Sun transit to Karka",
      theme: "movement, devotion, home and emotional security",
      contentAngle: "Content about why your home direction and emotional space matter before major decisions.",
    },
    {
      date: "July 25, 2026",
      weekday: "Saturday",
      name: "Devshayani Ekadashi",
      lunar: "Ashadha, Shukla Ekadashi",
      theme: "pause, planning and Chaturmas discipline",
      contentAngle: "Content about what to pause, review and plan before starting new work.",
    },
    {
      date: "July 29, 2026",
      weekday: "Wednesday",
      name: "Guru Purnima, Vyasa Puja and Ashadha Purnima",
      lunar: "Ashadha, Shukla Purnima",
      theme: "teacher, wisdom and guidance",
      contentAngle: "Content about choosing the right guide and asking better questions in astrology or Vastu.",
    },
    {
      date: "July 30, 2026",
      weekday: "Thursday",
      name: "Shravana Begins in North India",
      lunar: "Shravana, Krishna Pratipada",
      theme: "Shiva bhakti, simplicity and routine",
      contentAngle: "Content about a simple Sawan routine for peace, discipline and home energy.",
    },
  ],
  august: [
    {
      date: "August 15, 2026",
      weekday: "Saturday",
      name: "Hariyali Teej and Independence Day",
      lunar: "Shravana season",
      theme: "greenery, devotion, freedom and renewal",
      contentAngle: "Content about adding greenery, light and fresh energy to the home.",
    },
    {
      date: "August 17, 2026",
      weekday: "Monday",
      name: "Nag Panchami",
      lunar: "Shravana festival",
      theme: "protection, respect and hidden fear",
      contentAngle: "Content about not making decisions from fear and respecting traditional symbols responsibly.",
    },
    {
      date: "August 28, 2026",
      weekday: "Friday",
      name: "Raksha Bandhan",
      lunar: "Shravana Purnima",
      theme: "protection, family and trust",
      contentAngle: "Family astrology or Vastu content about emotional safety at home.",
    },
  ],
};

export function monthKeyFromInput(input?: string) {
  const raw = (input || "").toLowerCase();
  if (raw.includes("jun")) return "june";
  if (raw.includes("jul")) return "july";
  if (raw.includes("aug")) return "august";
  return "july";
}

export function getPanchangFestivals(input?: string) {
  return panchang2026[monthKeyFromInput(input)] || panchang2026.july;
}

export function lifeGuidanceForFestival(event: PanchangFestival) {
  const name = event.name.toLowerCase();
  if (name.includes("ekadashi")) {
    return {
      bestFor: "fasting, simple puja, self-control, habit reset and manifestation through discipline",
      doThis: "Keep one simple sankalp, reduce distractions, chant or pray with focus, and avoid starting from panic.",
      avoidThis: "Avoid heavy promises, impulsive decisions and random remedies without understanding the real issue.",
      lifeArea: "discipline, health routine, spiritual clarity and decision control",
    };
  }
  if (name.includes("purnima") || name.includes("guru")) {
    return {
      bestFor: "gratitude, teacher blessings, relationship healing, learning and emotional closure",
      doThis: "Thank a teacher or elder, write what you have learned, do a simple prayer, and have one honest conversation.",
      avoidThis: "Avoid ego clashes, blame, and making decisions only from emotion.",
      lifeArea: "relationships, learning, emotional maturity and family peace",
    };
  }
  if (name.includes("amavasya")) {
    return {
      bestFor: "clearing old patterns, ancestor remembrance, home cleaning and quiet reflection",
      doThis: "Clean one neglected space, light a diya with respect, write what you want to release, and keep the day simple.",
      avoidThis: "Avoid emotional arguments, overthinking and launching something important without checking timing.",
      lifeArea: "closure, mental peace, home energy and family patterns",
    };
  }
  if (name.includes("shivaratri") || name.includes("pradosh") || name.includes("shravana")) {
    return {
      bestFor: "Shiva puja, forgiveness, letting go, discipline and simple spiritual routine",
      doThis: "Offer water or prayer with sincerity, forgive one old issue, and choose one habit to correct.",
      avoidThis: "Avoid fear-based remedies and dramatic changes just to feel immediate relief.",
      lifeArea: "peace, forgiveness, discipline and inner strength",
    };
  }
  if (name.includes("sankranti")) {
    return {
      bestFor: "planning, transition, career direction, communication and starting a cleaner routine",
      doThis: "Review one major plan, correct communication, and decide the next practical step before acting.",
      avoidThis: "Avoid rushing a decision just because you feel restless.",
      lifeArea: "career, business, communication and planning",
    };
  }
  if (name.includes("navratri")) {
    return {
      bestFor: "Devi puja, new routine, home cleaning, confidence and protection of personal energy",
      doThis: "Start a 9-day discipline, clean your prayer space, and choose one area of life where you need strength.",
      avoidThis: "Avoid negative self-talk and scattered action.",
      lifeArea: "confidence, home energy, protection and fresh start",
    };
  }
  if (name.includes("rathyatra")) {
    return {
      bestFor: "movement, devotion, family decisions, home emotion and life direction",
      doThis: "Ask where your life needs movement, review home comfort, and take one small step instead of waiting.",
      avoidThis: "Avoid staying stuck only because the decision feels big.",
      lifeArea: "home, family, movement and emotional security",
    };
  }
  if (name.includes("teej") || name.includes("raksha")) {
    return {
      bestFor: "relationship bonding, family blessings, trust and emotional care",
      doThis: "Have a peaceful conversation, express gratitude, and do one small act that makes the relationship feel safe.",
      avoidThis: "Avoid testing relationships through silence, anger or ego.",
      lifeArea: "relationships, family, trust and emotional safety",
    };
  }
  return {
    bestFor: "simple reflection, home correction, practical planning and spiritual clarity",
    doThis: "Pick one area of life, observe what is not working, and take one small corrective action today.",
    avoidThis: "Avoid fear, overthinking and copying remedies without proper guidance.",
    lifeArea: "clarity, home energy, decisions and daily discipline",
  };
}
