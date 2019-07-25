import React, { Component } from 'react';
import Login from './Login/Login'
import Register from './Register/Register'
import Logout from './Logout/Logout'
import classes from './LoginRegisterData.module.scss'
import { CSSTransition , TransitionGroup } from 'react-transition-group';

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

    componentWillMount(){
        console.log('LoginRegisterData is unmountiung')
    }

    render() {
        let loginClasses = this.props.visible ? classes.slideIn : classes.slideOut
        
        let selectedComponent = this.state.selectedComponent == "Login" ? <Login loginHandler={this.props.loginHandler} /> : <Register />
        let clickHandlerDiv = (
                            <div className={classes.SelectComponent}>
                                <a onClick={e => this.handleComponentSelectionClick(e,'Login')}><span  classes={classes.Span}>Login</span></a>
                                <a onClick={ e => this.handleComponentSelectionClick(e, 'Register')}><span  classes={classes.Span}>Register</span></a>
                            </div>

        )
        if(this.props.loggedIn) {
            selectedComponent = <Logout logoutHandler={this.props.logoutHandler} />
            clickHandlerDiv = null
        }
        console.log(selectedComponent)
        return (
            <div   className={classes.LoginRegisterData}>
                {selectedComponent}
                {clickHandlerDiv}
            </div>
        );
    }
}

export default LoginRegisterData;
