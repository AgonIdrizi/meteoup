import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './fontawesome';
import * as serviceWorker from './serviceWorker';

import {LoginRegisterProvider, LoginRegisterContext} from './contexts/LoginRegisterContext';
import { FavouritesProvider } from './contexts/FavouritesContext'
ReactDOM.render(<LoginRegisterProvider>
                  <FavouritesProvider>
                    <LoginRegisterContext.Consumer> 
                      {({authListener, user, loggedIn}) => 
                           <App user={user} loggedIn={loggedIn} authListener={authListener} />
                      }  
                    </LoginRegisterContext.Consumer>
                  </FavouritesProvider>
                </LoginRegisterProvider>,
     document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
