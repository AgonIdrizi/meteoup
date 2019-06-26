import React, { useState } from 'react';
import OneDayForecast from './OneDayForecast/OneDayForecast';
import PropTypes from 'prop-types';
import classes from './SevenDayForecast.module.scss';
import { whileStatement } from '@babel/types';


const propTypes = {
    
};


const SevenDayForecast = () => {
  const [lastSelectedDay, setlastSelectedDay] = useState({index: 0})
  const styleOfSelected={
    paddingTop: '.5em',
    margin: '-.4em 0 0',
    zIndex: 1,
    width: '105%',
    backgroundColor: 'white'
  }
  const defaultStyle ={
    paddingTop: 0,
    margin: 0,
    zIndex: 0,
    width: '100%'
  }
  const clickOneDayForecastHandler = (e, key) => {
    e.preventDefault()
    setlastSelectedDay({index: key})
    console.log(e.currentTarget)
    
    
    
  }
  console.log(lastSelectedDay.index)
    return (
        <div className={classes.SevenDayForecast}>
          <OneDayForecast key={0} id={0} style={ lastSelectedDay.index == 0 ? styleOfSelected :defaultStyle } clicked={clickOneDayForecastHandler} />
          <OneDayForecast key={1} id={1} style={ lastSelectedDay.index == 1 ? styleOfSelected :defaultStyle } clicked={clickOneDayForecastHandler} />
          <OneDayForecast key={2} id={2} style={ lastSelectedDay.index == 2 ? styleOfSelected :defaultStyle } clicked={clickOneDayForecastHandler} />
          <OneDayForecast key={3} id={3} style={ lastSelectedDay.index == 3 ? styleOfSelected :defaultStyle } clicked={clickOneDayForecastHandler} />
          <OneDayForecast key={4} id={4} style={ lastSelectedDay.index == 4 ? styleOfSelected :defaultStyle } clicked={clickOneDayForecastHandler}/>
          <OneDayForecast key={5} id={5} style={ lastSelectedDay.index == 5 ? styleOfSelected :defaultStyle } clicked={clickOneDayForecastHandler} />
          <OneDayForecast key={6} id={6} style={ lastSelectedDay.index == 6 ? styleOfSelected :defaultStyle } clicked={clickOneDayForecastHandler} />
        </div>
    );
};


SevenDayForecast.propTypes = propTypes;


export default SevenDayForecast;
