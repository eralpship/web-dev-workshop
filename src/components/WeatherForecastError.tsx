import ErrorOutlined from "@mui/icons-material/ErrorOutlined";
import Typography from "@mui/material/Typography/Typography";

type WeatherForecastErrorProps = {
  message: string;
};

export default function WeatherForecastError({
  message,
}: WeatherForecastErrorProps) {
  return (
    <>
      <Typography variant="h3" component="div">
        Error
      </Typography>
      <ErrorOutlined sx={{ fontSize: "5em" }} />
      <Typography variant="h6" component="div" color="text.secondary">
        {message}
      </Typography>
    </>
  );
}
