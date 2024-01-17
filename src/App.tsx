import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import CityWeatherContainer from "./components/CityWeatherContainer";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <h1>Starship Web Dev Workshop</h1>
        <div className="forecasts-container">
          <CityWeatherContainer city="London" />
          <CityWeatherContainer city="Helsinki" />
          <CityWeatherContainer city="Melbourne" />
        </div>
      </>
    </QueryClientProvider>
  );
}

export default App;
