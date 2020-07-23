import axios from "axios";

export const getApixuData = (latitude, longitude) => {
  return axios.get(
    `https://api.openweathermap.org/data/2.5/onecall?lat${longitude}&lon=${latitude}&units=metric&cnt=7&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
  );
};
