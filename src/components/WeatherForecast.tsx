import "./WeatherForecast.css";

type WeatherForecastProps = {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  onClick: (city: string) => void;
};

export default function WeatherForecast(props: WeatherForecastProps) {
  const handleOnClick = () => {
    props.onClick(props.city);
  };
  return (
    <div className="weather-forecast" onClick={handleOnClick}>
      <div className="weather-forecast-title">Weather in {props.city}</div>
      <div className="weather-forecast-icon">{props.icon}</div>
      <div className="weather-forecast-value">
        {props.temperature}°C {props.description}
      </div>
    </div>
  );
}
