import React,{ Component} from 'react';
import './App.module.scss';
import WeatherBuilder from './containers/WeatherBuilder/WeatherBuilder'
import 'antd/dist/antd.css'
import fire from './config/fire';
class App extends Component {
  
  state={
    user:{},
    loggedIn: false,
    loginRegisterErrorMessage: null
  }

  componentDidMount() {
    this.authListener()
  }


  authListener(){
    fire.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({ user: user, loggedIn: true});
      } else {
        this.setState( {user: null, loggedIn: false });
      }
    })
  }

  loginHandler = (event, loginForm) => {
    event.preventDefault();
   
    const formData = {};
    for( let formElementIdentifier in loginForm) {
        formData[formElementIdentifier] = loginForm[formElementIdentifier].value
    } 
    fire.auth().signInWithEmailAndPassword(formData.email, formData.password).then(user => {
        
        this.setState({user: {email: user.email, uid: user.uid}, loggedIn: true})
    }).catch(error => {
        this.setState({loginRegisterErrorMessage: error.message})
    })
    
  }

  logoutHandler = () =>{
    fire.auth().signOut();
    this.setState({user: null, loggedIn: false})
  }

  signUpHandler = (event, signUpForm) => {
    event.preventDefault()
    const formData = {};
    for( let formElementIdentifier in signUpForm) {
        formData[formElementIdentifier] = signUpForm[formElementIdentifier].value
    } 
    fire.auth().createUserWithEmailAndPassword(formData.email, formData.password).then(user => {
      this.setState({user: {email: user.email, uid: user.uid}, loggedIn: true})
    }).catch(error => {
      this.setState({loginRegisterErrorMessage: error.message})
    })
  }
  
  render (){
    return (
      <div className="App">
        <WeatherBuilder 
        user={ this.state.user ? true : false}
        loginHandler={this.loginHandler}
        logoutHandler={this.logoutHandler}
        signUpHandler={this.signUpHandler}
        loggedIn={this.state.loggedIn}
        loginRegisterErrorMessage={this.state.loginRegisterErrorMessage} />
      </div>
    );
  }
}

export default App;
