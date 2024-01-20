import { Suspense } from "react";
import WeatherForecast from "./WeatherForecast";
import WeatherForecastLoading from "./WeatherForecastLoading";
import { ErrorBoundary } from "react-error-boundary";
import WeatherForecastError from "./WeatherForecastError";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

type CityWeatherContainerProps = {
  city: string;
};

export default function CityWeatherContainer({
  city,
}: CityWeatherContainerProps) {
  return (
    <Box sx={{ flex: 1 }}>
      <Card variant="outlined">
        <CardHeader title={city} />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ErrorBoundary
            fallbackRender={({ error }) => (
              <WeatherForecastError message={error.message} />
            )}
          >
            <Suspense fallback={<WeatherForecastLoading />}>
              <WeatherForecast city={city} />
            </Suspense>
          </ErrorBoundary>
        </CardContent>
      </Card>
    </Box>
  );
}
