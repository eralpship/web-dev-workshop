import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function NotFoundPage() {
  return (
    <>
      <Typography variant="h4" component="h2">
        Not Found
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Back to home
      </Button>
    </>
  );
}
