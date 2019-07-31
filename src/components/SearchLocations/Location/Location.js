import React, { useState } from 'react';
import classes from './Location.module.scss';
import Axios from 'axios';
import firebase from '../../../config/fire'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


const propTypes = {
    
};


const Location = (props) => {
  const [styleFavIcon, setStyleFavIcon] = useState({
    color: 'blue'
});

  const favouritePlace = {
    locationName: props.place,
    longitude: props.longitude,
    latitude: props.latitude,
    uid: props.user.uid
  }

  const addToFavouritesHandler = (e) => {
    e.preventDefault()

    styleFavIcon.color == 'blue' ? setStyleFavIcon({color: 'yellow'}) : setStyleFavIcon({color: 'blue'})   

    const ref = firebase.database().ref('favourites')
    const refAfavourite = ref.orderByChild('locationName').equalTo(favouritePlace.locationName)
      refAfavourite.once('value', snapshot => {
        if(snapshot.hasChildren()) {
          //do nothing
        } else {
          //push data to firebase
          snapshot.ref.push(favouritePlace)
          .then(res => {
            console.log(res)
            props.onAddFavourite()
          } )
          .catch(err => console.log(err))
        }
      })
  }

  const removeFromFavouritesHandler = (e) => {
    const ref = firebase.database().ref('favourites')
    const refAfavourite = ref.orderByChild('locationName').equalTo(favouritePlace.locationName)
    var key = '';

    refAfavourite.once('value', snapshot => {
      console.log(snapshot.val())
      key = Object.keys(snapshot.val()).join('')
      console.log(typeof(key))
      //refAfavourite.update('favourites')
      console.log(key)
      //firebase.database().ref('favourites/' + key).remove()
    })
      firebase.database().ref('favourites/'+ key).set(null)
    //props.onRemoveFavourite()
  }

  const addRemoveFavHandlers = styleFavIcon.color == 'blue' ? (e) => addToFavouritesHandler(e) : e => removeFromFavouritesHandler(e)

  const favIcon = props.loggedIn ? (<a href="#" onClick= {addRemoveFavHandlers}>
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

