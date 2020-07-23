import React from "react";
import Image from "./Image/Image";
import Degrees from "./Degrees/Degrees";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import classes from "./OneDayForecast.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind, faCloudRain } from "@fortawesome/free-solid-svg-icons";

const propTypes = {};

const oneDayForecast = props => {
  const isInDetailPageEvent = props.isInDetailsPage
    ? null
    : e => props.dayClicked(e, props.id, props.history, props.isMobile);
  return (
    <div
      style={props.style}
      onClick={isInDetailPageEvent}
      className={classes.OneDayForecast}
    >
      <div className="Date">
        <div>
          <span className={classes.DayName}>
            {moment(props.data.day).format("ddd")}
          </span>
        </div>
        <div>
          <span>{moment(props.data.night).format("M/D")}</span>
        </div>
      </div>
      <Image
        isMobile={props.isMobile}
        condition={props.data.weather[0]}
      />
      <Degrees
        isMobile={props.isMobile}
        isInDetailsPage={props.isInDetailsPage || false}
        degree={props.data.temp.max}
      />
      <Degrees
        isMobile={props.isMobile}
        isInDetailsPage={props.isInDetailsPage || false}
        degree={props.data.temp.min}
      />
      <div className={classes.WindRainSunInfo}>
        <div className={classes.Wind}>
          <span>
            <FontAwesomeIcon icon={faWind} />
          </span>
          <span>{props.data.wind_speed} km/h</span>
        </div>
        <div className={classes.Rain}>
          <span>
            <FontAwesomeIcon style={{ color: "#036f90" }} icon={faCloudRain} />
          </span>
          <span>{props.data.rain} mm</span>
        </div>
        <div>
          <span>..</span>
          <span>3 h</span>
        </div>
      </div>
      <div className="Info-color"></div>
    </div>
  );
};

oneDayForecast.propTypes = {
  id: PropTypes.number,
  style: PropTypes.object,
  data: PropTypes.shape({
    date: PropTypes.string.isRequired,
    day: PropTypes.shape({
      condition: PropTypes.object.isRequired,
      maxwind_kph: PropTypes.number.isRequired,
      totalprecip_mm: PropTypes.number.isRequired
    })
  })
};

export default withRouter(oneDayForecast);
