import React, { Component } from 'react';
import classes from './WeatherDataInDetail.module.scss'
import moment from 'moment';
import PropTypes, { objectOf } from 'prop-types';


const propTypes = {
    
};


class WeatherDataInDetail extends Component  {
    state={
        isLoading: true
    }
    componentDidMount(){
      this.setState({isLoading: false})
      console.log(this.props.hourlyForecastData)
    }
    
    render() {
      if(this.state.isLoading) {
        return <p>Loading..</p>
      }
      const hours = this.props.hourlyForecastData.map(elem =>(<div key={elem.dt}> {moment(elem.dt_txt).format('HH-0')}</div>))
      const images = this.props.hourlyForecastData.map(elem => <div key={elem.dt} className={classes.WeatherDataIamge} style={{backgroundImage:`url(http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png)`}} ></div>)
      const temp = this.props.hourlyForecastData.map(elem => (<div key={elem.dt}>{elem.main.temp_max}</div>))
      const feltTemp = this.props.hourlyForecastData.map(elem => (<div key={elem.dt}>{elem.main.temp_min}</div>))
      const windDirection = this.props.hourlyForecastData.map(elem => (<div key={elem.dt}>{elem.wind.deg}</div>))
      const windSpeed = this.props.hourlyForecastData.map(elem => (<div key={elem.dt}>{elem.wind.speed}</div>))
    return (
      <div className={classes.WeatherDataInDetail}>
        <div >Selected Day</div>
          {hours}
        <div className={classes.Images}></div>
          {images}
        <div>Temperature</div>
          {temp}
        <div>Felt Temperature</div>
          {feltTemp}
        <div className={classes.windDirection}>Wind direction</div>
          {windDirection}
        <div className={classes.WindSpeed}>Wind speed</div>
          {windSpeed}
        <div className={classes.Precipitation}>Precipitation probability</div>
          {[0,1,2,3,4,5,6,7].map(elem => (<div key={elem}>1%</div>))}
      </div>
    );
    }   
};


WeatherDataInDetail.propTypes = {
    hourlyForecastData: PropTypes.arrayOf(PropTypes.shape({
            dt: PropTypes.number.isRequired,
            dt_txt: PropTypes.string.isRequired,
            main: PropTypes.shape({
              temp_max: PropTypes.number.isRequired,
              temp_min: PropTypes.number.isRequired
            }),
            weather: PropTypes.arrayOf(PropTypes.shape({
              icon: PropTypes.string.isRequired
            })),
            wind: PropTypes.object
    }))
};


export default WeatherDataInDetail;
