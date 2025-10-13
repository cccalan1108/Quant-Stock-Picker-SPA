import { Box, Paper } from "@mui/material";
import { useAppState } from "../context/AppStateContext";
import { useCsvData } from "../hooks/useCsvData";
import FilterBar from "../components/FilterBar";
import ItemTable from "../components/ItemTable";
import { applyFilters } from "../hooks/useFilters";

export default function Browse() {
  const { items, setItems, filters } = useAppState();
  const { loading, error } = useCsvData(setItems);
  const filtered = applyFilters(items, filters);

  return (
    <Box>
      <FilterBar />
      <Paper variant="outlined" sx={{ p: 1 }}>
        {loading ? "載入中…" : error ? error : <ItemTable rows={filtered} />}
      </Paper>
    </Box>
  );
}