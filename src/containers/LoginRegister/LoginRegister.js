import React, { useState, useEffect } from 'react';
import Login from './Login/Login'
import Register from './Register/Register'
import Logout from './Logout/Logout'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './LoginRegister.module.scss'


const LoginRegister = (props) => {
    
  const [selectedComponent, setSelectedCompoent] = useState("Login")
  const  handleComponentSelectionClick = (e, value) => {
    e.preventDefault()
    if(selectedComponent !== value){
        setSelectedCompoent(value)
        props.clearErrorMessageHandler()
    }  
  }

  useEffect(() => {
    return () =>{console.log('LoginRegister will unmount')}
  },[])
    
  const loginClasses = props.visible ? classes.slideIn : classes.slideOut
        
  let selectedComp = selectedComponent === "Login" ? <Login loginHandler={props.loginHandler} />: <Register signUpHandler={props.signUpHandler} />
  let clickHandlerDiv = (<div className={classes.SelectComponent}>
                              <a href='#' onClick={e => handleComponentSelectionClick(e,'Login')}><span  classes={classes.Span}>Login</span></a>
                              <a href='#' onClick={ e => handleComponentSelectionClick(e, 'Register')}><span  classes={classes.Span}>Register</span></a>
                            </div>
                          )
  if(props.loggedIn) {
    selectedComp = <Logout logoutHandler={props.logoutHandler} />
    clickHandlerDiv = null
  }
  if(props.isLoading) {
    selectedComp = <Spinner />
  }
  return (
        <>
          <div   className={classes.LoginRegisterData}>
          <p className={classes.Error}>{props.loginRegisterErrorMessage}</p>
          {clickHandlerDiv}
          {selectedComp}
          </div>
          </>
        );
    
}

export default LoginRegister;
