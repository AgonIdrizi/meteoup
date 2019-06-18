import React, { Component } from 'react';
import SearchInput from '../UI/SearchInput/SearchInput'
import classes from './SideMenu.module.scss'

class SideMenu extends Component {
    render() {
        return (
            <div className={classes.SideMenu}>
            <header>Logo</header>
            <SearchInput />
            </div>
        );
    }
}

export default SideMenu;
