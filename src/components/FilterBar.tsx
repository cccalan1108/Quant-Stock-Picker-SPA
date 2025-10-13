import { Box, TextField, Autocomplete, Slider, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useMemo } from "react";
import { useAppState } from "../context/AppStateContext";

export default function FilterBar() {
  const { items, filters, setFilters } = useAppState();
  const sectors = useMemo(() => Array.from(new Set(items.map(i => i.sector))).sort(), [items]);
  const countries = useMemo(() => Array.from(new Set(items.map(i => i.country))).sort(), [items]);

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr 2fr 2fr", gap: 2, mb: 2 }}>
      <TextField label="搜尋 (代號/名稱)" size="small" value={filters.q || ""} onChange={e => setFilters({ q: e.target.value })} />
      <Autocomplete multiple options={sectors} value={filters.sector || []} onChange={(_, v) => setFilters({ sector: v })} renderInput={(p) => <TextField {...p} label="產業" size="small" />} />
      <Autocomplete multiple options={countries} value={filters.country || []} onChange={(_, v) => setFilters({ country: v })} renderInput={(p) => <TextField {...p} label="國家" size="small" />} />
      <Box>
        <Box sx={{ fontSize: 12, color: "text.secondary", mb: 0.5 }}>PE 範圍</Box>
        <Slider size="small" value={filters.peRange || [0, 60]} min={0} max={80} step={1} onChange={(_, v) => setFilters({ peRange: v as any })} valueLabelDisplay="auto" />
      </Box>
      <Box>
        <Box sx={{ fontSize: 12, color: "text.secondary", mb: 0.5 }}>排序</Box>
        <ToggleButtonGroup exclusive size="small" value={filters.sortBy || "composite"} onChange={(_, v) => v && setFilters({ sortBy: v })}>
          <ToggleButton value="composite">綜合</ToggleButton>
          <ToggleButton value="pe">PE 低優先</ToggleButton>
          <ToggleButton value="div_yield">殖利率</ToggleButton>
          <ToggleButton value="mkt_cap">市值</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
}