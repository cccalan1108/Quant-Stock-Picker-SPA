import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";
import type { Stock } from "../types";

export default function ItemTable({ rows }: { rows: Stock[] }) {
  const nav = useNavigate();
  const { addToStage } = useAppState();
  return (
    <Table size="small" stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>代號</TableCell>
          <TableCell>公司</TableCell>
          <TableCell>產業</TableCell>
          <TableCell>國家</TableCell>
          <TableCell align="right">PE</TableCell>
          <TableCell align="right">殖利率</TableCell>
          <TableCell align="right">市值</TableCell>
          <TableCell align="right">綜合分數</TableCell>
          <TableCell align="center">操作</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map(r => (
          <TableRow key={r.symbol} hover>
            <TableCell>{r.symbol}</TableCell>
            <TableCell>{r.name}</TableCell>
            <TableCell>{r.sector}</TableCell>
            <TableCell>{r.country}</TableCell>
            <TableCell align="right">{r.pe?.toFixed(1)}</TableCell>
            <TableCell align="right">{r.div_yield?.toFixed(1)}%</TableCell>
            <TableCell align="right">{r.mkt_cap?.toFixed(0)}</TableCell>
            <TableCell align="right">{r.composite?.toFixed(2)}</TableCell>
            <TableCell align="center">
              <IconButton size="small" onClick={() => nav(`/detail/${r.symbol}`)}><InfoIcon /></IconButton>
              <IconButton size="small" onClick={() => addToStage(r.symbol)}><AddIcon /></IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}