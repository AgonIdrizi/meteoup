import React from "react";
import fire from "../config/fire";
export const LoginRegisterContext = React.createContext();

export class LoginRegisterProvider extends React.Component {
  state = {
    user: {},
    loggedIn: false,
    loginRegisterErrorMessage: null,
    isLoading: false
  };

  authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user: user, loggedIn: true });
      } else {
        this.setState({ user: null, loggedIn: false });
      }
    });
  };

  loginHandler = (event, loginForm) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const formData = {};
    for (let formElementIdentifier in loginForm) {
      formData[formElementIdentifier] = loginForm[formElementIdentifier].value;
    }
    fire
      .auth()
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then(user => {
        this.setState({
          user: { email: user.email, uid: user.uid },
          loggedIn: true,
          loginRegisterErrorMessage: null,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          loginRegisterErrorMessage: error.message,
          isLoading: false
        });
      });
  };

  logoutHandler = () => {
    fire.auth().signOut();
    this.setState({ user: null, loggedIn: false });
  };

  signUpHandler = (event, signUpForm) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const formData = {};
    for (let formElementIdentifier in signUpForm) {
      formData[formElementIdentifier] = signUpForm[formElementIdentifier].value;
    }
    fire
      .auth()
      .createUserWithEmailAndPassword(formData.email, formData.password)
      .then(user => {
        this.setState({
          user: { email: user.email, uid: user.uid },
          loggedIn: true,
          loginRegisterErrorMessage: null,
          isLoading: false
        });
      })
      .catch(error => {
        this.setState({
          loginRegisterErrorMessage: error.message,
          isLoading: false
        });
      });
  };

  clearErrorMessageHandler = () => {
    this.setState({ loginRegisterErrorMessage: null });
  };

  componentWillUnmount(){
    fire.auth().onAuthStateChanged(user => {
      this.setState({ user: null, loggedIn: false });
    })
  }

  render() {
    return (
      <LoginRegisterContext.Provider
        value={{
          ...this.state,
          loginHandler: this.loginHandler,
          logoutHandler: this.logoutHandler,
          authListener: this.authListener,
          signUpHandler: this.signUpHandler,
          clearErrorMessageHandler: this.clearErrorMessageHandler
        }}
      >
        {this.props.children}
      </LoginRegisterContext.Provider>
    );
  }
}
