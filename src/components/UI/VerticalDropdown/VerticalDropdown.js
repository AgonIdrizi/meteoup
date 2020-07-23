import React, { useState, useEffect } from "react";
import classes from "./VerticalDropdown.module.scss";
import posed from "react-pose";
import LoginRegister from "../../../containers/LoginRegister/LoginRegister";

const Drop = posed.div({
  visible: {
    width: 200,
    transition: {
      duration: 150,
      ease: "easeIn"
    }
  },
  hidden: {
    width: 0,
    transition: {
      duration: 200,
      ease: "easeOut"
    }
  }
});

const VerticalDropDown = props => {
  //const [isOpen, setIsOpen] = useState(false);

  return (
    <Drop
      className={[classes.VerticalDropDown, "drop"].join(" ")}
      pose={props.isOpen ? "visible" : "hidden"}
    >
      <LoginRegister isOpen={props.isOpen} />
    </Drop>
  );
};
export default VerticalDropDown;
