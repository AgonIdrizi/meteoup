import axios from 'axios'

export const  getApixuData = (latitude, longitude) => {
    return axios.get(`http://api.apixu.com/v1/forecast.json?key=${process.env.REACT_APP_APIXU_KEY}&q=${latitude},${longitude}&days=7`)   
}