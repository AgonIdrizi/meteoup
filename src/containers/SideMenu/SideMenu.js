import React, { Suspense } from "react";
import SearchInput from "../../components/UI/SearchInput/SearchInput";
import MainMenu from "../../components/MainMenu/index";
import Logo from "../../components/UI/Logo/Logo";
import CloseSpan from "../../components/UI/CloseSpan/CloseSpan";
import Spinner from "../../components/UI/Spinner/Spinner";
import { withRouter } from "react-router-dom";
import classes from "./SideMenu.module.scss";

const SearchAndFavourite = React.lazy(() =>
  import("./SearchAndFavourite/index")
);

const sideMenu = props => {
  const style = props.inputSelected ? { width: "400px" } : { width: "200px" };
  const displayLogo = props.inputSelected ? (
    <CloseSpan clickedX={() => props.clickRemoveSearch(props.history)} />
  ) : (
    <Logo />
  );
  const displaySearchAndFavourites = props.inputSelected ? (
    <Suspense fallback={<Spinner />}>
      <SearchAndFavourite
        lastVisited={props.lastVisited}
        searchQuery={props.searchQuery}
        onSelectLocation={props.selectLocation}
        deleteLastVisited={props.deleteLastVisited}
      />
    </Suspense>
  ) : null;
  const displayMainMenu = props.inputSelected ? null : (
    <MainMenu
      loginLogoutClicked={props.handleLoginLogOutClick}
      handleForecastLinksSelect={props.handleForecastLinksSelect}
    />
  );
  return (
    <div style={style} className={classes.SideMenu}>
      {displayLogo}
      <SearchInput click={props.clicked} searchHandler={props.searchHandler} />
      {displaySearchAndFavourites}
      {displayMainMenu}
    </div>
  );
};

export default withRouter(sideMenu);
