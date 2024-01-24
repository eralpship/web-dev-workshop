import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WeatherPage from "./pages/WeatherPage";
import NotFoundPage from "./pages/NotFoundPage";
import PageLayout from "./components/PageLayout";
import HypePage from "./pages/HypePage";
import ServiceAreasPage from "./pages/ServiceAreasPage";
import ServiceAreaDetailPage from "./pages/ServiceAreaDetailPage";

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
              <Route index element={<ServiceAreasPage />} />
              <Route
                path="service-area/:id"
                element={<ServiceAreaDetailPage />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
