import React, { useState, useContext, useCallback } from "react";
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
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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

  const fetchData = useCallback(async () => {
    setShowDetails(false);
    setAnchorEl(null);
    const data = await fetchWeather(
      { country: sys.country, city: name },
      setLoading
    );
    if (data) {
      setWeatherData(data);
      addSearchHistory(data);
    }
  }, [name, sys.country, setLoading, setWeatherData, addSearchHistory]);

  const handleOpenActions = (event) => setAnchorEl(event.currentTarget);
  const handleCloseActions = () => setAnchorEl(null);
  const toggleDetails = () => setShowDetails((prev) => !prev);
  const removeItem = () => {
    setAnchorEl(null);
    const newHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  const renderActionMenu = () => (
    <Menu
      id="action-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleCloseActions}
    >
      <MenuItem onClick={fetchData}>
        <IconButton edge="end" sx={{ marginRight: "5px" }} aria-label="detail">
          <SearchIcon />
        </IconButton>
        <Typography variant="subtitle2">Research</Typography>
      </MenuItem>
      <MenuItem onClick={toggleDetails}>
        <IconButton edge="end" sx={{ marginRight: "5px" }} aria-label="detail">
          <InfoIcon />
        </IconButton>
        <Typography variant="subtitle2">Detail</Typography>
      </MenuItem>
      <MenuItem onClick={removeItem}>
        <IconButton edge="end" sx={{ marginRight: "5px" }} aria-label="delete">
          <DeleteIcon />
        </IconButton>
        <Typography variant="subtitle2">Delete</Typography>
      </MenuItem>
    </Menu>
  );

  const renderActionButtons = () => (
    <>
      <Tooltip title="Research Again">
        <IconButton edge="end" aria-label="detail" onClick={fetchData}>
          <SearchIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Detail Record">
        <IconButton edge="end" aria-label="detail" onClick={toggleDetails}>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete Record">
        <IconButton edge="end" aria-label="delete" onClick={removeItem}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );

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
          <Typography variant="subtitle2" fontWeight="bold">
            {`${sys.country} - ${name}`}
          </Typography>
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
              {renderActionMenu()}
            </>
          ) : (
            renderActionButtons()
          )}
        </ListItemSecondaryAction>
      </ListItem>
      {showDetails && <WeatherDetail weatherData={item} />}
    </Box>
  );
};

export default SearchHistoryItem;
