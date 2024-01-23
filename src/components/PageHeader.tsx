import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link, matchRoutes, useLocation } from "react-router-dom";

const menuItems: { title: string; path: string }[] = [
  { title: "Home", path: "/" },
  { title: "Weather", path: "/weather" },
  { title: "Hype", path: "/hype" },
];

export default function PageHeader() {
  const location = useLocation();
  const matchingRoutes = matchRoutes(menuItems, location);
  const matchingRoutePath = matchingRoutes?.[0]?.route?.path;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{
            textDecoration: "none",
            color: "inherit",
            flexGrow: 1,
          }}
        >
          Web Dev Day
        </Typography>
        <Box>
          {menuItems.map((item) => (
            <Button
              component={Link}
              to={item.path}
              key={item.title}
              disabled={item.path === matchingRoutePath}
              sx={{ color: "inherit" }}
            >
              {item.title}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
