import React from "react";
import SearchAndFavourite from "./SearchAndFavourite";
import { LoginRegisterContext } from "../../../contexts/LoginRegisterContext";
import { FavouritesContext } from "../../../contexts/FavouritesContext";

export default props => (
  <LoginRegisterContext.Consumer>
    {({ user, loggedIn, loginHandler, isLoading, logoutHandler, signUpHandler, loginRegisterErrorMessage, clearErrorMessageHandler }) => (
      <FavouritesContext.Consumer>
        {({ favData }) => (
          <SearchAndFavourite
            {...props}
            favData={favData}
            user={user}
            loggedIn={loggedIn}
            loginHandler={loginHandler}
            isLoading={isLoading}
            logoutHandler={logoutHandler}
            signUpHandler={signUpHandler}
            loginRegisterErrorMessage={loginRegisterErrorMessage}
            clearErrorMessageHandler={clearErrorMessageHandler}
            isLoading={isLoading}
          />
        )}
      </FavouritesContext.Consumer>
    )}
  </LoginRegisterContext.Consumer>
);
