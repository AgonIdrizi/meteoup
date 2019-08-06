import React, { useState, useEffect } from 'react';
import Location from '../SearchLocations/Location/Location'
import axios from 'axios'
import firebase from '../../config/fire'
import classes from './Favourites.module.scss';

const favourites =(props) =>  {
   


  
    
    const loginStatus = props.loggedIn ? null : (<p>Sign up to save favourites</p>)
    return (
        <div className={classes.favourites}>
            <h4>Favourites</h4>
                {loginStatus}
            <div className={classes.FavouriteLocations} >
                {props.favData.map(elem => <Location 
                                            key={elem.favId} 
                                            place={elem.locationName} 
                                            favourite={true} 
                                            user={props.user}
                                            loggedIn={props.loggedIn} 
                                            longitude={elem.longitude} 
                                            latitude={elem.latitude} 
                                            onSelectLocation={props.onSelectLocation}
                                            removeFromFavouritesHandler={props.removeFromFavouritesHandler} />)}
            </div>
        </div>
    );
    
}

export default favourites;
