import React,{ Component} from 'react';
import './App.module.scss';
import WeatherBuilder from './containers/WeatherBuilder/WeatherBuilder'
import 'antd/dist/antd.css'
import fire from './config/fire';
class App extends Component {
  
  

  componentDidMount() {
    this.props.authListener()
  }

  
  render (){
    return (
      <div className="App">
        <WeatherBuilder 
        user={ this.props.user ? true : false}/>
      </div>
    );
  }
}

export default App;
