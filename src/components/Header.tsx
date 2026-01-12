import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static" data-testid="mui-appbar">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Joke Generator
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            data-testid="mui-button"
            color="inherit"
            component={RouterLink}
            to="/"
          >
            home
          </Button>

          <Button
            data-testid="mui-button"
            color="inherit"
            component={RouterLink}
            to="/saved"
          >
            saved
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
