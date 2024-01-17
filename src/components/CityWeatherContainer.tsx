import useWeatherConditions from "../hooks/useWeatherConditions";
import WeatherForecast from "./WeatherForecast";
import WeatherForecastError from "./WeatherForecastError";
import WeatherForecastLoading from "./WeatherForecastLoading";

type CityWeatherContainerProps = {
  city: string;
};

export default function CityWeatherContainer({
  city,
}: CityWeatherContainerProps) {
  const { reload, weatherIcon, weatherText, temperature, loading, error } =
    useWeatherConditions(city);

  if (error) {
    return <WeatherForecastError message={error.message} />;
  }

  if (loading) {
    return <WeatherForecastLoading />;
  }

  return (
    <WeatherForecast
      city={city}
      temperature={temperature}
      description={weatherText}
      icon={weatherIcon}
      onClick={reload}
    />
  );
}
