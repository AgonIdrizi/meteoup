import React from "react";
import SearchLocations from "../../../components/SearchLocations/SearchLocations";
import Favourites from "../../../components/Favourites/Favourites";
import { database } from "../../../config/fire";
import useFavourite from "../../../customHooks/useFavourites";
import classes from "./SearchAndFavourite.module.scss";

const SearchAndFavourite = props => {
  const [favData, setFavData, loginRegisterContext] = useFavourite();

  const addToFavouritesHandler = (e, place, longitude, latitude) => {
    e.preventDefault();

    if (loginRegisterContext.user != null) {
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
    const newFavData = favData.filter(elem => elem.favId !== key);
    setFavData(newFavData);
  };

  const data =
    props.searchQuery.length === 0 ? props.lastVisited : props.searchQuery;
  const search = props.searchQuery.length === 0 ? "false" : "true";
  return (
    <div className={classes.SearchAndFavourite}>
      <SearchLocations
        data={data}
        favData={favData}
        search={search}
        onSelectLocation={props.onSelectLocation}
        addToFavouritesHandler={addToFavouritesHandler}
        removeFromFavouritesHandler={removeFromFavouritesHandler}
        user={loginRegisterContext.user}
        loggedIn={loginRegisterContext.loggedIn}
        deleteLastVisited={props.deleteLastVisited}
      />
      <Favourites
        user={props.user}
        favData={favData}
        onSelectLocation={props.onSelectLocation}
        removeFromFavouritesHandler={removeFromFavouritesHandler}
        loggedIn={loginRegisterContext.loggedIn}
        loginHandler={loginRegisterContext.loginHandler}
        isLoading={props.isLoading}
        logoutHandler={loginRegisterContext.logoutHandler}
        signUpHandler={loginRegisterContext.signUpHandler}
        loginRegisterErrorMessage={
          loginRegisterContext.loginRegisterErrorMessage
        }
        clearErrorMessageHandler={loginRegisterContext.clearErrorMessageHandler}
      />
    </div>
  );
};

export default SearchAndFavourite;
