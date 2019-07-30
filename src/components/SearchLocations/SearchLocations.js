import React from 'react';
import Location from './Location/Location'
import classes from './SearchLocations.module.scss';

const searchLocations = (props) => {
    
  return(
      <React.Fragment>
        <div className={classes.searchLocations}>
        <div className={classes.VisitedLocations} >
          <h4>{(props.search == "true") ? 'Search' :'Last Visited'}</h4>
          <a src="">{(props.search == "true") ? '' :'Delete'}</a>
        </div>
            {props.data.map(elem => <Location key={elem.id} place={elem.place} user={props.user} loggedIn={props.loggedIn} longitude={elem.longitude} latitude={elem.latitude} onSelectLocation={props.onSelectLocation} />)} 
        </div>
      </React.Fragment>
    )
        
}

export default searchLocations;