import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link, Outlet, matchRoutes, useLocation } from "react-router-dom";

const menuItems: { title: string; path: string }[] = [
  { title: "Service Areas", path: "/hype/service-areas" },
  { title: "Robots", path: "/hype/robots" },
];

export default function HypePage() {
  const location = useLocation();
  const matchingRoutes = matchRoutes(menuItems, location);
  const matchingRoutePath = matchingRoutes?.[0]?.route?.path;

  return (
    <>
      <Typography
        component={Link}
        to="/hype"
        variant="h4"
        sx={{
          textDecoration: "none",
          color: "inherit",
          flexGrow: 1,
        }}
      >
        Hypervisor Panel
      </Typography>

      <Box>
        {menuItems.map((item) => (
          <Button
            component={Link}
            to={item.path}
            key={item.path}
            disabled={item.path === matchingRoutePath}
            sx={{ color: "inherit" }}
          >
            {item.title}
          </Button>
        ))}
      </Box>

      <Outlet />
    </>
  );
}
