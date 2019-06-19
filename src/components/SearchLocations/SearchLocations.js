import React from 'react';
import Location from './Location/Location'
import classes from './SearchLocations.module.scss';

const searchLocations = (props) => {
    return(
        <div className={classes.searchLocations}>
            <Location />
            <Location />  
        </div>)
}

export default searchLocations;