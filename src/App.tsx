import "./App.css";
import { useState } from "react";
import WeatherForecast from "./components/WeatherForecast";

function App() {
  const [selectedCity, updateSelectedCity] = useState<string | null>(null);

  const handleOnForecastCityClicked = (city: string) => {
    updateSelectedCity(city);
  };

  return (
    <>
      <h1>Starship Web Dev Workshop</h1>
      <h3>Selected city: {selectedCity}</h3>
      <div className="forecasts-container">
        <WeatherForecast
          city="London"
          temperature={10}
          description="Rainy"
          icon="🌧"
          onClick={handleOnForecastCityClicked}
        />
        <WeatherForecast
          city="Helsinki"
          temperature={-12}
          description="Cloudy"
          icon="🌥"
          onClick={handleOnForecastCityClicked}
        />
        <WeatherForecast
          city="Melbourne"
          temperature={22}
          description="Sunny"
          icon="☀️"
          onClick={handleOnForecastCityClicked}
        />
      </div>
    </>
  );
}

export default App;
