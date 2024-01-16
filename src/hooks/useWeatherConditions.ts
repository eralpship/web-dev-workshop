import { useState } from "react";

export default function useWeatherConditions(city: string) {
  const [weatherText, setWeatherText] = useState<string | null>(null);
  const [weatherIcon, setWeatherIcon] = useState<string | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);

  const reload = async () => {
    const citySearchResponse = await fetch(
      `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=MWpmYqFZNAq2XRVoVu8HQs9zkCiPmkAd&q=${city}`
    );
    const citySearchData = await citySearchResponse.json();
    const cityKey = citySearchData?.[0]?.Key;
    console.log("city key", cityKey);

    const weatherConditionsResponse = await fetch(
      "http://dataservice.accuweather.com/currentconditions/v1/" +
        cityKey +
        "?apikey=MWpmYqFZNAq2XRVoVu8HQs9zkCiPmkAd"
    );
    const weatherConditionsData = await weatherConditionsResponse.json();
    const weatherText = weatherConditionsData?.[0]?.WeatherText;
    const weatherIcon = weatherConditionsData?.[0]?.WeatherIcon;
    const temperature = weatherConditionsData?.[0]?.Temperature?.Metric?.Value;

    setWeatherText(weatherText);
    setWeatherIcon(weatherIcon);
    setTemperature(temperature);
  };

  return {
    weatherText,
    weatherIcon,
    temperature,
    reload,
  };
}
