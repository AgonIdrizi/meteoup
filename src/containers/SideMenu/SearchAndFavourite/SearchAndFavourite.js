import React, { Component } from 'react';
import SearchLocations from '../../../components/SearchLocations/SearchLocations'
import Favourites from '../../../components/Favourites/Favourites'
import {database} from '../../../config/fire'
import classes from './SearchAndFavourite.module.scss';

class SearchAndFavourite extends Component {
    state = {
        favData: []
    }

    componentDidMount() {
      if(this.props.loggedIn) {
          var ref = database.ref('favourites').orderByChild('uid').equalTo(this.props.user.uid)
          ref.on('value', snapshot => {
            if(snapshot.exists()){
              let snapdata = snapshot.val()
              let dataWithFirebaseKey = Object.keys(snapdata).map(igkey => {
                return {favId: igkey, ...snapdata[igkey] }
              });
              this.setState({favData: dataWithFirebaseKey})
            }
          });
      }
    }

    addToFavouritesHandler = (e, place, longitude, latitude) => {
      e.preventDefault()
    
      if(this.props.user != null) {
        const favouritePlace = {
          locationName: place,
          longitude: longitude,
          latitude: latitude,
          uid: this.props.user.uid
        }
        
        const refAfavourite = database.ref('favourites').orderByChild('locationName').equalTo(place)
          refAfavourite.once('value', snapshot => {
            if(snapshot.hasChildren()) {
              //do nothing
            } else {
              //push data to firebase
              snapshot.ref.push(favouritePlace)
              .then(res => {
              })
              .catch(err => console.log(err))
            }
          })
      }
    }

    removeFromFavouritesHandler = (key) => {
      database.ref('/favourites').child('/'+key).remove()
      const newFavData = this.state.favData.filter(elem => elem.favId != key)
      console.log(newFavData)
      this.setState({favData: newFavData})
    }
    
    
    render() {
        const data = (this.props.searchQuery.length == 0) ? this.props.lastVisited : this.props.searchQuery
        const search = (this.props.searchQuery.length == 0) ? 'false' : 'true'
        return (
            <div className={classes.SearchAndFavourite}>
                <SearchLocations 
                  data={data} 
                  favData={this.state.favData}
                  search={search}
                  onSelectLocation={this.props.onSelectLocation}
                  addToFavouritesHandler={this.addToFavouritesHandler}
                  removeFromFavouritesHandler={this.removeFromFavouritesHandler}
                  user={this.props.user}
                  loggedIn={this.props.loggedIn}
                  deleteLastVisited={this.props.deleteLastVisited} />
                <Favourites 
                  user={this.props.user} 
                  favData={this.state.favData} 
                  onSelectLocation={this.props.onSelectLocation}
                  removeFromFavouritesHandler={this.removeFromFavouritesHandler} 
                  user={this.props.user}
                  loggedIn={this.props.loggedIn}/>
            </div>
        );
    }
}

export default SearchAndFavourite;
