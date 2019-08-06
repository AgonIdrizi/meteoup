import React, { Component } from 'react';
import SearchInput from '../../components/UI/SearchInput/SearchInput'
import MainMenu  from '../../components/MainMenu/index';
import Logo from '../../components/UI/Logo/Logo'
import CloseSpan from '../../components/UI/CloseSpan/CloseSpan'
import SearchAndFavourite from './SearchAndFavourite/index'
import { withRouter } from 'react-router-dom';
import classes from './SideMenu.module.scss'

const sideMenu =(props) => {
    
  const style = props.inputSelected ? {width: '400px'} : {width: '200px'}
  const displayLogo = props.inputSelected ? 
                            <CloseSpan clickedX={() => props.clickRemoveSearch(props.history)} /> : 
                            <Logo />
  const displaySearchAndFavourites = props.inputSelected ?
                                            <SearchAndFavourite 
                                              lastVisited={props.lastVisited}
                                              searchQuery={props.searchQuery}
                                              onSelectLocation={props.selectLocation}/> : 
                                            null
  const displayMainMenu = props.inputSelected ? 
                                            null : 
                                            <MainMenu 
                                            loginLogoutClicked={props.handleLoginLogOutClick}
                                            handleForecastLinksSelect={props.handleForecastLinksSelect}/>
  return(
    <div style={ style } className={classes.SideMenu}>
      {displayLogo}
        <SearchInput 
          click={props.clicked}
          searchHandler={props.searchHandler}/>
        {displaySearchAndFavourites}
        {displayMainMenu}
    </div>
  );
    
}

export default withRouter(sideMenu);
