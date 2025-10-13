import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import Browse from "./pages/Browse";
import Detail from "./pages/Detail";
import Stage from "./pages/Stage";
import Final from "./pages/Final";

export default function App() {
  return (
    <Box>
      <AppBar position="static"><Toolbar>
        <Typography variant="h6" sx={{ flex: 1 }}>Quant Stock Picker</Typography>
        <Button color="inherit" component={Link} to="/">瀏覽</Button>
        <Button color="inherit" component={Link} to="/stage">暫存清單</Button>
      </Toolbar></AppBar>
      <Container sx={{ my: 2 }}>
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/detail/:symbol" element={<Detail />} />
          <Route path="/stage" element={<Stage />} />
          <Route path="/final" element={<Final />} />
        </Routes>
      </Container>
    </Box>
  );
}