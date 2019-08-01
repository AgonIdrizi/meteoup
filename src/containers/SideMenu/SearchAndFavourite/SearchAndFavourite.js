import React, { Component } from 'react';
import SearchLocations from '../../../components/SearchLocations/SearchLocations'
import Favourites from '../../../components/Favourites/Favourites'
import firebase from '../../../config/fire'
import classes from './SearchAndFavourite.module.scss';

class SearchAndFavourite extends Component {
    state = {
        favData: []
    }

    componentDidMount() {
        
        if(this.props.loggedIn) {
            var db = firebase.database();
            var ref = db.ref('favourites').orderByChild('uid').equalTo(this.props.user.uid)
            ref.once('value', snapshot => {
              if(snapshot.exists()) {
                let snapdata = snapshot.val()
                let compdata = Object.keys(snapdata).map(igkey => {
                  return {favId: igkey, ...snapdata[igkey] }
                });
                console.log(compdata)
                this.setState({favData: compdata})
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
        
        const ref = firebase.database().ref('favourites')
        const refAfavourite = ref.orderByChild('locationName').equalTo(place)
          refAfavourite.once('value', snapshot => {
            if(snapshot.hasChildren()) {
              //do nothing
            } else {
              //push data to firebase
              snapshot.ref.push(favouritePlace)
              .then(res => {
                console.log(res)
               const oldFavData = this.state.favData
               console.log(favouritePlace)
                this.setState({favData: [...oldFavData, favouritePlace]})
                //props.onAddFavourite()
              } )
              .catch(err => console.log(err))
            }
          })
        }
      }

       removeFromFavouritesHandler = (e, place) => {
        const ref = firebase.database().ref('favourites')
       // const refAfavourite = ref.orderByChild('locationName').equalTo(this.props.place)
        let newFavData = this.state.favData.filter( obj => obj.locationName != place)
        this.setState({favData: newFavData})
        console.log('Removed froom favourites')
       // refAfavourite.once('value', snapshot => {
         // console.log(snapshot.val())
         // key = Object.keys(snapshot.val()).join('')
         // console.log(typeof(key))
          //refAfavourite.update('favourites')
         // console.log(key)
          //firebase.database().ref('favourites/' + key).remove()
       // })
          //.database().ref('favourites/'+ key).set(null)
        //props.onRemoveFavourite()
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
                  loggedIn={this.props.loggedIn} />
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
