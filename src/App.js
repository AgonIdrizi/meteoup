import React,{ Component} from 'react';
import './App.module.scss';
import WeatherBuilder from './containers/WeatherBuilder/WeatherBuilder'
import 'antd/dist/antd.css'
import fire from './config/fire';
class App extends Component {
  
  state={
    user:{},
    loggedIn: false
  }

  componentDidMount() {
    this.authListener()
  }


  authListener(){
    fire.auth().onAuthStateChanged(user => {
      console.log(user);
      if(user) {
        this.setState({ user: user, loggedIn: true});
      } else {
        this.setState( {user: null, loggedIn: false });
      }
    })
  }

  loginHandler = (event, loginForm) => {
    event.preventDefault();
    console.log(loginForm)
    const formData = {};
    for( let formElementIdentifier in loginForm) {
        formData[formElementIdentifier] = loginForm[formElementIdentifier].value
    } console.log({...formData})
    fire.auth().signInWithEmailAndPassword(formData.email, formData.password).then(user => {
        console.log(user)
        this.setState({user: {email: user.email, uid: user.uid}, loggedIn: true})
    }).catch(error => {
        console.log(error)
    })
    //send data to backend
    console.log(formData)
  }

  logoutHandler = () =>{
    fire.auth().signOut();
    this.setState({user: null, loggedIn: false})
  }

  signUpHandler = (event) => {

  }
  
  render (){
    return (
      <div className="App">
        <WeatherBuilder 
        user={ this.state.user ? true : false}
        loginHandler={this.loginHandler}
        logoutHandler={this.logoutHandler}
        loggedIn={this.state.loggedIn} />
      </div>
    );
  }
}

export default App;
