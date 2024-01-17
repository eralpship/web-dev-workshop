import { Suspense } from "react";
import WeatherForecast from "./WeatherForecast";
import WeatherForecastLoading from "./WeatherForecastLoading";
import { ErrorBoundary } from "react-error-boundary";
import WeatherForecastError from "./WeatherForecastError";

type CityWeatherContainerProps = {
  city: string;
};

export default function CityWeatherContainer({
  city,
}: CityWeatherContainerProps) {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => (
        <WeatherForecastError message={error.message} />
      )}
    >
      <Suspense fallback={<WeatherForecastLoading />}>
        <WeatherForecast city={city} />
      </Suspense>
    </ErrorBoundary>
  );
}
