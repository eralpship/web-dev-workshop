import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import HomePage from "./pages/HomePage";
import HypePage from "./pages/HypePage";
import NotFoundPage from "./pages/NotFoundPage";
import ServiceAreaDetailPage from "./pages/ServiceAreaDetailPage";
import ServiceAreasPage from "./pages/ServiceAreasPage";
import WeatherPage from "./pages/WeatherPage";
import RobotsPage from "./pages/RobotsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PageLayout />}>
            <Route index element={<HomePage />} />
            <Route path="weather" element={<WeatherPage />} />
            <Route path="hype/" element={<HypePage />}>
              <Route index element={<Navigate to="service-areas" />} />
              <Route
                index
                path="service-areas"
                element={<ServiceAreasPage />}
              />
              <Route
                path="service-area/:id"
                element={<ServiceAreaDetailPage />}
              />
              <Route path="robots" element={<RobotsPage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
