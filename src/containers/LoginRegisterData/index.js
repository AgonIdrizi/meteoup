import React from 'react';
import LoginRegisterData from './LoginRegisterData';
import { LoginRegisterContext } from '../../contexts/LoginRegisterContext'


export default props => (
  <LoginRegisterContext.Consumer>
    {({loginHandler, logoutHandler, signUpHandler, loggedIn, loginRegisterErrorMessage, clearErrorMessageHandler}) => 
        <LoginRegisterData 
          {...props}
          loginHandler={loginHandler} 
          logoutHandler={logoutHandler} 
          signUpHandler={signUpHandler} 
          loggedIn={loggedIn} 
          loginRegisterErrorMessage={loginRegisterErrorMessage}
          clearErrorMessageHandler={clearErrorMessageHandler} />}
  </LoginRegisterContext.Consumer>
);