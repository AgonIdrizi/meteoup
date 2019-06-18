import React, { Component } from 'react';
import SearchInput from '../UI/SearchInput/SearchInput'
import MainMenu  from '../MainMenu/MainMenu';
import Logo from '../UI/Logo/Logo'
import CloseSpan from '../UI/CloseSpan/CloseSpan'
import SearchAndFavourite from '../../containers/SearchAndFavourite/SearchAndFavourite'
import classes from './SideMenu.module.scss'

class SideMenu extends Component {
    
    componentDidMount(){
        console.log(this.props)
    }
    render() {
        const style = this.props.inputSelected ? {width: '400px'} : {width: '200px'}
        let displayLogo = this.props.inputSelected ? 
                            <CloseSpan clickedX={this.props.clickRemoveSearch} /> : 
                            <Logo />
        let displaySearchAndFavourites = this.props.inputSelected ?
                                            <SearchAndFavourite /> : null
        return(
            <React.Fragment>
            <div style={ style } className={classes.SideMenu}>
            {displayLogo}
            <SearchInput click={this.props.clicked} />
            {displaySearchAndFavourites}
            <MainMenu />
            </div>
            </React.Fragment>
        );
    }
}

export default SideMenu;
