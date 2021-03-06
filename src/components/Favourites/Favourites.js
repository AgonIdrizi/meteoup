import React, { useState, useEffect } from "react";
import Location from "../SearchLocations/Location/Location";
import LoginRegister from "../../containers/LoginRegister/LoginRegister";
import { Button } from "antd";
import classes from "./Favourites.module.scss";

const Favourites = props => {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    return () => setIsButtonClicked(false);
  }, props.loggedIn);

  const styleLogin = {
    height: "400px"
  };
  let loginData = !props.loggedIn ? (
    <Button
      className={classes.Button}
      onClick={() => setIsButtonClicked(true)}
      type="primary"
      ghost
    >
      Login/SignUp
    </Button>
  ) : null;
  let loginStatus = props.loggedIn ? null : <p>Sign up to save favourites</p>;
  if (!props.loggedIn && isButtonClicked) {
    loginData = (
      <LoginRegister
        loggedIn={props.loggedIn}
        user={props.user}
        loginHandler={props.loginHandler}
        logoutHandler={props.logoutHandler}
        signUpHandler={props.signUpHandler}
        loginRegisterErrorMessage={props.loginRegisterErrorMessage}
        clearErrorMessageHandler={props.clearErrorMessageHandler}
        isLoading={props.isLoading}
        isMobile={props.isMobile}
        isOpen={isButtonClicked}
      />
    );
    loginStatus = null;
  }

  return (
    <div className={classes.favourites}>
      <h4>Favourites</h4>
      {loginStatus}
      <div className={classes.FavouriteLocations}>
        {props.favData.map(favourite => {
          return (
            <Location
              key={favourite.favId}
              id={favourite.favId}
              place={favourite.locationName}
              isFavourite
              user={props.user}
              loggedIn={props.loggedIn}
              longitude={favourite.longitude}
              latitude={favourite.latitude}
              onSelectLocation={props.onSelectLocation}
              removeFromFavouritesHandler={props.removeFromFavouritesHandler}
            />
          );
        })}
      </div>
      {loginData}
    </div>
  );
};

export default Favourites;
