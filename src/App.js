import React,{ Component} from 'react';
import './App.css';
import WeatherBuilder from './containers/WeatherBuilder/WeatherBuilder'

class App extends Component {
  render (){
    return (
      <div className="App">
        <WeatherBuilder />
      </div>
    );
  }
}

export default App;
