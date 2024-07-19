import React, { useContext } from "react";
import { Typography, List, Box, Stack } from "@mui/material";
import SearchHistoryItem from "./SearchHistoryItem";
import { SearchHistoryContext } from "../context/SearchHistoryContext";

const SearchHistory = () => {
  const { searchHistory, removeSearchHistory } =
    useContext(SearchHistoryContext);

  return (
    <Box
      sx={{
        height: "100%",
        maxHeight: "500px",
        display: "flex",
        flexDirection: "column",
        padding: "20px 10px",
        background: "rgba(255, 255, 255, 0.08)",
        borderRadius: "15px",
        backdropFilter: "blur(10px)",
        overflow: "hidden",
      }}
    >
      <Typography variant="subtitle2" fontWeight="bold" sx={{ height: "30px" }}>
        Search History:
      </Typography>
      <Stack sx={{ flexGrow: 1, overflowY: "auto" }}>
        <List>
          {searchHistory.map((item, index) => (
            <SearchHistoryItem
              key={index}
              item={item}
              index={index}
              removeSearchHistory={removeSearchHistory}
            />
          ))}
        </List>
      </Stack>
    </Box>
  );
};

export default SearchHistory;
