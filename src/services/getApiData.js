import axios from "axios";

export const getApiData = (longitude, latitude, location) => {
  return Promise.all([
    axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${longitude}&lon=${latitude}&units=metric&cnt=7&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
    ),
    axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${longitude}&lon=${latitude}&units=metric&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
    )
  ]);
};
