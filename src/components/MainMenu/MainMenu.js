import React,{ Component } from 'react';
import { Menu,Item, Icon } from 'antd';

class MainMenu extends Component {
    
    handleClick = e => {
        console.log('click ', e);
      };
    render(){
        let displayLoginLogOut = this.props.loggedIn ? <Menu.Item onClick={this.props.logoutClicked} ><Icon type="user"  />Logout</Menu.Item> 
                                                       : <Menu.Item onClick={this.props.loginClicked} ><Icon type="user"  />Login/Register</Menu.Item>
        return (
            <div>
                
                <Menu theme="rk">
                    <Menu.Item ><Icon type="home" />7 day forecast</Menu.Item>
                    <Menu.Item ><Icon type="calendar" />14 days forecast</Menu.Item>
                    <Menu.Item ><Icon type="mail" />Ag</Menu.Item>
                    <Menu.Item ><Icon type="mail" />Ag</Menu.Item>
                    {displayLoginLogOut}
                </Menu>
                
            </div>
        )
    }
}

export default MainMenu