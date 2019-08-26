export const formatOpenWeatherData = hourlyForecastData => {
  let newCompleteArray = [];
  let tempArray = [];
  let count = 0;
  for (let i in hourlyForecastData.list) {
    tempArray.push(hourlyForecastData.list[i]);
    count++;
    if (count > 7) {
      count = 0;
      newCompleteArray.push(tempArray);
      tempArray = [];
    }
  }
  newCompleteArray.push(newCompleteArray[3], newCompleteArray[4]);
  return newCompleteArray;
};
