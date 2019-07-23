import React, { Component } from 'react';
import SearchInput from '../../components/UI/SearchInput/SearchInput'
import MainMenu  from '../../components/MainMenu/MainMenu';
import Logo from '../../components/UI/Logo/Logo'
import CloseSpan from '../../components/UI/CloseSpan/CloseSpan'
import SearchAndFavourite from './SearchAndFavourite/SearchAndFavourite'
import classes from './SideMenu.module.scss'

class SideMenu extends Component {
    
    state ={
        loginDataSelected: false
    }


    componentDidMount(){
        console.log(this.props)
    }

    





    render() {
        const style = this.props.inputSelected ? {width: '400px'} : {width: '200px'}
        let displayLogo = this.props.inputSelected ? 
                            <CloseSpan clickedX={this.props.clickRemoveSearch} /> : 
                            <Logo />
        let displaySearchAndFavourites = this.props.inputSelected ?
                                            <SearchAndFavourite 
                                            lastVisited={this.props.lastVisited}
                                            searchQuery={this.props.searchQuery}
                                            onSelectLocation={this.props.SelectLocation}/> : null
        let displayMainMenu = this.props.inputSelected ? 
                                            null : <MainMenu 
                                                    loginClicked={this.props.handleLoginClick} />
        return(
            <React.Fragment>
            <div style={ style } className={classes.SideMenu}>
            {displayLogo}
            <SearchInput 
            click={this.props.clicked}
            searchHandler={this.props.searchHandler}
                 />
            {displaySearchAndFavourites}
            {displayMainMenu}
            </div>
            </React.Fragment>
        );
    }
}

export default SideMenu;
