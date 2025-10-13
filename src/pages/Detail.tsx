import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";

export default function Detail() {
  const { symbol } = useParams();
  const nav = useNavigate();
  const { items, addToStage } = useAppState();
  const it = items.find(i => i.symbol === symbol);
  if (!it) return <div>查無此股票</div>;

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
      <Card><CardContent>
        <Typography variant="h6">{it.symbol} — {it.name}</Typography>
        <Typography variant="body2" color="text.secondary">{it.sector} · {it.country}</Typography>
        <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1 }}>
          <Metric label="PE" value={it.pe} />
          <Metric label="PB" value={it.pb} />
          <Metric label="殖利率%" value={it.div_yield} />
          <Metric label="市值" value={it.mkt_cap} />
          <Metric label="風險(Vol)" value={it.vol_1y} />
          <Metric label="綜合分數" value={it.composite} digits={2} />
        </Box>
        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Button variant="contained" onClick={() => { addToStage(it.symbol); nav("/stage"); }}>加入配置</Button>
          <Button onClick={() => nav(-1)}>返回</Button>
        </Box>
      </CardContent></Card>
    </Box>
  );
}

function Metric({ label, value, digits = 1 }: { label: string; value?: number; digits?: number }) {
  return (
    <Box sx={{ p: 1, borderRadius: 1, bgcolor: "grey.50", border: "1px solid", borderColor: "grey.200" }}>
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{value?.toFixed(digits)}</div>
    </Box>
  );
}