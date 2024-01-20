import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const menuItems: { title: string; path: string }[] = [
  { title: "Home", path: "/" },
  { title: "Weather", path: "/weather" },
];

export default function PageHeader() {
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
          Starship Web Dev Workshop
        </Typography>
        <Box>
          {menuItems.map((item) => (
            <Button component={Link} to={item.path} key={item.title}>
              {item.title}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
