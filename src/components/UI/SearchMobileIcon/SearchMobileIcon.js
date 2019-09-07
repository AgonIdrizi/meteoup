import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import classes from "./SearchMobileIcon.module.scss";

const searchMobileIcon = props => {
  const iconStyle = {
    color: "white",
    marginTop: "11px",
    height: "25px",
    width: "25px"
  };

  return (
    <div
      onClick={() => props.history.push("search")}
      className={classes.SearchMobileIcon}
    >
      <FontAwesomeIcon style={iconStyle} icon={faSearch} />
    </div>
  );
};

export default withRouter(searchMobileIcon);
