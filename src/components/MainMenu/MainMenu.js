import React from 'react';
import { Menu,Item, Icon, Divider } from 'antd';
import {NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faWind } from '@fortawesome/free-solid-svg-icons'
import classes from './MainMenu.module.scss';
const  MainMenu = (props)=> { 
  const displayLoginLogOut = props.loggedIn ? <Menu.Item onClick={props.loginLogoutClicked} ><NavLink to="/account"><Icon type="user"  />Logout</NavLink></Menu.Item> 
                                            : <Menu.Item onClick={props.loginLogoutClicked} ><NavLink to="/account"><Icon type="user"  />Login/Register</NavLink></Menu.Item>
  return (
          <div className={classes.MainMenu}>
            <Menu style={{backgroundColor: '#eef0f1'}} theme="rk">
              <Menu.Item onClick={props.handleForecastLinksSelect} >
                <NavLink 
	                to="7-days-forecast" 
	                exact>
                  <Icon type="home" />7 day forecast
                </NavLink>
                </Menu.Item >
                <Menu.Item onClick={props.handleForecastLinksSelect}>
                  <NavLink 
	                  to="14-days-forecast" 
	                  exact>
                    <Icon type="calendar" />14 day forecast
                  </NavLink>
                </Menu.Item>
                <Menu.Item onClick={props.handleForecastLinksSelect} >
                  <NavLink 
	                  to="air-quality" 
	                  exact><Icon component={() => <FontAwesomeIcon  icon={faWind} />} />Air Quality
                  </NavLink>
                </Menu.Item>
                <Menu.Item onClick={props.handleForecastLinksSelect}><Icon type="mail" />Ag</Menu.Item>
                <div className={classes.Divider}></div>
                {displayLoginLogOut}
            </Menu>    
          </div>
        )
    
}

export default MainMenu