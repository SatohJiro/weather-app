import React, { useContext } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
// Data
import { SearchHistoryContext } from "../context/SearchHistoryContext";
// Components
import WeatherDetail from "./common/WeatherDetail";
// Assets
import earthBg from "../assets/earth-bg.png";

const WeatherCard = () => {
  const { weatherData, isLoading } = useContext(SearchHistoryContext);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "300px",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "15px",
        backdropFilter: "blur(15px)",
        position: "relative",
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          <CircularProgress />
        </Box>
      ) : weatherData ? (
        <WeatherDetail weatherData={weatherData} />
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <img width="50%" src={earthBg} alt="earth" />
          <Typography variant="subtitle1" fontWeight="bold">
            Where are you looking today?
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default WeatherCard;
