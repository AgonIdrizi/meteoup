import React, { useState } from 'react';
import classes from './Location.module.scss';
import Axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


const propTypes = {
    
};


const Location = (props) => {
  const [styleFavIcon, setStyleFavIcon] = useState({
    color: 'blue'
});


  const addToFavouritesHandler = (e) => {
    e.preventDefault()
    console.log(e.target)
    const favouritePlace = {
      locationName: props.place,
      longitude: props.longitude,
      latitude: props.latitude,
      uid: props.user.uid
    }
    styleFavIcon.color == 'blue' ? setStyleFavIcon({color: 'yellow'}) : setStyleFavIcon({color: 'blue'})
         
    Axios.post('https://meteoup-110f8.firebaseio.com/favourites.json', favouritePlace)
      .then(response => console.log(response))
      .catch(error => {
        setStyleFavIcon({color: 'blue'})
        console.log(error)
      });
  }
  const favIcon = props.loggedIn ? (<a href="#" onClick= {(e) => addToFavouritesHandler(e)}>
                                      <span  ><FontAwesomeIcon style={styleFavIcon} icon={faStar} /></span>
                                    </a>) :
                                    null
        console.log(favIcon)
  return (
        <div  className={classes.Location} >
            <div className={classes.LocationImageInfo}
              // on mouse over we just update the location point in the map
              onMouseOver={e => props.onSelectLocation(props.longitude, props.latitude,e)}
              //here we close the opening sidemenu and update selectedLocation
              onClick={e => props.onSelectLocation(props.longitude, props.latitude,e)}>
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





export default Location;

