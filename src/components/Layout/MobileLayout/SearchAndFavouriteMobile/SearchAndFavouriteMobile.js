import React, { useState } from "react";
import classes from "./SearchAndFavouriteMobile.module.scss";
import SearchInput from "../../../UI/SearchInput/SearchInput";
import SearchLocations from "../../../SearchLocations/SearchLocations";
import Favourites from "../../../Favourites/Favourites";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { database } from "../../../../config/fire";
import useFavourite from "../../../../customHooks/useFavourites";
import { withRouter } from "react-router-dom";
import {
  LoginRegisterProvider,
  LoginRegisterContext
} from "../../../../contexts/LoginRegisterContext";

const SearchAndFavouriteMobile = props => {
  const [clickedIcon, setClickedIcon] = useState("Search");
  const [favData, setFavData, loginRegisterContext] = useFavourite();
  const user = React.useContext(LoginRegisterProvider);

  const addToFavouritesHandler = (e, place, longitude, latitude) => {
    e.preventDefault();

    if (loginRegisterContext.user != null) {
      const favouritePlace = {
        locationName: place,
        longitude: longitude,
        latitude: latitude,
        uid: loginRegisterContext.user.uid
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

  const iconStyle = {
    height: "30px",
    width: "30px",
    color: "#264e73"
  };
  const displayIcon =
    clickedIcon === "Search" ? (
      <FontAwesomeIcon
        style={iconStyle}
        onClick={() => setClickedIcon("Favourites")}
        icon={faSearch}
      />
    ) : (
      <FontAwesomeIcon
        style={iconStyle}
        onClick={() => setClickedIcon("Search")}
        icon={faStar}
      />
    );
  const data =
    props.searchQuery.length === 0 ? props.lastVisited : props.searchQuery;
  const search = props.searchQuery.length === 0 ? "false" : "true";

  const displayLocations =
    clickedIcon === "Search" ? (
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
    ) : (
      <Favourites
        user={loginRegisterContext.user}
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
        isMobile={props.isMobile}
      />
    );

  return (
    <>
      <div className={classes.SearchAndFavouriteMobile}>
        <SearchInput
          isMobile={props.isMobile}
          click={props.clicked}
          searchHandler={props.searchHandler}
        />
        {displayIcon}
        <FontAwesomeIcon
          style={iconStyle}
          onClick={() => props.clickRemoveSearch(props.history)}
          icon={faTimes}
        />
      </div>
      <div>{displayLocations}</div>
    </>
  );
};

export default withRouter(SearchAndFavouriteMobile);
