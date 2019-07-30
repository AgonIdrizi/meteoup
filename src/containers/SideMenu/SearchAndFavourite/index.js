import React from 'react';
import SearchAndFavourite from './SearchAndFavourite';
import { LoginRegisterContext } from '../../../contexts/LoginRegisterContext'


export default props => (
    <LoginRegisterContext.Consumer>
        {({user, loggedIn}) => <SearchAndFavourite {...props} user={user} loggedIn={loggedIn} />}
    </LoginRegisterContext.Consumer>
);