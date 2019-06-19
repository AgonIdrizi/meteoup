import React from 'react';
import Location from './Location/Location'
import classes from './SearchLocations.module.scss';

const searchLocations = (props) => {
    return(
      <React.Fragment>
        <div className={classes.searchLocations}>
        <div className={classes.VisitedLocations} >
          <h4>Last Visited</h4>
          <a src="">Delete</a>
        </div>
            <Location />
            <Location />  
        </div>
      </React.Fragment>
    )
        
}

export default searchLocations;