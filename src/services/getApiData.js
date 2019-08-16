import axios from 'axios'

export const  getApiData = (longitude, latitude) => {
    return Promise.all([
        axios.get(`http://api.apixu.com/v1/forecast.json?key=${process.env.REACT_APP_APIXU_KEY}&q=${longitude},${latitude}&days=7`),
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${longitude}&lon=${latitude}&units=metric&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`)
      ])
}