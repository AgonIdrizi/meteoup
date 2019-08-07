import React from 'react';
import {hourlyForecastData} from '../data/openWeatherData'

 const withHourlyFormatedData = (WrappedComponent,props)  => {
    
     let newCompleteArray = []
     let tempArray = []
     let count = 0;
     for( let i in hourlyForecastData.list){
      tempArray.push(hourlyForecastData.list[i])
      count++;
      if(count> 7){
        count = 0;
        newCompleteArray.push(tempArray)
        tempArray = []
      }
    }

    return (props) => <WrappedComponent {...props} formatedData={newCompleteArray} />
}

export default withHourlyFormatedData;