import React, { Component } from 'react';
import SearchLocations from '../../../components/SearchLocations/SearchLocations'
import Favourites from '../../../components/Favourites/Favourites'
import classes from './SearchAndFavourite.module.scss';

class SearchAndFavourite extends Component {
    render() {
        return (
            <div className={classes.SearchAndFavourite}>
                <SearchLocations />
                <Favourites />
            </div>
        );
    }
}

export default SearchAndFavourite;
