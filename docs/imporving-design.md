# Improving Design

Let's work on the design a bit. We will try to address these issues;
- We are missing many icons, we have been using substitute emojis
- Weather condition icon id's are shown as numbers

## MUI (Material UI library)

We will implement the [material ui](https://mui.com/material-ui/getting-started/installation/) library.
MUI gives us good looking basic pre designed components that we can build our ui's blocks they provide.
It has a layout system, many kinds of buttons and containers, tables and much more.

We use this extensively in Starship operations services tools like Hype Panel. And partially in Ground Control App as well. (Material ui is implemented in React Native through Paper ui library)

To begin, install the npm modules

```bash
npm install @mui/material @emotion/react @emotion/styled @fontsource/roboto @mui/icons-material
```

We install these modules

- `@mui/material` : the ui library
- `@emotion/styled`  : the styling library
- `@emotion/react`  : styling library bindings for react
- `@fontsource/roboto`  : font
- `@mui/icons-material` : icon package

Add the roboto font as dependency to our app so it gets bundled

**src/App.tsx**

```diff
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import "./App.css";
  import CityWeatherContainer from "./components/CityWeatherContainer";
  
+ import "@fontsource/roboto/300.css";
+ import "@fontsource/roboto/400.css";
+ import "@fontsource/roboto/500.css";
+ import "@fontsource/roboto/700.css";
  
  const queryClient = new QueryClient();
  
  function App() {
    return (
  ...
```

remember to run `npm run dev` in docker shell again.

Let's test if MUI is installed correctly by adding a button temporarily to root page

**src/App.tsx**
```diff
  import "@fontsource/roboto/500.css";
  import "@fontsource/roboto/700.css";
  
+ import Button from "@mui/material/Button";
  
  const queryClient = new QueryClient();
  
  function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <>
+         <Button variant="contained">MUI Button</Button>
          <h1>Starship Web Dev Workshop</h1>
          <div className="forecasts-container">
            <CityWeatherContainer city="London" />
```

You should see a button above the title. If you don't something might have gone wrong.

![mui button test](assets/mui-button-test.png)

Let's roll the changes above back. We won't need this button here.
