import { Table, TableHead, TableRow, TableCell, TableBody, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppState } from "../context/AppStateContext";

export default function StageTable() {
  const { stage, updateWeight, removeFromStage } = useAppState();
  const sum = stage.reduce((s, r) => s + (Number(r.weight) || 0), 0);
  return (
    <>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>代號</TableCell>
            <TableCell align="right">權重(%)</TableCell>
            <TableCell align="center">操作</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stage.map(r => (
            <TableRow key={r.symbol}>
              <TableCell>{r.symbol}</TableCell>
              <TableCell align="right" style={{ width: 160 }}>
                <TextField size="small" type="number" value={r.weight} onChange={e => updateWeight(r.symbol, Number(e.target.value))} />
              </TableCell>
              <TableCell align="center"><IconButton onClick={() => removeFromStage(r.symbol)}><DeleteIcon /></IconButton></TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>合計</TableCell>
            <TableCell align="right">{sum}%</TableCell>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
      <div style={{ fontSize: 12, marginTop: 8, color: sum === 100 ? "green" : "#c62828" }}>
        {sum === 100 ? "權重合計 100%。" : "建議權重合計為 100%。目前：" + sum}
      </div>
    </>
  );
}