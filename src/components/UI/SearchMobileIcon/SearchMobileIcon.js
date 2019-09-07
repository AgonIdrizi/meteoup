import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import classes from "./SearchMobileIcon.module.scss";

const searchMobileIcon = () => {
  const iconStyle = {
    color: "white",
    marginTop: "11px",
    height: "25px",
    width: "25px"
  };

  return (
    <div onClick={() => console.log('im clicked')} className={classes.SearchMobileIcon}>
      <FontAwesomeIcon style={iconStyle} icon={faSearch} />
    </div>
  );
};

export default searchMobileIcon;
