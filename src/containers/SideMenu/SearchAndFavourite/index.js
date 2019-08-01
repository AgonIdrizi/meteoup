import React from 'react';
import SearchAndFavourite from './SearchAndFavourite';
import { LoginRegisterContext } from '../../../contexts/LoginRegisterContext'
import { FavouritesContext } from '../../../contexts/FavouritesContext'

export default props => (
    <LoginRegisterContext.Consumer>
        {({user, loggedIn}) => (
           <FavouritesContext.Consumer>
             {({favData}) => 
               <SearchAndFavourite {...props} favData={favData} user={user} loggedIn={loggedIn} /> 
             }
            </FavouritesContext.Consumer>
        )}
        
    </LoginRegisterContext.Consumer>
);