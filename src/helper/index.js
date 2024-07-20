import { WEATHER_URL } from "../constants";

export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getUTCFullYear();

  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = String(minutes).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year} - ${formattedHours}:${formattedMinutes} ${ampm}`;
  return formattedDate;
};

export const getIconURL = (id) => {
  return `${WEATHER_URL}img/wn/${id}@2x.png`;
};
