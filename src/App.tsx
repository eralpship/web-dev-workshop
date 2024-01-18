import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CityWeatherContainer from "./components/CityWeatherContainer";
import PageLayout from "./components/PageLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageLayout>
        <div className="forecasts-container">
          <CityWeatherContainer city="London" />
          <CityWeatherContainer city="Helsinki" />
          <CityWeatherContainer city="Melbourne" />
        </div>
      </PageLayout>
    </QueryClientProvider>
  );
}

export default App;
