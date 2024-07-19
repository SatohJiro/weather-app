import React, { useState, useContext } from "react";
import { SearchHistoryContext } from "../context/SearchHistoryContext";
import {
  Box,
  Input,
  IconButton,
  Stack,
  Typography,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CommonTextField from "./common/CommonTextField";
//Api
import { fetchWeather } from "../api/weatherApi";

const SearchBar = () => {
  const [location, setLocation] = useState({ country: "", city: "" });

  const { setLoading, addSearchHistory, setWeatherData } =
    useContext(SearchHistoryContext);

  const fetchData = async () => {
    const data = await fetchWeather(location, setLoading);
    data && setWeatherData(data);
    data && addSearchHistory(data);
  };

  return (
    <Stack
      height="35px"
      width={{ lg: "500px", md: "500px", sm: "90%", xs: "90%" }}
      flexDirection={"row"}
      alignItems="center"
      justifyContent="space-around"
      p={"0 10px"}
      sx={{
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "15px",
        backdropFilter: "blur(10px)",
      }}
    >
      <CommonTextField
        label={
          <Typography fontWeight="bold" variant="caption">
            Country Name
          </Typography>
        }
        value={location?.country}
        onChange={(e) =>
          setLocation((prev) => {
            return { ...prev, country: e.target.value };
          })
        }
      />
      |
      <Input
        sx={{ marginLeft: "10px", fontSize: "14px" }}
        placeholder="City you looking for"
        disableUnderline
        value={location?.city}
        onChange={(e) =>
          setLocation((prev) => {
            return { ...prev, city: e.target.value };
          })
        }
      />
      <Tooltip title="Search">
        <IconButton
          color="primary"
          edge="end"
          aria-label="detail"
          onClick={fetchData}
        >
          <SearchIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default SearchBar;
