"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { BusinessProfile, emptyProfile, loadProfile, saveProfile, resetProfile } from "@/lib/profile";

interface ProfileContextValue {
  profile: BusinessProfile;
  isLoaded: boolean;
  update: (patch: Partial<BusinessProfile>) => void;
  updateNested: <K extends keyof BusinessProfile>(
    key: K,
    patch: Partial<BusinessProfile[K]>
  ) => void;
  reset: () => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<BusinessProfile>(emptyProfile);
  const [isLoaded, setIsLoaded] = useState(false);
  const initialRender = useRef(true);

  // Load profile from localStorage after mount (avoids hydration mismatch)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile(loadProfile());
    setIsLoaded(true);
  }, []);

  // Save to localStorage on every change (skip initial render)
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (isLoaded) saveProfile(profile);
  }, [profile, isLoaded]);

  const update = useCallback((patch: Partial<BusinessProfile>) => {
    setProfile((prev) => ({ ...prev, ...patch }));
  }, []);

  const updateNested = useCallback(<K extends keyof BusinessProfile>(
    key: K,
    patch: Partial<BusinessProfile[K]>
  ) => {
    setProfile((prev) => ({
      ...prev,
      [key]: { ...(prev[key] as object), ...(patch as object) } as BusinessProfile[K],
    }));
  }, []);

  const reset = useCallback(() => {
    resetProfile();
    setProfile(emptyProfile());
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, isLoaded, update, updateNested, reset }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
