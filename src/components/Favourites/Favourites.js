import React, { useState, useEffect } from 'react';
import Location from '../SearchLocations/Location/Location'
import axios from 'axios'
import firebase from '../../config/fire'
import classes from './Favourites.module.scss';

const Favourites =(props) =>  {
    const [data, setData] = useState([]);

    useEffect( () => {
        var db = firebase.database();
        var ref = db.ref('favourites').orderByChild('uid').equalTo(props.user.uid)
        ref.once('value', snapshot => {
            let snapdata = snapshot.val()
            let compdata = Object.keys(snapdata).map(igkey => {
                return {favId: igkey, ...snapdata[igkey] }
            })
            setData(compdata)
        })
    },[])

  
    
    const loginStatus = props.loggedIn ? (<p>logged in</p>) : (<p>Sign up to save favourites</p>)
    return (
        <div className={classes.favourites}>
            <h4>Favourites</h4>
                {loginStatus}
            <div className={classes.FavouriteLocations} >
                {data.map(elem => <Location key={elem.favId} place={elem.locationName} user={props.user} loggedIn={props.loggedIn} longitude={elem.longitude} latitude={elem.latitude} onSelectLocation={props.onSelectLocation} />)}
            </div>
        </div>
    );
    
}

export default Favourites;
