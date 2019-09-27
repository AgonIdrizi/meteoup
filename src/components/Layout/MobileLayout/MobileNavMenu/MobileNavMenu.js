import React from "react";
import MainMenu from "../../../MainMenu/index";
import SearchMobileIcon from "../../../UI/SearchMobileIcon/SearchMobileIcon";
import classes from "./MobileNavMenu.module.scss";

const mobileNavMenu = props => {
  return (
    <>
      <SearchMobileIcon />
      <div className={classes.MobileNavMenu}>
        <MainMenu isMobile={props.isMobile} />
      </div>
    </>
  );
};

export default mobileNavMenu;
