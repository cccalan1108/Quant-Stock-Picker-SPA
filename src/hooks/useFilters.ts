import type { Filters, Stock } from "../types";

export function applyFilters(items: Stock[], f: Filters): Stock[] {
  let out = [...items];
  if (f.q && f.q.trim()) {
    const q = f.q.toLowerCase();
    out = out.filter(d => d.symbol.toLowerCase().includes(q) || d.name.toLowerCase().includes(q));
  }
  if (f.sector?.length) out = out.filter(d => f.sector!.includes(d.sector));
  if (f.country?.length) out = out.filter(d => f.country!.includes(d.country));
  if (f.peRange) out = out.filter(d => d.pe >= f.peRange![0] && d.pe <= f.peRange![1]);

  const key = f.sortBy || "composite";
  out.sort((a: any, b: any) => (b[key] ?? 0) - (a[key] ?? 0));
  return out;
}