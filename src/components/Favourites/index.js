import React from 'react';
import Favourites from './Favourites';
import { LoginRegisterContext } from '../../contexts/LoginRegisterContext'


export default props => (
    <LoginRegisterContext.Consumer>
        {({loggedIn}) => <Favourites {...props} loggedIn={loggedIn} />}
    </LoginRegisterContext.Consumer>
);