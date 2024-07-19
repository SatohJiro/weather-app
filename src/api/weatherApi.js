import axios from "axios";
import { toast } from "react-toastify";

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const weatherUrl = process.env.REACT_APP_WEATHER_URL;

export const fetchWeather = async ({ city, country }, setLoading) => {
  if (!city && !country) {
    toast("Where would you like to search for?");
    return;
  }
  setLoading(true);
  try {
    const response = await axios.get(
      `${weatherUrl}?q=${city},${country}&units=metric&appid=${apiKey}`
    );
    setLoading(false);
    return response.data;
  } catch (err) {
    setLoading(false);
    toast(err.response.data.message);
  }
};
