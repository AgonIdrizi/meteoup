import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './fontawesome';
import * as serviceWorker from './serviceWorker';

import {LoginRegisterProvider, LoginRegisterContext} from './contexts/LoginRegisterContext';

ReactDOM.render(<LoginRegisterProvider>
                  <LoginRegisterContext.Consumer> 
                    {({authListener, user, loggedIn, loginHandler, logoutHandler, loginRegisterErrorMessage, clearErrorMessageHandler }) => 
                    <App 
                      user={user} 
                      loggedIn={loggedIn} 
                      loginHandler={loginHandler} 
                      logoutHandler={logoutHandler} 
                      loginRegisterErrorMessage={loginRegisterErrorMessage} 
                      authListener={authListener}
                      clearErrorMessageHandler={clearErrorMessageHandler}/> 
                    }  
                  </LoginRegisterContext.Consumer>
                </LoginRegisterProvider>,
     document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
