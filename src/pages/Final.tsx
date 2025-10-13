import { Box, Button, Paper, Typography } from "@mui/material";
import { useAppState } from "../context/AppStateContext";
import { downloadCsv } from "../utils/csv";

export default function Final() {
  const { stage, submitFinal } = useAppState();

  const csvRows = stage.map(s => ({ symbol: s.symbol, weight: s.weight }));

  const onDownload = () => downloadCsv("portfolio.csv", csvRows);
  const onSubmit = () => submitFinal(stage);

  return (
    <Box>
      <Paper variant="outlined" sx={{ p: 2 }}>
        <Typography variant="h6">投資組合</Typography>
        <Box sx={{ mt: 1, fontFamily: "monospace" }}>{JSON.stringify(csvRows, null, 2)}</Box>
        <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
          <Button onClick={onDownload}>下載 CSV</Button>
          <Button variant="contained" onClick={onSubmit}>確認送出</Button>
        </Box>
        <Typography sx={{ mt: 1 }} variant="caption" color="text.secondary">
          本頁為作業示例，純前端模擬，非投資建議。
        </Typography>
      </Paper>
    </Box>
  );
}