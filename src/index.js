import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import {
  LoginRegisterProvider,
  LoginRegisterContext
} from "./contexts/LoginRegisterContext";
import { FavouritesProvider } from "./contexts/FavouritesContext";
ReactDOM.render(
  <LoginRegisterProvider>
    <FavouritesProvider>
      <LoginRegisterContext.Consumer>
        {({ authListener, user, loggedIn }) => (
          <App user={user} loggedIn={loggedIn} authListener={authListener} />
        )}
      </LoginRegisterContext.Consumer>
    </FavouritesProvider>
  </LoginRegisterProvider>,
  document.getElementById("root")
);
