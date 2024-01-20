import CityWeatherContainer from "../components/CityWeatherContainer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function WeatherPage() {
  return (
    <>
      <Typography variant="h4" component="h2">
        Weather
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          width: "100%",
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
    </>
  );
}
