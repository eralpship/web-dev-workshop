# Adding Pages

Websites usually have more than one page. We could learn how we can add more pages as well.

We'll use [react-router](https://reactrouter.com/)'s BrowserRouter implementation.

React-Router is an utility for us to define our page routes and their react components. When user goes to the defined path, renders the corresponding component.

## Implementing React-Router

Let's remove `PageLayout` and move `CityWeatherContainer`s into a new file. 
And implement `react-router`'s `BrowserRouter` and `Routes`.

**src/App.tsx**

```diff
  import "@fontsource/roboto/500.css";
  import "@fontsource/roboto/700.css";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
- import CityWeatherContainer from "./components/CityWeatherContainer";
- import PageLayout from "./components/PageLayout";
- import Box from "@mui/material/Box";
+ import { Route, Routes, BrowserRouter } from "react-router-dom";
+ import HomePage from "./pages/HomePage";
+ import WeatherPage from "./pages/WeatherPage";
+ import NotFoundPage from "./pages/NotFoundPage";
 
  const queryClient = new QueryClient();
 
  function App() {
    return (
      <QueryClientProvider client={queryClient}>
-       <PageLayout>
-         <Box
-           sx={{
-             display: "flex",
-             gap: 1,
-             padding: 2,
-             flexDirection: {
-               xs: "column",
-               sm: "column",
-               md: "row",
-               lg: "row",
-               xl: "row",
-             },
-           }}
-         >
-           <CityWeatherContainer city="London" />
-           <CityWeatherContainer city="Helsinki" />
-           <CityWeatherContainer city="Melbourne" />
-         </Box>
-       </PageLayout>
+       <BrowserRouter>
+         <Routes>
+           <Route path="/" element={<HomePage />} />
+           <Route path="/weather" element={<WeatherPage />} />
+           <Route path="*" element={<NotFoundPage />} />
+         </Routes>
+       </BrowserRouter>
      </QueryClientProvider>
    );
  }
```

We defined 3 routes `HomePage`, `WeatherPage` and `NotFoundPage`.

Let's start implementing their components passed as element props

Move the weather components we removed from `App.tsx` into a new file `src/pages/WeatherPage.tsx`.

***src/pages/WeatherPage.tsx**

```tsx
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
```

Next create the home page component

**src/pages/HomePage.tsx**

```tsx
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <h2>Home Page</h2>
      <Link to="/weather">Weather</Link>
    </div>
  );
}
```

Finally the `NotFoundPage`

**src/pages/NotFoundPage.tsx**

```tsx
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h2>Not Found</h2>
      <Link to="/">Home</Link>
    </div>
  );
}
```

Now when you go to `localhost:8000` you should see a page has the title "Home Page" and has a link to weather page.

Clicking it will take you to `/weather` page.

You can click back in your browser to go back to `/` the Home page.

If you go to any other path than `/` or `/weather`, `NotFoundPage` will be rendered.

![router init](assets/router-init.gif)

## Nested Layouts

When we modified the `App.tsx` to implement `BrowserRouter` and `Routes`, we removed the `PageLayout` wrapper. Let's bring it back.


## Navigation menu