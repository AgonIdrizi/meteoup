import React from "react";
import MainMenu from "./MainMenu";
import { LoginRegisterContext } from "../../contexts/LoginRegisterContext";

export default props => (
  <LoginRegisterContext.Consumer>
    {({ loggedIn }) => <MainMenu {...props} loggedIn={loggedIn} />}
  </LoginRegisterContext.Consumer>
);
