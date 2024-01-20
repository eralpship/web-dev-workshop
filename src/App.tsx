import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CityWeatherContainer from "./components/CityWeatherContainer";
import PageLayout from "./components/PageLayout";
import Box from "@mui/material/Box";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PageLayout>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            padding: 2,
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            },
          }}
        >
          <CityWeatherContainer city="London" />
          <CityWeatherContainer city="Helsinki" />
          <CityWeatherContainer city="Melbourne" />
        </Box>
      </PageLayout>
    </QueryClientProvider>
  );
}

export default App;
