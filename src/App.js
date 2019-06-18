import React,{ Component} from 'react';
import './App.module.scss';
import WeatherBuilder from './containers/WeatherBuilder/WeatherBuilder'
import 'antd/dist/antd.css'
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
