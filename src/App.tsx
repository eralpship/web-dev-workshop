import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import CityWeatherContainer from "./components/CityWeatherContainer";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Button from "@mui/material/Button";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Button variant="contained">MUI Button</Button>
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
