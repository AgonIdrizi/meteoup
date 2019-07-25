import React,{ Component} from 'react';
import './App.module.scss';
import WeatherBuilder from './containers/WeatherBuilder/WeatherBuilder'
import 'antd/dist/antd.css'
import fire from './config/fire';
class App extends Component {
  
  state={
    user:{}
  }

  componentDidMount() {
    this.authListener()
  }


  authListener(){
    fire.auth().onAuthStateChanged(user => {
      console.log(user);
      if(user) {
        this.setState({ user});
      } else {
        this.setState( {user: null });
      }
    })
  }

  loginHandler = (event, loginForm) => {
    event.preventDefault();
    
    const formData = {};
    for( let formElementIdentifier in loginForm) {
        formData[formElementIdentifier] = loginForm[formElementIdentifier].value
    } console.log({...formData})
    fire.auth().signInWithEmailAndPassword(formData['email'], formData['password']).then(user => {
        console.log(user)
        
    }).catch(error => {
        console.log(error)
    })
    //send data to backend
    console.log(formData)
}
  
  render (){
    return (
      <div className="App">
        <WeatherBuilder 
        user={ this.state.user ? true : false}
        loginHandler={this.loginHandler} />
      </div>
    );
  }
}

export default App;
