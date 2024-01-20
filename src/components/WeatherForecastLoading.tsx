import { CircularProgress } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

export default function WeatherForecastLoading() {
  return (
    <>
      <Typography variant="h3" component="div">
        <Skeleton variant="text" width={150} animation="wave" />
      </Typography>
      <CircularProgress size="5em" />
      <Typography variant="h6" component="div" color="text.secondary">
        <Skeleton variant="text" width={150} animation="wave" />
      </Typography>
    </>
  );
}
