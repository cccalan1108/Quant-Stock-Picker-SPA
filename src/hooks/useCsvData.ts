import { useEffect, useState } from "react";
import Papa from "papaparse";
import type { Stock } from "../types";
import { enrichScores, parseStockRow } from "../utils/scoring";
import stocksRaw from "../public/data/stocks.csv?raw";

const CANDIDATE_PATHS = [
  "/data/stocks.csv",
  "/public/data/stocks.csv",
  "/src/public/data/stocks.csv",
];

export function useCsvData(onLoaded: (items: Stock[]) => void) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        if (stocksRaw && stocksRaw.trim().length > 0) {
          const parsed = Papa.parse(stocksRaw, { header: true, skipEmptyLines: true });
          const rows = (parsed.data as any[]).map(r => parseStockRow(r));
          const items = enrichScores(rows);
          if (!cancelled) { onLoaded(items); setLoading(false); return; }
        }
      } catch (_) { /* fallthrough */ }

      for (const path of CANDIDATE_PATHS) {
        try {
          const res = await fetch(path);
          if (!res.ok) continue;
          const text = await res.text();
          const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
          const rows = (parsed.data as any[]).map(r => parseStockRow(r));
          const items = enrichScores(rows);
          if (!cancelled) { onLoaded(items); setLoading(false); }
          return;
        } catch (_) { /* try next */ }
      }
      if (!cancelled) { setError("無法載入 stocks.csv，請確認路徑在 src/public/data/"); setLoading(false); }
    })();
    return () => { cancelled = true; };
  }, [onLoaded]);

  return { loading, error };
}