import type { Stock } from "../types";

const num = (x: any) => (x === null || x === undefined || x === "" ? NaN : Number(x));
const mean = (a: number[]) => a.reduce((s, v) => s + v, 0) / a.length;
const std = (a: number[]) => Math.sqrt(mean(a.map(v => (v - mean(a)) ** 2)));
const z = (x: number, arr: number[]) => (x - mean(arr)) / (std(arr) || 1);

export function enrichScores(list: Stock[]): Stock[] {
  if (!list.length) return list;
  const peArr = list.map(d => d.pe).filter(v => Number.isFinite(v));
  const divArr = list.map(d => d.div_yield).filter(v => Number.isFinite(v));
  const mcapArr = list.map(d => d.mkt_cap).filter(v => Number.isFinite(v));
  const volArr = list.map(d => d.vol_1y).filter(v => Number.isFinite(v));

  return list.map(d => {
    const quality = (-z(d.pe, peArr)) + z(d.div_yield, divArr) + z(d.mkt_cap, mcapArr);
    const risk = z(d.vol_1y, volArr);
    const composite = quality - risk;
    return { ...d, quality_score: quality, risk_score: risk, composite };
  });
}

export const parseStockRow = (r: Record<string, string>): Stock => ({
  symbol: r.symbol, name: r.name, sector: r.sector, country: r.country,
  price: num(r.price), pe: num(r.pe), pb: num(r.pb), div_yield: num(r.div_yield), mkt_cap: num(r.mkt_cap),
  ret_1m: num(r["1m_ret"]) || num(r.ret_1m), ret_3m: num(r["3m_ret"]) || num(r.ret_3m), vol_1y: num(r["1y_vol"]) || num(r.vol_1y),
});