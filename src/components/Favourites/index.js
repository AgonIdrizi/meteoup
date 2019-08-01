import React from 'react';
import Favourites from './Favourites';
import { LoginRegisterContext } from '../../contexts/LoginRegisterContext';
import { FavouritesContext } from '../../contexts/FavouritesContext';

export default props => (
    
        <FavouritesContext.Consumer>
          {({favData}) => <Favourites {...props} favData={favData} />}
        </FavouritesContext.Consumer>
   
);