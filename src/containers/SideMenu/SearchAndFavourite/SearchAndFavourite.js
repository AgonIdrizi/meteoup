import React, { useState, useEffect } from "react";
import SearchLocations from "../../../components/SearchLocations/SearchLocations";
import Favourites from "../../../components/Favourites/Favourites";
import { database } from "../../../config/fire";
import classes from "./SearchAndFavourite.module.scss";

const SearchAndFavourite = props => {
  const [favData, setFavData] = useState([]);

  useEffect(() => {
    if (props.loggedIn) {
      var ref = database
        .ref("favourites")
        .orderByChild("uid")
        .equalTo(props.user.uid);
      ref.on("value", snapshot => {
        if (snapshot.exists()) {
          let snapdata = snapshot.val();
          let dataWithFirebaseKey = Object.keys(snapdata).map(igkey => {
            return { favId: igkey, ...snapdata[igkey] };
          });
          setFavData(dataWithFirebaseKey);
        }
      });
    }

    return () => {
      if (props.loggedIn) {
        var ref = database
          .ref("favourites")
          .orderByChild("uid")
          .equalTo(props.user.uid);
        ref.off();
      }
    };
  }, [props.loggedIn, props.user.uid]);

  const addToFavouritesHandler = (e, place, longitude, latitude) => {
    e.preventDefault();

    if (props.user != null) {
      const favouritePlace = {
        locationName: place,
        longitude: longitude,
        latitude: latitude,
        uid: props.user.uid
      };

      const refAfavourite = database
        .ref("favourites")
        .orderByChild("locationName")
        .equalTo(place);
      refAfavourite.once("value", snapshot => {
        if (snapshot.hasChildren()) {
          //do nothing
        } else {
          //push data to firebase
          snapshot.ref.push(favouritePlace).catch(err => console.log(err));
        }
      });
    }
  };

  const removeFromFavouritesHandler = key => {
    database
      .ref("/favourites")
      .child("/" + key)
      .remove();
    const newFavData = favData.filter(elem => elem.favId != key);
    setFavData(newFavData);
  };

  const data =
    props.searchQuery.length == 0 ? props.lastVisited : props.searchQuery;
  const search = props.searchQuery.length == 0 ? "false" : "true";
  return (
    <div className={classes.SearchAndFavourite}>
      <SearchLocations
        data={data}
        favData={favData}
        search={search}
        onSelectLocation={props.onSelectLocation}
        addToFavouritesHandler={addToFavouritesHandler}
        removeFromFavouritesHandler={removeFromFavouritesHandler}
        user={props.user}
        loggedIn={props.loggedIn}
        deleteLastVisited={props.deleteLastVisited}
      />
      <Favourites
        user={props.user}
        favData={favData}
        onSelectLocation={props.onSelectLocation}
        removeFromFavouritesHandler={removeFromFavouritesHandler}
        loggedIn={props.loggedIn}
        loginHandler={props.loginHandler}
        isLoading={props.isLoading}
        logoutHandler={props.logoutHandler}
        signUpHandler={props.signUpHandler}
        loginRegisterErrorMessage={props.loginRegisterErrorMessage}
        clearErrorMessageHandler={props.clearErrorMessageHandler}
      />
    </div>
  );
};

export default SearchAndFavourite;
