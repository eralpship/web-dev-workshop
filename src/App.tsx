import "./App.css";
import CityWeatherContainer from "./components/CityWeatherContainer";

function App() {
  return (
    <>
      <h1>Starship Web Dev Workshop</h1>
      <div className="forecasts-container">
        <CityWeatherContainer city="London" />
        <CityWeatherContainer city="Helsinki" />
        <CityWeatherContainer city="Melbourne" />
      </div>
    </>
  );
}

export default App;
