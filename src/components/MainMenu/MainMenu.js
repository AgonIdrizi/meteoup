import React,{ Component } from 'react';
import { Menu,Item, Icon } from 'antd';
import {NavLink} from 'react-router-dom';

class MainMenu extends Component {
    
    render(){
        let displayLoginLogOut = this.props.loggedIn ? <Menu.Item onClick={this.props.loginLogoutClicked} ><NavLink to="/account"><Icon type="user"  />Logout</NavLink></Menu.Item> 
                                                       : <Menu.Item onClick={this.props.loginLogoutClicked} ><NavLink to="/account"><Icon type="user"  />Login/Register</NavLink></Menu.Item>
        return (
            <div>
                
                <Menu theme="rk">
                    <Menu.Item >
                      <NavLink 
	                    to="7-days-forecast" 
	                    exact>
                        <Icon type="home" />7 day forecast
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item >
                    <NavLink 
	                    to="14-days-forecast" 
	                    exact>
                        <Icon type="calendar" />14 day forecast
                      </NavLink>
                    </Menu.Item>
                    <Menu.Item ><Icon type="mail" />Ag</Menu.Item>
                    <Menu.Item ><Icon type="mail" />Ag</Menu.Item>
                    {displayLoginLogOut}
                </Menu>
                
            </div>
        )
    }
}

export default MainMenu