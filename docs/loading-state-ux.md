# Loading state & UX improvements

need to handle the state when we don't have data

let's first make weatherforecast accept null values

```diff
  type WeatherForecastProps = {
    city: string;
-   temperature: number;
+   temperature: number | null;
-   description: string;
+   description: string | null;
-   icon: string;
+   icon: string | null;
    onClick: (city: string) => void;
  };
  
  export default function WeatherForecast(props: WeatherForecastProps) {
    const handleOnClick = () => {
      props.onClick(props.city);
    };
    return (
      <div className="weather-forecast" onClick={handleOnClick}>
        <div className="weather-forecast-title">Weather in {props.city}</div>
-       <div className="weather-forecast-icon">{props.icon}</div>
+       <div className="weather-forecast-icon">{props.icon ?? "️🤷‍♀️"}</div>
        <div className="weather-forecast-value">
-         {props.temperature ?? "🤔"}°C {props.description}
+         {props.temperature ?? "🤔"}°C {props.description ?? "🤷‍♂️"}
        </div>
      </div>
    );
  }
```

![default values](assets/default-forecast-values.png) 

now weatherforecast accepets null values
check App.tsx squigglies gone

but we still show default values when loading
we should show a loading state instead

let's make a new component that composes these elements;
- loading of the data
- displaying loading state
- displaying errors
- displaying weather conditions

src/components/CityWeatherContainer.tsx

```tsx
import useWeatherConditions from "../hooks/useWeatherConditions";
import WeatherForecast from "./WeatherForecast";

type CityWeatherContainerProps = {
  city: string;
};

export default function CityWeatherContainer({
  city,
}: CityWeatherContainerProps) {
  const { reload, weatherIcon, weatherText, temperature } =
    useWeatherConditions(city);

  return (
    <WeatherForecast
      city={city}
      temperature={temperature}
      description={weatherText}
      icon={weatherIcon}
      onClick={reload}
    />
  );
}
```

now we can delete a lot of code. and reuse the new `CityWeatherContainer` we created instead. It composes all the functionality we are deleteting from `App.tsx` already per each city.

Let's implement our new component `CityWeatherContainer` for each city and delete all the code we won't use anymore.

src/App.tsx

```diff
  import "./App.css";
- import { useState } from "react";
- import WeatherForecast from "./components/WeatherForecast";
- import useWeatherConditions from "./hooks/useWeatherConditions";
  import CityWeatherContainer from "./components/CityWeatherContainer";
  
  function App() {
-   const [selectedCity, updateSelectedCity] = useState<string | null>(null);
-   const helsinkiWeather = useWeatherConditions("helsinki");
-   const londonWeather = useWeatherConditions("london");
-   const melbourneWeather = useWeatherConditions("melbourne");
- 
-   const handleOnForecastCityClicked = (city: string) => {
-     if (city.toLowerCase() === "helsinki") {
-       helsinkiWeather.reload();
-     }
-     if (city.toLowerCase() === "london") {
-       londonWeather.reload();
-     }
-     if (city.toLowerCase() === "melbourne") {
-       melbourneWeather.reload();
-     }
-     updateSelectedCity(city);
-   };
  
    return (
      <>
        <h1>Starship Web Dev Workshop</h1>
-       <h3>Selected city: {selectedCity}</h3>
        <div className="forecasts-container">
-         <WeatherForecast
-           city="London"
-           temperature={londonWeather.temperature}
-           description={londonWeather.weatherText}
-           icon={londonWeather.weatherIcon}
-           onClick={handleOnForecastCityClicked}
-         />
+         <CityWeatherContainer city="London" />
-         <WeatherForecast
-           city="Helsinki"
-           temperature={helsinkiWeather.temperature}
-           description={helsinkiWeather.weatherText}
-           icon={helsinkiWeather.weatherIcon}
-           onClick={handleOnForecastCityClicked}
-         />
+         <CityWeatherContainer city="Helsinki" />
-         <WeatherForecast
-           city="Melbourne"
-           temperature={melbourneWeather.temperature}
-           description={melbourneWeather.weatherText}
-           icon={melbourneWeather.weatherIcon}
-           onClick={handleOnForecastCityClicked}
-         />
+         <CityWeatherContainer city="Melbourne" />
        </div>
      </>
    );
  }
  
  export default App;
```

resulting code would be this, much neater & shorter.

**src/App.tsx**

```tsx
import "./App.css";
import CityWeatherContainer from "./components/CityWeatherContainer";

function App() {
  return (
    <>
      <h1>Starship Web Dev Workshop</h1>
      <div className="forecasts-container">
        <CityWeatherContainer city="London" />
        <CityWeatherContainer city="Helsinki" />
        <CityWeatherContainer city="Melbourne" />
      </div>
    </>
  );
}

export default App;

```