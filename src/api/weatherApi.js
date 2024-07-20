import axios from "axios";
import ShowToast from "../components/common/ShowToast";
import {
  MISSED_BOTH_CITY_COUNTRY,
  MISSED_CITY_OR_COUNTRY,
  UNEXPECT_ERROR,
  API_KEY,
  WEATHER_API_URL,
} from "../constants";

export const fetchWeather = async ({ city, country }, setLoading) => {
  if (!city && !country) {
    ShowToast(MISSED_BOTH_CITY_COUNTRY);
    return;
  }

  if (!city || !country) {
    ShowToast(MISSED_CITY_OR_COUNTRY);
    return;
  }

  setLoading(true);

  try {
    const response = await axios.get(
      `${WEATHER_API_URL}data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`
    );
    return response.data;
  } catch (err) {
    const errorMessage = err.response?.data?.message || UNEXPECT_ERROR;
    ShowToast(errorMessage, true);
  } finally {
    setLoading(false);
  }
};
