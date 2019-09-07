import React, { Component } from "react";
import classes from "./WeatherDataInDetail.module.scss";
import moment from "moment";
import Degrees from "../SevenDayForecast/OneDayForecast/Degrees/Degrees";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerFull,
  faHandPaper,
  faTint,
  faWind
} from "@fortawesome/free-solid-svg-icons";

const propTypes = {};

class WeatherDataInDetail extends Component {
  state = {
    isLoading: true
  };
  componentDidMount() {
    this.setState({ isLoading: false });
  }

  windDegreesToWords = degree => {
    if (degree >= 348.75 && degree < 11.25) {
      return "N";
    }

    if (degree >= 11.25 && degree < 33.75) {
      return "NNE";
    }

    if (degree >= 33.75 && degree < 56.25) {
      return "NE";
    }

    if (degree >= 56.25 && degree < 78.75) {
      return "ENE";
    }

    if (degree >= 78.75 && degree < 101.25) {
      return "E";
    }

    if (degree >= 101.25 && degree < 123.75) {
      return "ESE";
    }

    if (degree >= 123.75 && degree < 146.25) {
      return "SE";
    }

    if (degree >= 146.25 && degree < 168.75) {
      return "SSE";
    }

    if (degree >= 168.75 && degree < 191.25) {
      return "S";
    }

    if (degree >= 191.25 && degree < 213.75) {
      return "SSW";
    }

    if (degree >= 213.75 && degree < 236.25) {
      return "SW";
    }

    if (degree >= 236.25 && degree < 258.75) {
      return "WSW";
    }

    if (degree >= 258.75 && degree < 281.25) {
      return "W";
    }

    if (degree >= 281.25 && degree < 303.75) {
      return "WNW";
    }

    if (degree >= 303.75 && degree < 326.25) {
      return "NW";
    }

    if (degree >= 326.25 && degree < 348.75) {
      return "NW";
    }
  };

  render() {
    if (this.state.isLoading) {
      return <p>Loading..</p>;
    }
    const dayInText = moment(
      this.props.hourlyForecastData[this.props.dayId].dt_txt
    ).format("dddd");
    const hours = this.props.hourlyForecastData.map(elem => (
      <div key={elem.dt}> {moment(elem.dt_txt).format("HH-00")}</div>
    ));
    const images = this.props.hourlyForecastData.map(elem => (
      <div
        key={elem.dt}
        className={classes.WeatherDataIamge}
        style={{
          backgroundImage: `url(http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png)`
        }}
      ></div>
    ));
    const temp = this.props.hourlyForecastData.map(elem => (
      <Degrees key={elem.dt} degree={elem.main.temp_max} />
    ));
    const feltTemp = this.props.hourlyForecastData.map(elem => (
      <Degrees key={elem.dt} degree={elem.main.temp_min} />
    ));
    const windDirection = this.props.hourlyForecastData.map(elem => (
      <div key={elem.dt}>
        {this.windDegreesToWords(parseFloat(elem.wind.deg))}
      </div>
    ));
    const windSpeed = this.props.hourlyForecastData.map(elem => (
      <div key={elem.dt}>{elem.wind.speed}</div>
    ));
    return (
      <div className={classes.WeatherDataInDetail}>
        <div className={classes.SelectedDay}>
          <span>{dayInText}</span>
        </div>
        {hours}
        <div className={classes.Images}></div>
        {images}
        <div className={classes.Temperature}>
          <span>
            <FontAwesomeIcon icon={faThermometerFull} />
          </span>
          <h4>Temperature</h4>
        </div>
        {temp}
        <div className={classes.Temperature}>
          <span>
            <FontAwesomeIcon icon={faHandPaper} />
          </span>
          <h4>Felt Temperature</h4>
        </div>
        {feltTemp}
        <div className={classes.windDirection}>
          <span>
            <FontAwesomeIcon icon={faWind} />
          </span>
          <h4>Wind direction</h4>
        </div>
        {windDirection}
        <div className={classes.WindSpeed}>
          <span>
            <FontAwesomeIcon icon={faWind} />
          </span>
          <h4>Wind speed</h4>
        </div>
        {windSpeed}
        <div className={classes.Precipitation}>
          <span>
            <FontAwesomeIcon icon={faTint} />
          </span>
          <h4>Precipitation probability</h4>
        </div>
        {[0, 1, 2, 3, 4, 5, 6, 7].map(elem => (
          <div key={elem}>0%</div>
        ))}
      </div>
    );
  }
}

WeatherDataInDetail.propTypes = {
  hourlyForecastData: PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.number.isRequired,
      dt_txt: PropTypes.string.isRequired,
      main: PropTypes.shape({
        temp_max: PropTypes.number.isRequired,
        temp_min: PropTypes.number.isRequired
      }),
      weather: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.string.isRequired
        })
      ),
      wind: PropTypes.object
    })
  )
};

export default WeatherDataInDetail;
