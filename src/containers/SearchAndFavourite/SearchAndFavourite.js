import React, { Component } from 'react';
import SearchHistory from '../../components/SideMenu/SearchHistory/SearchHistory'
import Favourites from '../../components/SideMenu/Favourites/Favourites'
import classes from './SearchAndFavourite.module.scss';

class SearchAndFavourite extends Component {
    render() {
        return (
            <div className={classes.SearchAndFavourite}>
                <SearchHistory />
                <Favourites />
            </div>
        );
    }
}

export default SearchAndFavourite;
