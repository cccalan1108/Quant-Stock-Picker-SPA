import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: { mode: "light", primary: { main: "#1976d2" } },
  typography: { fontFamily: ["Noto Sans TC", "Roboto", "Arial", "sans-serif"].join(", ") }
});