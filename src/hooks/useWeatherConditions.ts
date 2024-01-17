import * as WeatherApi from "../services/weather";
import { useQuery } from "@tanstack/react-query";

export default function useWeatherConditions(city: string) {
  const citySearchQuery = useQuery({
    queryKey: ["search-city", city],
    queryFn: () => WeatherApi.searchCity(city),
  });

  const citySearchData = citySearchQuery.data;
  const cityKey = citySearchData?.[0]?.Key;

  const weatherConditionsQuery = useQuery({
    queryKey: ["weather-conditions", cityKey],
    queryFn: () => WeatherApi.getWeatherConditions(cityKey),
    enabled: Boolean(cityKey),
  });

  const weatherConditionsData = weatherConditionsQuery.data;
  const weatherText = weatherConditionsData?.[0]?.WeatherText;
  const weatherIcon = weatherConditionsData?.[0]?.WeatherIcon;
  const temperature = weatherConditionsData?.[0]?.Temperature?.Metric?.Value;

  const reload = () => {
    citySearchQuery.refetch();
    weatherConditionsQuery.refetch();
  };
  const loading = citySearchQuery.isLoading || weatherConditionsQuery.isLoading;
  const error = citySearchQuery.error || weatherConditionsQuery.error;

  return {
    weatherText,
    weatherIcon,
    temperature,
    loading,
    error,
    reload,
  };
}
