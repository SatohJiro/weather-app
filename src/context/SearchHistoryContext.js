import React, { createContext, useState, useEffect } from "react";

export const SearchHistoryContext = createContext();

const SearchHistoryContextProvider = ({ children }) => {
  const [isMobile, setMobile] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);
  }, []);

  const addSearchHistory = (item) => {
    const newHistory = [item, ...searchHistory];
    setSearchHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  return (
    <SearchHistoryContext.Provider
      value={{
        isLoading,
        setLoading,
        isMobile,
        setMobile,
        searchHistory,
        setSearchHistory,
        addSearchHistory,
        weatherData,
        setWeatherData,
      }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
};

export default SearchHistoryContextProvider;
