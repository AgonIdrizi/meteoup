import React from "react";
import { Menu, Icon } from "antd";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWind } from "@fortawesome/free-solid-svg-icons";
import classes from "./MainMenu.module.scss";
const MainMenu = props => {
  const mobileStyle = {
    ulMenuStyle: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    liStyle: {
      paddingLeft: "3px",
      paddingRight: "3px",
      fontSize: "12px"
    },
    liAnchorTagStyle: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    iconStyle: {
      height: "25px",
      width: "25px",
      fontSize: "25px",
      marginTop: "4px"
    }
  };
  const { ulMenuStyle, liStyle, liAnchorTagStyle, iconStyle } = mobileStyle;
  const displayLoginLogOut = props.loggedIn ? (
    <Menu.Item
      style={props.isMobile ? { ...liStyle } : null}
      onClick={props.loginLogoutClicked}
    >
      <NavLink
        style={props.isMobile ? { ...liAnchorTagStyle } : null}
        to="/account"
      >
        <Icon style={props.isMobile ? { ...iconStyle } : null} type="user" />
        <span>Logout</span>
      </NavLink>
    </Menu.Item>
  ) : (
    <Menu.Item
      style={props.isMobile ? { ...liStyle } : null}
      onClick={props.loginLogoutClicked}
    >
      <NavLink
        style={props.isMobile ? { ...liAnchorTagStyle } : null}
        to="/account"
      >
        <Icon style={props.isMobile ? { ...iconStyle } : null} type="user" />
        <span>Login/Register</span>
      </NavLink>
    </Menu.Item>
  );

  const divider = props.isMobile ? null : (
    <div className={classes.Divider}></div>
  );
  //const displayMobile = props.isMobile ?  <Menu.Item ><Icon component={() => <FontAwesomeIcon  icon={faEllipsisH} />} /><span>More</span></Menu.Item> : displayLoginLogOut
  const menuMode = props.isMobile ? "horizontal" : "vertical";
  const menuStyle = props.isMobile ? ulMenuStyle : null;
  return (
    <div className={classes.MainMenu}>
      <Menu
        style={{ backgroundColor: "#eef0f1", ...menuStyle }}
        mode={menuMode}
        theme="rk"
      >
        <Menu.Item
          style={props.isMobile ? { ...liStyle } : null}
          onClick={props.handleForecastLinksSelect}
        >
          <NavLink
            style={props.isMobile ? { ...liAnchorTagStyle } : null}
            to="/7-days-forecast"
            exact
          >
            <Icon
              style={props.isMobile ? { ...iconStyle } : null}
              type="home"
            />
            <span>7 day forecast</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item
          style={props.isMobile ? { ...liStyle } : null}
          onClick={props.handleForecastLinksSelect}
        >
          <NavLink
            style={props.isMobile ? { ...liAnchorTagStyle } : null}
            to="/14-days-forecast"
            exact
          >
            <Icon
              style={props.isMobile ? { ...iconStyle } : null}
              type="calendar"
            />
            <span>14 day forecast</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item
          style={props.isMobile ? { ...liStyle } : null}
          onClick={props.handleForecastLinksSelect}
        >
          <NavLink
            style={props.isMobile ? { ...liAnchorTagStyle } : null}
            to="/air-quality"
            exact
          >
            <Icon
              style={props.isMobile ? { ...iconStyle } : null}
              component={() => <FontAwesomeIcon icon={faWind} />}
            />
            <span>Air Quality</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item
          style={props.isMobile ? { ...liStyle } : null}
          onClick={props.handleForecastLinksSelect}
        >
          <NavLink
            style={props.isMobile ? { ...liAnchorTagStyle } : null}
            to="/contact"
            exact
          >
            <Icon
              style={props.isMobile ? { ...iconStyle } : null}
              type="mail"
            />
            <span>Contact</span>
          </NavLink>
        </Menu.Item>
        {divider}
        {displayLoginLogOut}
      </Menu>
    </div>
  );
};

export default MainMenu;
