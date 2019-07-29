import React from 'react';
import classes from './Favourites.module.scss';

const favourites = (props) => {
    const loginStatus = props.loggedIn ? (<p>logged in</p>) : (<p>Sign up to save favourites</p>)
    return (
        <div className={classes.favourites}>
            <h4>Favourites</h4>
                {loginStatus}
            <div className={classes.FavouriteLocations} >
                
            </div>
        </div>
    );
}

export default favourites;
