import axios from "axios";
import ShowToast from "../components/common/ShowToast";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const weatherUrl = process.env.REACT_APP_WEATHER_URL;

export const fetchWeather = async ({ city, country }, setLoading) => {
  if (!city && !country) {
    ShowToast("Where would you like to search for?");
    return;
  }

  if (!city || !country) {
    ShowToast("You forgot to fill in the country/city name?");
    return;
  }

  setLoading(true);

  try {
    const response = await axios.get(
      `${weatherUrl}?q=${city},${country}&units=metric&appid=${apiKey}`
    );
    return response.data;
  } catch (err) {
    const errorMessage = err.response?.data?.message || "An error occurred";
    ShowToast(errorMessage, true);
  } finally {
    setLoading(false);
  }
};
