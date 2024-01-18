import useWeatherConditions from "../hooks/useWeatherConditions";

type WeatherForecastProps = {
  city: string;
};

export default function WeatherForecast(props: WeatherForecastProps) {
  const { weatherIcon, weatherText, temperature } = useWeatherConditions(
    props.city
  );

  return (
    <div className="weather-forecast">
      <div className="weather-forecast-title">Weather in {props.city}</div>
      <div className="weather-forecast-icon">{weatherIcon ?? "️🤷‍♀️"}</div>
      <div className="weather-forecast-value">
        {temperature ?? "🤔"}°C {weatherText ?? "🤷‍♂️"}
      </div>
    </div>
  );
}
