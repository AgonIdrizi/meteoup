import React, { useState, useEffect, useContext } from "react";
import Login from "./Login/Login";
import Register from "./Register/Register";
import Logout from "./Logout/Logout";
import { LoginRegisterContext } from "../../contexts/LoginRegisterContext";
import { LoginRegisterPose} from '../../services/posedTransitions';
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./LoginRegister.module.scss";

const LoginRegister = props => {
  const [selectedComponent, setSelectedCompoent] = useState("Login");
  const loginRegisterContext = useContext(LoginRegisterContext);
  const handleComponentSelectionClick = (e, value) => {
    e.preventDefault();
    if (selectedComponent !== value) {
      setSelectedCompoent(value);
      loginRegisterContext.clearErrorMessageHandler();
    }
  };

  const mobileStyle = props.isMobile
    ? { height: "300px", width: "100%", backgroundColor: "white" }
    : null;
  let selectedComp =
    selectedComponent === "Login" ? (
      <Login loginHandler={loginRegisterContext.loginHandler} />
    ) : (
      <Register signUpHandler={loginRegisterContext.signUpHandler} />
    );
  let clickHandlerDiv = (
    <div className={classes.SelectComponent}>
      <a href="#" onClick={e => handleComponentSelectionClick(e, "Login")}>
        <span classes={classes.Span}>Login</span>
      </a>
      <a href="#" onClick={e => handleComponentSelectionClick(e, "Register")}>
        <span classes={classes.Span}>Register</span>
      </a>
    </div>
  );
  if (loginRegisterContext.loggedIn) {
    selectedComp = (
      <Logout logoutHandler={loginRegisterContext.logoutHandler} />
    );
    clickHandlerDiv = null;
  }
  if (loginRegisterContext.isLoading) {
    selectedComp = <Spinner />;
  }
  return (
    <LoginRegisterPose style={mobileStyle} className={[classes.LoginRegisterData, "loginregisterpose"].join(' ')} pose={ props.isOpen ? 'visible' : 'hidden'} >
      <p className={classes.Error}>
        {loginRegisterContext.loginRegisterErrorMessage}
      </p>
      {clickHandlerDiv}
      {selectedComp}
    </LoginRegisterPose>
  );
};

export default LoginRegister;
