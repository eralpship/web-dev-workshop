import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { StyledEngineProvider } from "@mui/material/styles";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const graphqlClient = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ApolloProvider client={graphqlClient}>
        <App />
      </ApolloProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
