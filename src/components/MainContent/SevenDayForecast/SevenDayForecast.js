import React from "react";
import OneDayForecast from "./OneDayForecast/OneDayForecast";
import PropTypes from "prop-types";
import classes from "./SevenDayForecast.module.scss";


const propTypes = {};

const SevenDayForecast = props => {
  const styleOfSelected = {
    paddingTop: ".5em",
    margin: "-.4em 0 0",
    zIndex: 1,
    width: "105%",
    backgroundColor: "white",
    border: "0px solid lightgrey"
  };
  const defaultStyle = {
    paddingTop: 0,
    margin: 0,
    zIndex: 0,
    width: "100%"
  };
  console.log('forecastday', JSON.stringify(props.forecast))
  const display = props.forecast.map((elem, index) => {
    return (
      <OneDayForecast
        key={elem.dt}
        id={index}
        data={elem}
        style={
          props.lastSelectedDay === index && !props.isMobile
            ? styleOfSelected
            : defaultStyle
        }
        dayClicked={props.dayClicked}
        isMobile={props.isMobile}
      />
    );
  });
  return (
    <div data-testid="sevenDayForecast" className={classes.SevenDayForecast}>
      {display}
    </div>
  );
};

SevenDayForecast.propTypes = propTypes;

export default SevenDayForecast;
