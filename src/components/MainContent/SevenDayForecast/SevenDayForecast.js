import React, { useState } from 'react';
import OneDayForecast from './OneDayForecast/OneDayForecast';
import PropTypes from 'prop-types';
import classes from './SevenDayForecast.module.scss';


const propTypes = {
    
};


const SevenDayForecast = (props) => {
  
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
  const display = props.forecast.forecastday.map((elem,index) => {
    
    return <OneDayForecast key={elem.date_epoch} id={index} data={elem} style={ props.lastSelectedDay == index ? styleOfSelected :defaultStyle } clicked={props.clicked} />
  })
    return (
        <div className={classes.SevenDayForecast}>
          {display}
        </div>
    );
};


SevenDayForecast.propTypes = propTypes;


export default SevenDayForecast;
