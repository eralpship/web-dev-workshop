import { ThemeProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo } from "react";
import PageHeader from "./PageHeader";
import { Outlet } from "react-router-dom";

export default function PageLayout() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageHeader />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            width: {
              xs: "100%",
              sm: "70%",
              md: 750,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
