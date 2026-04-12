import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { Link } from "react-router";

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to={"/"}>
            <Button
              color="inherit"
              style={{
                color: "white",
              }}
            >
              Home
            </Button>
          </Link>

          <Box>
            <Link to={"/login"}>
              <Button
                color="inherit"
                style={{
                  color: "white",
                }}
              >
                Login
              </Button>
            </Link>

            <Link to={"/register"}>
              <Button
                color="inherit"
                style={{
                  color: "white",
                }}
              >
                Register
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
