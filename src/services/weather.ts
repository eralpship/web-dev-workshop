const ACCUWEATHER_API_URL = "http://dataservice.accuweather.com";

export async function searchCity(city: string) {
  try {
    const response = await fetch(
      `${ACCUWEATHER_API_URL}/locations/v1/cities/search?apikey=${
        import.meta.env.VITE_ACCUWEATHER_API_KEY
      }&q=${city}`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Status ${response.status}. ${data.Message}`);
    }
    if (data.length === 0) {
      throw new Error(`No city found`);
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to search city ${city}. ${error.message}`);
    }
  }
}

export async function getWeatherConditions(cityKey: string) {
  try {
    const response = await fetch(
      `${ACCUWEATHER_API_URL}/currentconditions/v1/${cityKey}?apikey=${
        import.meta.env.VITE_ACCUWEATHER_API_KEY
      }`
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`Status ${response.status}. ${data.Message}`);
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Failed to get conditions for cityKey ${cityKey}. ${error.message}`
      );
    }
  }
}
