import axios from 'axios'

export const getApixuData = async (value) => {
  return await axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/" + value + ".json?access_token=" + process.env.REACT_APP_MAPBOX_TOKEN + "&autocomplete=true")
}


