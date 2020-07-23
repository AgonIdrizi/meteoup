import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../../MainContent/Header/Header";
import Footer from "../../MainContent/Footer/Footer";
import LoginRegister from "../../../containers/LoginRegister/LoginRegister";
import Spinner from "../../UI/Spinner/Spinner";
import SearchAndFavouriteMobile from "./SearchAndFavouriteMobile/SearchAndFavouriteMobile";

const SevenDaysForecast = React.lazy(() =>
  import("../../MainContent/SevenDayForecast/SevenDayForecast")
);

const HourlyDataMobile = React.lazy(() =>
  import("./HourlyDataMobile/HourlyDataMobile")
);

const Contact = React.lazy(() => import("../../Contact/Contact"));

const MobileLayout = props => {
  let header = (
    <React.Fragment>
      <Header current={props.current} location={props.location} />
    </React.Fragment>
  );

  let displayContactPage = (
    <React.Fragment>
      {header}
      <Suspense fallback={<Spinner />}>
        <Contact handleContactFormSubmit={props.handleContactFormSubmit} />
      </Suspense>
      <Footer />
    </React.Fragment>
  );

  let hourlyDataMobile = props.isLoading ? (
    <Spinner />
  ) : (
    <Suspense fallback={<Spinner />}>
      <HourlyDataMobile
        forecast={props.forecast}
        hourlyForecastData={props.hourlyForecastData[props.lastSelectedDay]}
        lastSelectedDay={props.lastSelectedDay}
        dayClicked={props.clickOneDayForecastHandler}
        deleteLastVisited={props.deleteLastVisited}
        location={props.location}
      />
    </Suspense>
  );

  let sevenDaysMobile = (
    <>
      {header}
      <SevenDaysForecast
        lastSelectedDay={props.lastSelectedDay}
        dayClicked={props.dayClicked}
        forecast={props.forecast}
        isMobile={props.isMobile}
      />
      <Footer />
    </>
  );
  let mobileLayout = (
    <>
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/7-days-forecast" exact render={() => sevenDaysMobile} />
          <Route
            path="/14-days-forecast"
            exact
            render={() => sevenDaysMobile}
          />
          <Route
            path="/7-days-forecast/:id"
            exact
            render={() => hourlyDataMobile}
          />
          <Route
            path="/search"
            render={() => (
              <SearchAndFavouriteMobile
                clicked={props.clicked}
                searchHandler={props.searchHandler}
                clickRemoveSearch={props.clickRemoveSearch}
                lastVisited={props.lastVisited}
                searchQuery={props.searchQuery}
                onSelectLocation={props.selectLocation}
                deleteLastVisited={props.deleteLastVisited}
                isMobile={props.isMobile}
              />
            )}
          />
          <Route path="/contact" exact render={() => displayContactPage} />
          <Route
            path="/account"
            render={() => (
              <>
                {header}
                <LoginRegister isOpen isMobile={props.isMobile} />
              </>
            )}
          />
          <Route path="/" render={() => sevenDaysMobile} />
        </Switch>
      </Suspense>
    </>
  );

  return mobileLayout;
};

export default MobileLayout;
