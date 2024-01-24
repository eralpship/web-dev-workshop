import Typography from "@mui/material/Typography";
import { Link, Outlet } from "react-router-dom";

export default function HypePage() {
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
      <Outlet />
    </>
  );
}
