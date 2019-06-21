import React, { Component } from 'react';
import SearchLocations from '../../../components/SearchLocations/SearchLocations'
import Favourites from '../../../components/Favourites/Favourites'
import classes from './SearchAndFavourite.module.scss';

class SearchAndFavourite extends Component {
    render() {
        const data = (this.props.searchQuery.length == 0) ? this.props.lastVisited : this.props.searchQuery
        const search = (this.props.searchQuery.length == 0) ? 'false' : 'true'
        return (
            <div className={classes.SearchAndFavourite}>
                <SearchLocations 
                data={data} 
                search={search}
                onSelectLocation={this.props.onSelectLocation} />
                <Favourites />
            </div>
        );
    }
}

export default SearchAndFavourite;
