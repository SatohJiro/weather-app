export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  const utcOffset = 7 * 60 * 60 * 1000; // UTC+7 in milliseconds
  const localDate = new Date(date.getTime() + utcOffset); // Adjust to UTC+7

  const hours = localDate.getHours();
  const minutes = localDate.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedDate = `${localDate.getDate()}/${
    localDate.getMonth() + 1
  }/${localDate.getFullYear()} - ${formattedHours}:${formattedMinutes} ${ampm}`;
  return formattedDate;
};

export const getIconURL = (id) => {
  return "http://openweathermap.org/img/wn/" + id + "@2x.png";
};
