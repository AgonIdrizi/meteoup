import React,{ Component } from 'react';
import { Menu,Item, Icon } from 'antd';

class MainMenu extends Component {
    
    handleClick = e => {
        console.log('click ', e);
      };
    render(){
        return (
            <div>
                
                <Menu theme="rk">
                    <Menu.Item ><Icon type="home" />7 day forecast</Menu.Item>
                    <Menu.Item ><Icon type="calendar" />14 days forecast</Menu.Item>
                    <Menu.Item ><Icon type="mail" />Ag</Menu.Item>
                    <Menu.Item ><Icon type="mail" />Ag</Menu.Item>
                </Menu>
                
            </div>
        )
    }
}

export default MainMenu