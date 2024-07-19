import React, { useState, useContext } from "react";
import { useMediaQuery } from "@mui/material";
import {
  ListItem,
  ListItemSecondaryAction,
  IconButton,
  Box,
  Tooltip,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import WeatherDetail from "./common/WeatherDetail";
import { SearchHistoryContext } from "../context/SearchHistoryContext";
import { formatDate } from "../helper";
//Icon
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
//Api
import { fetchWeather } from "../api/weatherApi";

const SearchHistoryItem = ({ item, index }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isSmallScreen = useMediaQuery("(max-width:500px)");

  const {
    setLoading,
    searchHistory,
    setSearchHistory,
    addSearchHistory,
    setWeatherData,
  } = useContext(SearchHistoryContext);
  const { name, sys, dt } = item;

  const fetchData = async () => {
    setShowDetails(false);
    setAnchorEl(null);
    const data = await fetchWeather(
      { country: sys.country, city: name },
      setLoading
    );
    data && setWeatherData(data);
    data && addSearchHistory(data);
  };

  const handleOpenActions = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseActions = () => {
    setAnchorEl(null);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
    setAnchorEl(null);
  };

  const removeItem = () => {
    setAnchorEl(null);
    const newHistory = [...searchHistory];
    newHistory.splice(index, 1);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  return (
    <Box
      sx={{
        padding: "5px 10px",
        marginTop: "10px",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "15px",
        backdropFilter: "blur(10px)",
      }}
    >
      <ListItem>
        <Box>
          <Typography
            variant="subtitle2"
            fontWeight="bold"
          >{`${sys.country} - ${name}`}</Typography>
          <Typography variant="caption">{`Time: ${formatDate(dt)}`}</Typography>
        </Box>
        <ListItemSecondaryAction>
          {isSmallScreen ? (
            <>
              <IconButton
                aria-controls="action-menu"
                aria-haspopup="true"
                onClick={handleOpenActions}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="action-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleCloseActions}
              >
                <MenuItem
                  onClick={fetchData}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    color: (theme) => theme.palette.text.primary,
                  }}
                >
                  <IconButton
                    edge="end"
                    sx={{ marginRight: "5px" }}
                    aria-label="detail"
                  >
                    <SearchIcon />
                  </IconButton>
                  <Typography variant="subtitle2">Research</Typography>
                </MenuItem>
                <MenuItem
                  onClick={toggleDetails}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    color: (theme) => theme.palette.text.primary,
                  }}
                >
                  <IconButton
                    edge="end"
                    sx={{ marginRight: "5px" }}
                    aria-label="delete"
                  >
                    <InfoIcon />
                  </IconButton>
                  <Typography variant="subtitle2">Detail</Typography>
                </MenuItem>
                <MenuItem
                  onClick={removeItem}
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    color: (theme) => theme.palette.text.primary,
                  }}
                >
                  <IconButton
                    edge="end"
                    sx={{ marginRight: "5px" }}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Typography variant="subtitle2">Delete</Typography>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Tooltip title="Research Again">
                <IconButton edge="end" aria-label="detail" onClick={fetchData}>
                  <SearchIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Detail Record">
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={toggleDetails}
                >
                  <InfoIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Record">
                <IconButton edge="end" aria-label="delete" onClick={removeItem}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </ListItemSecondaryAction>
      </ListItem>
      {showDetails && <WeatherDetail weatherData={item} />}
    </Box>
  );
};

export default SearchHistoryItem;
