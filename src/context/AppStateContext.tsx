import React, { createContext, useContext, useMemo, useState } from "react";
import type { Stock, StageEntry, Filters, FinalSubmission } from "../types";

interface AppState {
  items: Stock[]; setItems: (s: Stock[]) => void;
  filters: Filters; setFilters: (f: Partial<Filters>) => void;
  stage: StageEntry[];
  addToStage: (symbol: string, weight?: number) => void;
  updateWeight: (symbol: string, weight: number) => void;
  removeFromStage: (symbol: string) => void;
  finalSubmission?: FinalSubmission; submitFinal: (p: StageEntry[]) => void; reset: () => void;
}

const Ctx = createContext<AppState | null>(null);
export const useAppState = () => {
  const v = useContext(Ctx); if (!v) throw new Error("AppStateContext missing"); return v;
};

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<Stock[]>([]);
  const [filters, setFiltersState] = useState<Filters>({ peRange: [0, 60], sortBy: "composite" });
  const [stage, setStage] = useState<StageEntry[]>([]);
  const [finalSubmission, setFinal] = useState<FinalSubmission | undefined>();

  const setFilters = (f: Partial<Filters>) => setFiltersState(prev => ({ ...prev, ...f }));
  const addToStage = (symbol: string, weight = 0) => setStage(prev => prev.some(s => s.symbol === symbol) ? prev : [...prev, { symbol, weight }]);
  const updateWeight = (symbol: string, weight: number) => setStage(prev => prev.map(s => s.symbol === symbol ? { ...s, weight } : s));
  const removeFromStage = (symbol: string) => setStage(prev => prev.filter(s => s.symbol !== symbol));
  const submitFinal = (p: StageEntry[]) => setFinal({ at: new Date().toISOString(), portfolio: p });
  const reset = () => { setStage([]); setFinal(undefined); };

  const value = useMemo(() => ({ items, setItems, filters, setFilters, stage, addToStage, updateWeight, removeFromStage, finalSubmission, submitFinal, reset }), [items, filters, stage, finalSubmission]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};