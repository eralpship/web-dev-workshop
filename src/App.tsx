import "./App.css";
import { useState } from "react";
import WeatherForecast from "./components/WeatherForecast";
import useWeatherConditions from "./hooks/useWeatherConditions";

function App() {
  const [selectedCity, updateSelectedCity] = useState<string | null>(null);
  const helsinkiWeather = useWeatherConditions("helsinki");
  const londonWeather = useWeatherConditions("london");
  const melbourneWeather = useWeatherConditions("melbourne");

  const handleOnForecastCityClicked = (city: string) => {
    helsinkiWeather.reload();
    londonWeather.reload();
    melbourneWeather.reload();
    updateSelectedCity(city);
  };

  return (
    <>
      <h1>Starship Web Dev Workshop</h1>
      <h3>Selected city: {selectedCity}</h3>
      <div className="forecasts-container">
        <WeatherForecast
          city="London"
          temperature={londonWeather.temperature}
          description={londonWeather.weatherText}
          icon={londonWeather.weatherIcon}
          onClick={handleOnForecastCityClicked}
        />
        <WeatherForecast
          city="Helsinki"
          temperature={helsinkiWeather.temperature}
          description={helsinkiWeather.weatherText}
          icon={helsinkiWeather.weatherIcon}
          onClick={handleOnForecastCityClicked}
        />
        <WeatherForecast
          city="Melbourne"
          temperature={melbourneWeather.temperature}
          description={melbourneWeather.weatherText}
          icon={melbourneWeather.weatherIcon}
          onClick={handleOnForecastCityClicked}
        />
      </div>
    </>
  );
}

export default App;
