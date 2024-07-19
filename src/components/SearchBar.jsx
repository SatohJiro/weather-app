import React, { useState, useContext, useCallback } from "react";
import { SearchHistoryContext } from "../context/SearchHistoryContext";
import { Input, IconButton, Stack, Typography, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CommonTextField from "./common/CommonTextField";
import { fetchWeather } from "../api/weatherApi";

const SearchBar = () => {
  const [location, setLocation] = useState({ country: "", city: "" });

  const { setLoading, addSearchHistory, setWeatherData } =
    useContext(SearchHistoryContext);

  const fetchData = useCallback(async () => {
    const data = await fetchWeather(location, setLoading);
    if (data) {
      setWeatherData(data);
      addSearchHistory(data);
    }
  }, [location, setLoading, setWeatherData, addSearchHistory]);

  const handleInputChange = (key) => (e) => {
    const value = e.target.value;
    setLocation((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Stack
      height="35px"
      width={{ lg: "500px", md: "500px", sm: "90%", xs: "90%" }}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-around"
      p="0 10px"
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
        value={location.country}
        onChange={handleInputChange("country")}
      />
      |
      <Input
        sx={{ marginLeft: "10px", fontSize: "14px" }}
        placeholder="City you looking for"
        disableUnderline
        value={location.city}
        onChange={handleInputChange("city")}
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
