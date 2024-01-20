import Typography from "@mui/material/Typography";
import useWeatherConditions from "../hooks/useWeatherConditions";
import { useCallback } from "react";
import { accuWeatherIconMap } from "../utils/weather";
import { ErrorOutlined } from "@mui/icons-material";

type WeatherForecastProps = {
  city: string;
};

export default function WeatherForecast(props: WeatherForecastProps) {
  const { weatherText, temperature, weatherIcon } = useWeatherConditions(
    props.city
  );

  const WeatherIcon = useCallback(() => {
    const IconComponent = accuWeatherIconMap[weatherIcon] ?? ErrorOutlined;
    return <IconComponent sx={{ fontSize: "5em" }} />;
  }, [weatherIcon]);

  return (
    <>
      <Typography variant="h3" component="div">
        {temperature}°C
      </Typography>
      <WeatherIcon />
      <Typography variant="h6" component="div" color="text.secondary">
        {weatherText}
      </Typography>
    </>
  );
}
