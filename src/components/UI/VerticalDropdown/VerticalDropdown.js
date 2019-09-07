import React from "react";
import classes from "./VerticalDropdown.module.scss";
import LoginRegister from "../../../containers/LoginRegister/LoginRegister";

const verticalDropDown = props => {
  return (
    <div className={classes.VerticalDropDown}>
      <LoginRegister />
    </div>
  );
};
export default verticalDropDown;
