import React from 'react';
import OneDayForecast from './OneDayForecast/OneDayForecast';
import PropTypes from 'prop-types';
import classes from './SevenDayForecast.module.scss';


const propTypes = {
    
};


const sevenDayForecast = () => {
    return (
        <div className={classes.SevenDayForecast}>
          <OneDayForecast />
          <OneDayForecast />
          <OneDayForecast />
          <OneDayForecast />
          <OneDayForecast />
          <OneDayForecast />
          <OneDayForecast />
        </div>
    );
};


sevenDayForecast.propTypes = propTypes;


export default sevenDayForecast;
