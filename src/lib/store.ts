"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Fallback storage that does nothing for SSR
const createNoopStorage = () => ({
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
});

interface SettingsState {
  baseUrl: string;
  setBaseUrl: (url: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      baseUrl: "https://storage.googleapis.com/cdn-roundtechsquare/",
      setBaseUrl: (url: string) => set({ baseUrl: url }),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : createNoopStorage()
      ),
    }
  )
);
