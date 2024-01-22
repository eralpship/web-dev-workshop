# React Basics

Let's learn the basics of react by trying to make something little bit more useful. We will be making a weather application!

- Rename `src/components/MyComponent.tsx` file to `src/components/WeatherForecast.tsx`
- Rename the function name from `MyComponent` to `WeatherForecast`.
- Update the import of the component in `src/App.tsx`.
- Clean up `src/App.tsx` by removing the React example code we don't need.

Then your "src/components/WeatherForecast.tsx" should look like this

```tsx
export default function WeatherForecast() {
  return null; // Returning null means we show "nothing"
}
```

And your **src/App.tsx** should look like this;

```tsx
import "./App.css";
import WeatherForecast from "./components/WeatherForecast"; // This used to be MyComponent

function App() {
  return (
    <>
      <h1>Starship Web Dev Workshop</h1>
      <div>
        <WeatherForecast />
        {/* We deleted code from here. You put comments like this in jsx */}
      </div>
    </>
  );
}

export default App;
```

When we go to [localhost:8000](https://localhost:8000) we should see a page like this.

![start](assets/react-basics-start.png)

Let's go back to `WeatherForecast.tsx` and show some arbitrary weather forecasts.

```tsx
import "./WeatherForecast.css";

export default function WeatherForecast() {
  return (
    <div className="weather-forecast">
      <div className="weather-forecast-title">Weather in Somewhere</div>
      <div className="weather-forecast-icon">🌤</div>
      <div className="weather-forecast-value">25°C Partly Sunny</div>
    </div>
  );
}
```

Create a new CSS file `WeatherForecast.css` next to `WeatherForecast.tsx` and add the styles below to the .css file:

```css
.weather-forecast {
  display: flex; /* Sets the display property of the element to flex */
  padding: 1.5em; /* Adds padding to all sides of the element */
  flex-direction: column; /* Sets the direction of flex items to be stacked vertically */
  flex-wrap: wrap; /* Allows flex items to wrap onto multiple lines if needed */
  justify-content: center; /* Aligns flex items along the vertical center of the container */
  border: 1px solid #ccc; /* Adds a 1px solid border with the color */
  border-radius: 0.5em; /* Rounds the corners of the element with a radius*/
  gap: 1em; /* Sets the gap between flex items*/
}

.weather-forecast-title {
  font-size: 2.5em;
}

.weather-forecast-value {
  font-weight: 600;
  font-size: 2em;
}

.weather-forecast-icon {
  font-size: 6em;
}
```

Vite knows how to collect all the css we've used and bundle it into single js and css files.
When you browse `localhost:8000` it should look like this:

![static weather](assets/weather-component-static.png)

## Using props

Let's say we'd like to show another locations weather without copy pasting the code in `WeatherForecast` component. How would we achieve this?

We can supply some variable data to the component and read the variables to show them dynamically. This is called passing props. Props are properties of a function.

React is fundamentally a UI renderer similar to a math function that takes data as an input and outputs UI as a result.

`F(DATA) -> UI`

In this case `F` is our component. Data is the `props` and `UI` is what the component looks like when it is used in the layout.

### Sending in values

Let's modify the `WeatherForecast` function so that it can take props.

We add a new type `WeatherForecastProps` and use it as the type of the parameter which our function, here our component, takes.

```tsx
import "./WeatherForecast.css";

type WeatherForecastProps = {
  city: string;
  temperature: number;
  description: string;
  icon: string;
};

export default function WeatherForecast(props: WeatherForecastProps) {
  return (
    <div className="weather-forecast">
      <div className="weather-forecast-title">Weather in {props.city}</div>
      <div className="weather-forecast-icon">{props.icon}</div>
      <div className="weather-forecast-value">
        {props.temperature}°C {props.description}
      </div>
    </div>
  );
}
```

Next we modify `src/App.tsx` so that we supply the parameters (props) to `WeatherForecast` function (component).

```diff
  ...
  <div>
-   <WeatherForecast />
+   <WeatherForecast
+      city={"London"}
+      temperature={10}
+      description={"Rainy"}
+      icon={"🌧"}
+    />
  </div>
  ...
```

Now that our component is configurable with props, we can reuse the component code and styles for displaying other cities. Let's add 2 other cities.

```diff
 ...
 <div>
   <WeatherForecast
     city="London"
     temperature={10}
     description="Rainy"
     icon="🌧"
   />
+  <WeatherForecast
+    city="Helsinki"
+    temperature={-12}
+    description="Cloudy"
+    icon="🌥"
+  />
+  <WeatherForecast
+    city="Melbourne"
+    temperature={22}
+    description="Sunny"
+    icon="☀️"
+  />
 </div>
 ...
```

Now `localhost:8000` should look like this:

![multiple-1](assets/static-weather-multiple.png)

Let's add some styles so it looks bit nicer.

Add this class to the end of `App.css`

```css
.forecasts-container {
  display: flex;
  flex-direction: row;
  justify-content: center; /* centers items in this element horizontally */
  gap: 1em;
  font-size: 0.5em;
}
```

Also add to `App.tsx` the css className.

```diff
 ...
 return (
   <>
     <h1>Starship Web Dev Workshop</h1>
_    <div>
+    <div className="forecasts-container">
       <WeatherForecast
         city="London"
  ...
```

Now we should see that the location blocks got smaller and are now displayed next to each other.
Notice that we didn't modify the font sizes in the classes of `WeatherForecast.css` yet. The reason they got smaller is because we gave containing `forecasts-container` the font-size of `0.5em`. This is the expected behavior of `em` so that the values are relative to their containers. If we set a particular `px` (pixel) value, this wouldn't happen as the text size wouldn't be relative.

Normally, we use a [CSS feature called flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox) is used to alter relative sizes of elements, but for demonstration purposes we've used `em` here. We will learn more about proper ways of CSS later on the course.

![horizontal](assets/static-forecasts-horizontal.png)

### Sending in callbacks

Say we wanted the component to somehow alert us when it has been clicked. We can implement this by using callbacks.
Callbacks are regular functions passed in as props just like how we passed in values of cities, temperatures and icons. When a reference of a function is passed to a component, the component calls the function and the function is executed at the sender's side.

In our case, we will add an `onClick` prop to our `WeatherForecast` component. This way the `onClick` callback function is sent from the `App` root component to the`WeatherForecast` component and is executed at the `App`.

This is kind of like, saying "Hey, alert me when there's something going on" to the `WeatherForecast` component. For now, let's simply log a click to the console.

We can add the `onClick` to the type of the prop argument of the `WeatherForecast` and pass it as an event handler to the root element of the component as so:

```diff
 ...
 type WeatherForecastProps = {
   city: string;
   temperature: number;
   description: string;
   icon: string;
+  onClick: (city: string) => void;
 };

 export default function WeatherForecast(props: WeatherForecastProps) {
+  const handleOnClick = () => {
+    console.log(props.city + " clicked");
+  };
   return (
-    <div className="weather-forecast">
+    <div className="weather-forecast" onClick={handleOnClick}>
       <div className="weather-forecast-title">Weather in {props.city}</div>
       <div className="weather-forecast-icon">{props.icon}</div>
  ...
```

Browse to `localhost:8000` and reveal the javascript console (option + cmd + j on mac). Try then clicking on the city components and you should see these logs appearing.

![clicking things](assets/onclick-handler.png)

Next, we will add the `onClick` callback to the `App` root component so that the `onClick` callback function can be handled at the `App` root component's side.

In **src/App.tsx** let's create the handler function and pass it along to each implementation of the `WeatherForecast` component;

```diff
 function App() {
+   const handleOnForecastCityClicked = (city: string) => {
+     console.log(city + " clicked");
+   };
   return (
     <>
       <h1>Starship Web Dev Workshop</h1>
       <div className="forecasts-container">
         <WeatherForecast
           city="London"
           temperature={10}
           description="Rainy"
           icon="🌧"
+          onClick={handleOnForecastCityClicked}
         />
         <WeatherForecast
           city="Helsinki"
           temperature={-12}
           description="Cloudy"
           icon="🌥"
+          onClick={handleOnForecastCityClicked}
         />
         <WeatherForecast
           city="Melbourne"
           temperature={22}
           description="Sunny"
           icon="☀️"
+          onClick={handleOnForecastCityClicked}
         />
       </div>
     </>
   );
 }
```

Now the `App` parent component is given the callback functions as props and it is expecting `WeatherForecast` instances to call them. Let's implement the functionality that calls the callback function coming as a prop.

In **src/components/WeatherForecast.tsx** replace the console logging with a prop function call. We pass a city as a parameter so that `App` gets which city was clicked:

```diff
...
 export default function WeatherForecast(props: WeatherForecastProps) {
   const handleOnClick = () => {
-    console.log(props.city + " clicked");
+    props.onClick(props.city);
   };
   return (
 ...
```

If you try clicking on the cities again you will see the same console logs appearing, but now they are logged from the `App` root component.

## Using the state hook

Let's keep track of which city was clicked by visualizing the choice.

In **App.tsx** add a new subtitle above the forecast components and below the title.

```diff
...
   <h1>Starship Web Dev Workshop</h1>
+  <h3>Selected city: {}</h3>
   <div className="forecasts-container">
...
```

To keep track of things in React, we use the **"state hook"**. It is a special function provided by the React library that we can use in our components. When implemented it looks like this:

```js
// javascript
const [value, updateValue] = useState(initialValue);
```

value: is the current value of the state

updateValue: is a function that we call to set a different value to the state

Calling `useState(initialValue)` keeps track of the current state and **triggers a re-render of the component only when the value gets updated**.

This means we don't need to check the current value in a loop or register an event listener. When we use the state hook React is smart enough to know when it needs to re-paint the screen.

In our case;

```ts
// typescript
const [selectedCity, updateSelectedCity] = useState<string | null>(null);
```

We put `null` as `initialValue` because no city is selected yet.
Let's implement this in `App.tsx`:

```diff
 import "./App.css";
+import { useState } from "react";
 import WeatherForecast from "./components/WeatherForecast";

 function App() {
+  const [selectedCity, updateSelectedCity] = useState<string | null>(null);

   const handleOnForecastCityClicked = (city: string) => {
-    console.log(city + " clicked");
+    updateSelectedCity(city);
   };

   return (
     <>
       <h1>Starship Web Dev Workshop</h1>
-      <h3>Selected city: {}</h3>
+      <h3>Selected city: {selectedCity}</h3>
       <div className="forecasts-container">
         <WeatherForecast
           city="London"
 ...
```

Now when we open `localhost:8000` and click on the cities we should see the value next to "Selected city" change.

Checkout the branch `react-basics` for the latest state of the files.

https://github.com/eralpship/web-dev-workshop/assets/106536625/b9fc6dc2-d745-4527-b8e4-6b6943175322
