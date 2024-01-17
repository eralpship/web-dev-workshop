type WeatherForecastErrorProps = {
  message: string;
};

export default function WeatherForecastError({
  message,
}: WeatherForecastErrorProps) {
  return (
    <div className="weather-forecast">
      <div className="weather-forecast-icon">⚠️</div>
      <div className="weather-forecast-title">{message}</div>
    </div>
  );
}
