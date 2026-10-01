"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useSession } from "next-auth/react";

interface TrackerContextType {
  solved: Record<string, boolean>;
  toggle: (id: string) => void;
  reset: () => void;
  getStepProgress: (stepId: string, subIds: string[], lengths: number[]) => { done: number; total: number };
}

const TrackerContext = createContext<TrackerContextType | null>(null);
const STORAGE_KEY = "dsa-tracker-v2";

export function TrackerProvider({ children }: { children: ReactNode }) {
  const [solved, setSolved] = useState<Record<string, boolean>>({});
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      fetch("/api/progress")
        .then(res => res.json())
        .then(data => {
          if (data.solved) setSolved(data.solved);
        })
        .catch(console.error);
    } else {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setSolved(JSON.parse(stored));
      } catch {}
    }
  }, [session, status]);

  const toggle = async (id: string) => {
    const isSolved = !solved[id];
    
    // Optimistic UI update
    setSolved((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      
      if (!session?.user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      }
      return next;
    });

    if (session?.user) {
      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ problemId: id, isSolved }),
        });
      } catch (e) {
        console.error("Failed to sync", e);
      }
    }
  };

  const reset = async () => {
    setSolved({});
    
    if (session?.user) {
      try {
        await fetch("/api/progress", { method: "DELETE" });
      } catch (e) {
        console.error("Failed to reset db", e);
      }
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const getStepProgress = (stepId: string, subIds: string[], lengths: number[]) => {
    let done = 0, total = 0;
    subIds.forEach((subId, si) => {
      total += lengths[si];
      for (let i = 0; i < lengths[si]; i++) {
        if (solved[`${stepId}__${subId}__${i}`]) done++;
      }
    });
    return { done, total };
  };

  return (
    <TrackerContext.Provider value={{ solved, toggle, reset, getStepProgress }}>
      {children}
    </TrackerContext.Provider>
  );
}

export function useTracker() {
  const ctx = useContext(TrackerContext);
  if (!ctx) throw new Error("useTracker must be used inside TrackerProvider");
  return ctx;
}

export function getProblemId(stepId: string, subId: string, idx: number) {
  return `${stepId}__${subId}__${idx}`;
}
