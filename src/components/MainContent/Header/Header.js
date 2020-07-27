import React from "react";
import classes from "./Header.module.scss";
import moment from "moment";

const header = props => {
  if (props.isLoading) return null;
  console.log("props", JSON.stringify(props));
  return (
    <React.Fragment>
      <header className={classes.mainHeader}>
        <div className={classes.headerInfo}>
          <div>
            <h1 data-testid="h1tag">Weather in </h1>
            <span>
              {props.locationNameSelected}
              <span>   {`${props.longitudeLatitudeSelected[0]} N ${props.longitudeLatitudeSelected[1]} E`}</span>
            </span>
          </div>
          <div className={classes.headerImage}>
            <div
              title={
                props.isLoading ? props.current.weather[0].description : ""
              }
            >
              <img
                alt={
                  props.isLoading ? props.current.weather[0].description : ""
                }
                src={props.isLoading ? props.current.weather[0].icon : ""}
                style={{ height: "54px" }}
              />
              <span>{`${props.current.temp} °C`}</span>
            </div>
            <div>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default React.memo(header);
