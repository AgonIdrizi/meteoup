import React from "react";
import OneDayForecast from "../../MainContent/SevenDayForecast/OneDayForecast/OneDayForecast";
import Degrees from "../../MainContent/SevenDayForecast/OneDayForecast/Degrees/Degrees";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerFull,
  faHandPaper,
  faTint,
  faWind
} from "@fortawesome/free-solid-svg-icons";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import classes from "./HourlyDataMobile.module.scss";

const windDegreesToWords = degree => {
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

const hourlyDataMobile = props => {
  const dayInText = moment(props.hourlyForecastData[0].dt_txt).format("dddd");

  const hours = props.hourlyForecastData.map(elem => (
    <div key={elem.dt}> {moment(elem.dt_txt).format("HH-00")}</div>
  ));
  const images = props.hourlyForecastData.map(elem => (
    <div
      key={elem.dt}
      className={classes.WeatherDataIamge}
      style={{
        backgroundImage: `url(http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png)`
      }}
    ></div>
  ));
  const temp = props.hourlyForecastData.map(elem => (
    <Degrees key={elem.dt} degree={elem.main.temp_max} />
  ));
  const feltTemp = props.hourlyForecastData.map(elem => (
    <Degrees key={elem.dt} degree={elem.main.temp_min} />
  ));
  const windDirection = props.hourlyForecastData.map(elem => (
    <div key={elem.dt}>{windDegreesToWords(parseFloat(elem.wind.deg))}</div>
  ));
  const windSpeed = props.hourlyForecastData.map(elem => (
    <div key={elem.dt}>{elem.wind.speed}</div>
  ));
  console.log(props.history);
  return (
    <>
      <header className={classes.hourlyDataHeader}>
        <Link to="/7-days-forecast">{"<".concat("Back")}</Link>
        <h2>{props.location}</h2>
      </header>
      <OneDayForecast data={props.forecast.forecastday[0]} id={0} />
      <div className={classes.WeatherDataInDetail}>
        <div className={classes.SelectedDay}>
          <span>cl</span>
          {hours}
        </div>
        <div className={classes.Temperature}>
          <span>
            <FontAwesomeIcon icon={faThermometerFull} />
          </span>
          {temp}
        </div>

        <div className={classes.Temperature}>
          <span>
            <FontAwesomeIcon icon={faHandPaper} />
          </span>
          {feltTemp}
        </div>

        <div className={classes.WindDirection}>
          <span>
            <FontAwesomeIcon icon={faWind} />
          </span>
          {windDirection}
        </div>

        <div className={classes.WindSpeed}>
          <span>
            <FontAwesomeIcon icon={faWind} />
          </span>
          {windSpeed}
        </div>

        <div className={classes.Precipitation}>
          <span>
            <FontAwesomeIcon icon={faTint} />
          </span>
          {[0, 1, 2, 3, 4, 5, 6, 7].map(elem => (
            <div key={elem}>0%</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default hourlyDataMobile;
