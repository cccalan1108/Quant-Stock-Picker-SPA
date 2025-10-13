import { Box, Button, Paper } from "@mui/material";
import StageTable from "../components/StageTable";
import { useAppState } from "../context/AppStateContext";
import { useNavigate } from "react-router-dom";

export default function Stage() {
  const { stage } = useAppState();
  const nav = useNavigate();
  const sum = stage.reduce((s, r) => s + (r.weight || 0), 0);
  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 1 }}>
        <StageTable />
      </Paper>
      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
        <Button disabled={!stage.length} onClick={() => nav("/")}>繼續挑選</Button>
        <Button variant="contained" disabled={!stage.length} onClick={() => nav("/final")}>送出配置</Button>
      </Box>
      <div style={{ fontSize: 12, marginTop: 8, color: sum === 100 ? "green" : "#c62828" }}>
        {sum === 100 ? "權重合計 100%。" : `目前合計 ${sum}%（建議 100%）`}
      </div>
    </Box>
  );
}