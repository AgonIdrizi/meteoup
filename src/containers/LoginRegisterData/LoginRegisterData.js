import React, { Component, useState, useEffect } from 'react';
import Login from './Login/Login'
import Register from './Register/Register'
import Logout from './Logout/Logout'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './LoginRegisterData.module.scss'


const LoginRegisterData = (props) => {
    
  const [selectedComponent, setSelectedCompoent] = useState("Login")
  const  handleComponentSelectionClick = (e, value) => {
    e.preventDefault()
    if(this.state.selectedComponent != value){
        setSelectedCompoent(value)
        this.props.clearErrorMessageHandler()
    }  
  }

  useEffect(() => {
    return () =>{console.log('LoginRegisterData will unmount')}
  },[])
    
  const loginClasses = props.visible ? classes.slideIn : classes.slideOut
        
  let selectedComp = selectedComponent == "Login" ? <Login loginHandler={props.loginHandler} />: <Register signUpHandler={props.signUpHandler} />
  let clickHandlerDiv = (<div className={classes.SelectComponent}>
                              <a onClick={e => handleComponentSelectionClick(e,'Login')}><span  classes={classes.Span}>Login</span></a>
                              <a onClick={ e => handleComponentSelectionClick(e, 'Register')}><span  classes={classes.Span}>Register</span></a>
                            </div>
                          )
  if(props.loggedIn) {
    selectedComp = <Logout logoutHandler={props.logoutHandler} />
    clickHandlerDiv = null
  }
  if(props.isLoading) {
    selectedComp = <Spinner />
  }
  return (<div   className={classes.LoginRegisterData}>
            {selectedComp}
            {clickHandlerDiv}
            <p className={classes.Error}>{props.loginRegisterErrorMessage}</p>
          </div>
        );
    
}

export default LoginRegisterData;
