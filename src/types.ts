export type Stock = {
  symbol: string; name: string; sector: string; country: string;
  price: number; pe: number; pb: number; div_yield: number; mkt_cap: number;
  ret_1m: number; ret_3m: number; vol_1y: number;
  quality_score?: number; risk_score?: number; composite?: number;
};

export type StageEntry = { symbol: string; weight: number; note?: string };

export type Filters = {
  q?: string; sector?: string[]; country?: string[];
  peRange?: [number, number];
  sortBy?: "composite" | "pe" | "div_yield" | "mkt_cap";
};

export type FinalSubmission = { at: string; portfolio: StageEntry[] };