import React, { Component } from 'react';
import Login from './Login/Login'
import Register from './Register/Register'

import classes from './LoginRegisterData.module.scss'

class LoginRegisterData extends Component {
    state= {
        selectedComponent:"Login"
    }
    handleComponentSelectionClick = (e, value) => {
        e.preventDefault()
        console.log('hande selection click',value)
        
         if(this.state.selectedComponent != value){
            this.setState({selectedComponent: value})
         }
        
    }
    render() {
        let selectedComponent = this.state.selectedComponent == "Login" ? <Login /> : <Register />
        console.log(selectedComponent)
        return (
            <div className={classes.LoginRegisterData}>
                ff
                <div className={classes.SelectComponent}>
                    <a onClick={e => this.handleComponentSelectionClick(e,'Login')}><span  classes={classes.Span}>Login</span></a>
                    <a onClick={ e => this.handleComponentSelectionClick(e, 'Register')}><span  classes={classes.Span}>Register</span></a>
                </div>
                {selectedComponent}
            </div>
        );
    }
}

export default LoginRegisterData;
