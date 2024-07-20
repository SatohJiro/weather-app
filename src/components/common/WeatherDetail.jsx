import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
//Helper
import { formatDate, getIconURL } from "../../helper";

//Icon
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import AlarmIcon from "@mui/icons-material/Alarm";
import WbSunnyIcon from "@mui/icons-material/WbSunny";

const WeatherDetail = ({ weatherData }) => {
  const { main, name, weather, sys, dt } = weatherData;

  return (
    <Stack width="100%">
      <Box display="flex" alignItems="flex-end" justifyContent="center">
        <LocationOnIcon style={{ fontSize: "15px" }} />
        <Typography fontWeight="bold" variant="caption" lineHeight={1}>
          {`${sys.country} - ${name}`}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h6">{main.temp} °C</Typography>
        <img src={getIconURL(weather[0].icon)} alt="cloud" />
      </Box>
      <Grid container display="flex" gap={1} width="100%">
        <Grid item xs={10} display="flex" alignItems="center">
          <Box
            width="50px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <ThermostatIcon />
          </Box>
          <Typography variant="subtitle2">
            {` High/Low: ${main.temp_max} / ${main.temp_min} °C`}
          </Typography>
        </Grid>
        <Grid item xs={10} display="flex" alignItems="center">
          <Box
            width="50px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <WaterDropIcon />
          </Box>
          <Typography variant="subtitle2">
            {` Humidity: ${main.humidity} %`}
          </Typography>
        </Grid>
        <Grid item xs={10} display="flex" alignItems="center">
          <Box
            width="50px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <WbSunnyIcon />
          </Box>
          <Typography variant="subtitle2">
            {`Condition: ${weather[0].description}`}
          </Typography>
        </Grid>

        <Grid item xs={10} display="flex" alignItems="center">
          <Box
            width="50px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <AlarmIcon />
          </Box>
          <Typography variant="subtitle2">
            {`Time: ${formatDate(dt)}`}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default WeatherDetail;
