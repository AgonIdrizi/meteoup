import React from "react";
import { Button } from "antd";
import classes from "./Logout.module.scss";
const Logout = props => {
  return (
    <div className={classes.Logout}>
      <p>Logout</p>
      <Button onClick={props.logoutHandler}>Sign Out</Button>
    </div>
  );
};

export default Logout;
