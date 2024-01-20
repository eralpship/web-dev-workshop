import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <Typography variant="h4" component="h2">
        Choose a demo
      </Typography>
      <Button
        component={Link}
        to="/weather"
        variant="contained"
        color="primary"
      >
        Weather
      </Button>
    </>
  );
}
