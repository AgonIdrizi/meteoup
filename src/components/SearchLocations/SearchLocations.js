import React , { useEffect } from 'react';
import shortid from 'shortid';
import Location from './Location/Location'
import classes from './SearchLocations.module.scss';

const SearchLocations = (props) => {
    
  const checkIfFavourite = (place) => {
    const data = props.favData.find(favData => favData.locationName == place) 
    const id = data ? data.favId : null
    console.log('checkIfFavourite is rendering', place, data)
    return {isFavourite: data != undefined ? true : false, id: id }
  }

 
  
  return(
      <React.Fragment>
        <div className={classes.searchLocations}>
        <div className={classes.VisitedLocations} >
          <h4>{(props.search == "true") ? 'Search' :'Last Visited'}</h4>
          <a  src="" onClick={e => props.deleteLastVisited(e)}>{(props.search == "true") ? '' :'Delete'}</a>
        </div>
          {props.data.map(elem => 
            <Location 
              key={elem.id} 
              place={elem.place}
              matchingText={elem.matchingText}
              user={props.user}  
              loggedIn={props.loggedIn} 
              longitude={elem.longitude} 
              latitude={elem.latitude} 
              onSelectLocation={props.onSelectLocation}
              addToFavouritesHandler={props.addToFavouritesHandler}
              removeFromFavouritesHandler={props.removeFromFavouritesHandler}
              {...checkIfFavourite(elem.place)}/>
          )} 
        </div>
      </React.Fragment>
    )
        
}

export default SearchLocations;