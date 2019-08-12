import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import classes from './Location.module.scss';

const propTypes = {
    
};


const Location = (props) => {
  const [styleFavIcon, setStyleFavIcon] = useState({
    color: 'blue'
});
  
  const add = (e) => {
    props.addToFavouritesHandler(e, props.place, props.longitude, props.latitude)
    setStyleFavIcon({color: 'yellow'})
  }
  
  const remove = (e) => {
   props.removeFromFavouritesHandler( props.id)
    setStyleFavIcon({color: 'blue'})
  }

 
  let addRemoveFavHandlers = styleFavIcon.color == 'blue' ? (e) => add(e) : e => remove(e)

  // let favIcon = props.loggedIn ? (<a href="#" onClick= {addRemoveFavHandlers}>
  //                                     <span  ><FontAwesomeIcon style={styleFavIcon} icon={faStar} /></span>
  //                                   </a>) :
  //                                   null
  const favIcon = (props.loggedIn && props.isFavourite ) ? (<a href="#" onClick= {(e) => remove(e)}>
                                                              <span  ><FontAwesomeIcon style={{color: 'yellow'}} icon={faStar} /></span>
                                                            </a>) 
                                                          : (props.loggedIn) ?(<a href="#" onClick= {addRemoveFavHandlers}>
                                                                                <span  ><FontAwesomeIcon style={styleFavIcon} icon={faStar} /></span>
                                                                               </a>) 
                                                                            : null
  return (
        <div  className={classes.Location} >
            <div className={classes.LocationImageInfo}
              // on mouse over we just update the location point in the map
              onMouseOver={e => props.onSelectLocation(props.longitude, props.latitude,props.place,e, props.history)}
              //here we close the opening sidemenu and update selectedLocation
              onClick={e => props.onSelectLocation(props.longitude, props.latitude,props.place,e, props.history)}>
              <img src='https://www.meteoblue.com/website/images/flags/mk.svg' style={{height: '15px', width: '15px'}} />
              <p >{props.place}</p>
              <span>1314m, {props.longitude} N {props.latitude}</span>
            </div>
            <div >
              {favIcon}
            </div>
        </div>
      );
};





export default withRouter(Location);

