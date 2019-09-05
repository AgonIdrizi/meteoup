import React from "react";
import MainMenu from "../MainMenu/index";
import classes from "./MobileLayout.module.scss";

const mobileLayout = props => {
  return (
    <div className={classes.MobileLayout}>
      <MainMenu isMobile={props.isMobile} />
    </div>
  );
};

export default mobileLayout;
