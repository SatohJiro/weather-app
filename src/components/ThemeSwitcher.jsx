import React, { useContext, useEffect } from "react";
import { Typography, Stack, Box, IconButton } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "../config/ColorContext";
import { SearchHistoryContext } from "../context/SearchHistoryContext";
import SearchBar from "./SearchBar";
//assets
import cloudSvg from "../assets/cloud.svg";

const ThemeSwitcher = () => {
  const theme = useTheme();
  const isDownMobileBreakPoint = useMediaQuery(theme.breakpoints.down("md"));
  const colorMode = useContext(ColorModeContext);
  const { isMobile, setMobile } = useContext(SearchHistoryContext);

  useEffect(() => {
    setMobile(isDownMobileBreakPoint);
  }, [isDownMobileBreakPoint, setMobile]);

  return (
    <Box
      sx={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
      }}
      position="static"
    >
      <Stack
        p="10px"
        height="80px"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        {!isMobile && (
          <Box display="flex" justifyContent="space-around" alignItems="center">
            <Typography variant="h6" fontWeight="bold" mr={1}>
              Today's Weather
            </Typography>
            <img src={cloudSvg} alt="cloud" width="80px"></img>
          </Box>
        )}
        <SearchBar />

        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Stack>
    </Box>
  );
};

export default ThemeSwitcher;
