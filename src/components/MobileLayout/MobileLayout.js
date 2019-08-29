import React from "react";
import Header from "../MainContent/Header/Header";
import Footer from "../MainContent/Footer/Footer";
import MainMenu from "../MainMenu/index";
import SevenDayForecast from "../MainContent/SevenDayForecast/SevenDayForecast";
import classes from "./MobileLayout.module.scss";

const mobileLayout = props => {
  return (
    <div className={classes.MobileLayout}>
      
      <MainMenu isMobile={props.isMobile} />
    </div>
  );
};

export default mobileLayout;
