import React, { Suspense } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Header from "../../MainContent/Header/Header";
import Footer from "../../MainContent/Footer/Footer";
import SideMenu from "../../../containers/SideMenu/SideMenu";
import OpenWeatherMap from "../../MainContent/OpenWeatherMap/OpenWeatherMap";
import Slider from "../../MainContent/Slider/Slider";
import Spinner from "../../UI/Spinner/Spinner";
import classesm from "../../MainContent/MainContent.module.scss";
import VerticalDropDown from "../../UI/VerticalDropdown/VerticalDropdown";
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const SevenDaysForecast = React.lazy(() =>
  import("../../MainContent/SevenDayForecast/SevenDayForecast")
);

const Map = React.lazy(() => import("../../MainContent/Map/Map"));
const Contact = React.lazy(() => import("../../Contact/Contact"));

const webLayout = props => {
  let forecastData = props.isLoading ? (
    <Spinner large="large" />
  ) : (
    <React.Fragment>
      <SevenDaysForecast
        lastSelectedDay={props.lastSelectedDay}
        dayClicked={props.dayClicked}
        forecast={props.forecast}
      />

      <Slider
        changeSlide={props.changeSlide}
        selectedDay={props.selectedDay}
        hourlyForecastData={props.hourlyForecastData}
      />

      <OpenWeatherMap
        data={props.searchQuery}
        longitudeLatitudeSelected={props.longitudeLatitudeSelected}
      />
    </React.Fragment>
  );
  let header = (
    <React.Fragment>
      <Header
        current={props.current}
        isLoading={props.isLoading}
        location={props.locationInfo}
      />
    </React.Fragment>
  );
  let loginRegisterData = (
    <Suspense fallback={<Spinner />}>
      <VerticalDropDown isOpen={props.loginDataSelected} />
    </Suspense>
  );

  let displayContactPage = (
    <React.Fragment>
      <Suspense fallback={<Spinner />}>
        <Contact handleContactFormSubmit={props.handleContactFormSubmit} />
      </Suspense>
    </React.Fragment>
  );

  let displayForecastData = props.searchInputSelected ? null : (
    <React.Fragment>{forecastData}</React.Fragment>
  );

  let webLayout = (
    <>
      <SideMenu
        inputSelected={props.inputSelected}
        searchHandler={props.searchHandler}
        clicked={props.clicked}
        clickRemoveSearch={props.clickRemoveSearch}
        lastVisited={props.lastVisited}
        searchQuery={props.searchQuery}
        selectLocation={props.selectLocation}
        handleLoginLogOutClick={props.handleLoginLogOutClick}
        handleForecastLinksSelect={props.handleForecastLinksSelect}
        deleteLastVisited={props.handleDeleteLastVisitedFromLocalStorage}
      />
      <main style={props.style} className={classesm.MainContent}>
        {loginRegisterData}
        {header}
        <Suspense fallback={<Spinner />}>
          <Route render={({location}) => (

          
            <TransitionGroup className="transition-group">
              <CSSTransition
                key={location.key}
                timeout={ {enter:1000, exit:0}}
                classNames="fade"
              >
            <Switch location={props.location}>
            <Route path="/7-days-forecast" render={() => displayForecastData} />

            <Route
              path="/14-days-forecast"
              exact
              render={() => displayForecastData}
            />
            <Route
              path="/air-quality"
              exact
              render={() => displayForecastData}
            />
            <Route
              path="/search"
              render={() => (
                <Suspense fallback={<Spinner />}>
                  <Map
                    data={props.searchQuery}
                    longitudeLatitudeSelected={props.longitudeLatitudeSelected}
                  />
                </Suspense>
              )}
            />

            <Route path="/account" render={() => displayForecastData} />
            <Route path="/contact" render={() => displayContactPage} />
            <Route path="/" render={() => displayForecastData} />
          </Switch>
          </CSSTransition>
          </TransitionGroup>
        )} />  
          
        </Suspense>
        <Footer isLoading={props.isLoading} />
      </main>
    </>
  );

  return webLayout;
};

export default withRouter(webLayout);
