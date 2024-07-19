import React from "react";
import { Box, Container, Grid } from "@mui/material";
//Components
import WeatherCard from "../components/WeatherCard";
import SearchHistory from "../components/SearchHistory";
import ThemeSwitcher from "../components/ThemeSwitcher";
//Theme
import { useTheme } from "@mui/material/styles";

import cloudBg from "../assets/bg-cloud.png";

const DashBoard = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage:
          theme.palette.mode === "dark"
            ? "linear-gradient(#5936B4, #362A84)"
            : "linear-gradient(#C196DD, #8D71D0)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          backgroundImage: `url(${cloudBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <ThemeSwitcher />
        <Container sx={{ height: "100%", display: "flex" }}>
          <Grid
            container
            gap={1}
            justifyContent="space-between"
            p={2}
            flexGrow={1}
          >
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <WeatherCard />
            </Grid>
            <Grid item xs={12} sm={12} md={7.8} lg={7.8}>
              <SearchHistory />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default DashBoard;
