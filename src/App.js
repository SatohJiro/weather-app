import React from "react";
import SearchHistoryContextProvider from "./context/SearchHistoryContext";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import DashBoard from "./pages/dashboard";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getDesignTokens, getThemedComponents } from "./theme";
import { ColorModeContext } from "./config/ColorContext";

import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = React.useState();

  React.useEffect(() => {
    setMode(prefersDarkMode ? "dark" : "light");
  }, [prefersDarkMode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  let theme = React.useMemo(
    () =>
      createTheme(deepmerge(getDesignTokens(mode), getThemedComponents(mode))),
    [mode]
  );

  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <SearchHistoryContextProvider>
          <CssBaseline />
          <DashBoard />
          <ToastContainer
            theme={mode}
            autoClose={2000}
            pauseOnFocusLoss={false}
          />
        </SearchHistoryContextProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
