import { useCallback, useEffect, useState } from "react";

export default function useWeatherConditions(city: string) {
  const [weatherText, setWeatherText] = useState<string | null>(null);
  const [weatherIcon, setWeatherIcon] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);

    const citySearchResponse = await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=APIKEYHERE&q=${city}`
    );
    const citySearchData = await citySearchResponse.json();
    const cityKey = citySearchData?.[0]?.Key;

    const weatherConditionsResponse = await fetch(
      "http://dataservice.accuweather.com/currentconditions/v1/" +
        cityKey +
        "?apikey=APIKEYHERE"
    );
    const weatherConditionsData = await weatherConditionsResponse.json();
    const weatherText = weatherConditionsData?.[0]?.WeatherText;
    const weatherIcon = weatherConditionsData?.[0]?.WeatherIcon;
    const temperature = weatherConditionsData?.[0]?.Temperature?.Metric?.Value;

    setWeatherText(weatherText);
    setWeatherIcon(weatherIcon);
    setTemperature(temperature);

    setLoading(false);
  }, [city]);

  useEffect(() => {
    reload();
  }, [city, reload]);

  return {
    weatherText,
    weatherIcon,
    temperature,
    reload,
    loading,
  };
}
