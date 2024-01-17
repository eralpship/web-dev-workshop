import * as WeatherApi from "../services/weather";
import { useSuspenseQuery } from "@tanstack/react-query";

export default function useWeatherConditions(city: string) {
  const citySearchQuery = useSuspenseQuery({
    queryKey: ["search-city", city],
    queryFn: () => WeatherApi.searchCity(city),
  });

  const citySearchData = citySearchQuery.data;
  const cityKey = citySearchData?.[0]?.Key;

  const weatherConditionsQuery = useSuspenseQuery({
    queryKey: ["weather-conditions", cityKey],
    queryFn: () => {
      if (!cityKey) {
        return null;
      }
      return WeatherApi.getWeatherConditions(cityKey);
    },
  });

  const weatherConditionsData = weatherConditionsQuery.data;
  const weatherText = weatherConditionsData?.[0]?.WeatherText;
  const weatherIcon = weatherConditionsData?.[0]?.WeatherIcon;
  const temperature = weatherConditionsData?.[0]?.Temperature?.Metric?.Value;

  return {
    weatherText,
    weatherIcon,
    temperature,
  };
}
