import React, { useState, useContext, useEffect } from "react";
import classes from "./SearchAndFavouriteMobile.module.scss";
import SearchInput from "../../UI/SearchInput/SearchInput";
import SearchLocations from "../../../components/SearchLocations/SearchLocations";
import Favourites from "../../../components/Favourites/Favourites";
import { LoginRegisterContext } from "../../../contexts/LoginRegisterContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { database } from "../../../config/fire";

const SearchAndFavouriteMobile = props => {
  const [clickedIcon, setClickedIcon] = useState("Search");

  const [favData, setFavData] = useState([]);
  const loginRegisterContext = useContext(LoginRegisterContext);

  useEffect(() => {
      
    if (loginRegisterContext.user && loginRegisterContext.user.email != undefined) {
      var favouritesRef = database
        .ref("favourites")
        .orderByChild("uid")
        .equalTo(loginRegisterContext.user.uid);

      favouritesRef.on("value", snapshot => {
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
      if (loginRegisterContext.user && loginRegisterContext.user.email != undefined) {
        database
          .ref("favourites")
          .orderByChild("uid")
          .equalTo(loginRegisterContext.user.uid)
          .off();
      }
    };
  }, [loginRegisterContext.user, loginRegisterContext.loggedIn]);

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
    const newFavData = favData.filter(elem => elem.favId != key);
    setFavData(newFavData);
  };

  const iconStyle = {
    height: "30px",
    width: "30px"
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
    props.searchQuery.length == 0 ? props.lastVisited : props.searchQuery;
  const search = props.searchQuery.length == 0 ? "false" : "true";

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
        <FontAwesomeIcon style={iconStyle} icon={faTimes} />
      </div>
      <div>{displayLocations}</div>
    </>
  );
};

export default SearchAndFavouriteMobile;
