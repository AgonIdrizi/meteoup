import React from "react";
import classes from "./Image.module.scss";
import { weatherIconUrl } from '../../../../../utils/weatherIconUrl'

import PropTypes from "prop-types";

const propTypes = {};

const image = props => {
  return (
    <div style={{ backgroundColor: "#cadbea" }} className={classes.Image}>
      <div title={props.condition.description}>
        <img
          alt={props.condition.description}
          src={weatherIconUrl(props.condition.icon)}
          height="50px"
        />
      </div>
    </div>
  );
};

image.propTypes = propTypes;

export default image;
