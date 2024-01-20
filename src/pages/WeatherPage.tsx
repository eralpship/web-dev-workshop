import CityWeatherContainer from "../components/CityWeatherContainer";
import Box from "@mui/material/Box";

export default function WeatherPage() {
  return (
    <div>
      <h2>Weather Page</h2>
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
    </div>
  );
}
