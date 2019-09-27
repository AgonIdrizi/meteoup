import React, { Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../../MainContent/Header/Header";
import Footer from "../../MainContent/Footer/Footer";
import SideMenu from "../../../containers/SideMenu/SideMenu";
import OpenWeatherMap from "../../MainContent/OpenWeatherMap/OpenWeatherMap";
import Slider from "../../MainContent/Slider/Slider";
import Spinner from "../../UI/Spinner/Spinner";
import classesm from "../../MainContent/MainContent.module.scss";
import VerticalDropDown from "../../UI/VerticalDropdown/VerticalDropdown";

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
      <Footer />
    </React.Fragment>
  );
  let header = (
    <React.Fragment>
      <Header current={props.current} location={props.location} />
    </React.Fragment>
  );
  let loginRegisterData = props.loginDataSelected ? (
    <Suspense fallback={<Spinner />}>
      <VerticalDropDown />
    </Suspense>
  ) : null;

  let displayContactPage = (
    <React.Fragment>
      {header}
      <Suspense fallback={<Spinner />}>
        <Contact handleContactFormSubmit={props.handleContactFormSubmit} />
      </Suspense>
      <Footer />
    </React.Fragment>
  );

  let displayForecastData = props.searchInputSelected ? null : (
    <React.Fragment>
      {header}
      {forecastData}
    </React.Fragment>
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
        <Suspense fallback={<Spinner />}>
          <Switch>
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
        </Suspense>
      </main>
    </>
  );

  //   let hourlyDataMobile = props.isLoading ? (
  //     <Spinner />
  //   ) : (
  //     <Suspense fallback={<Spinner />}>
  //       <HourlyDataMobile
  //         forecast={props.forecast}
  //         hourlyForecastData={
  //           props.hourlyForecastData[props.lastSelectedDay]
  //         }
  //         dayClicked={props.clickOneDayForecastHandler}
  //         location={props.location}
  //       />
  //     </Suspense>
  //   );

  //   let sevenDaysMobile = (
  //     <>
  //       {header}
  //       <SevenDaysForecast
  //         lastSelectedDay={props.lastSelectedDay}
  //         dayClicked={props.clickOneDayForecastHandler}
  //         forecast={props.forecast}
  //         isMobile={props.isMobile}
  //       />
  //       <Footer />
  //     </>
  //   );
  //   let mobileLayout = (
  //     <>
  //       <Suspense fallback={<Spinner />}>
  //         <Switch>
  //           <Route path="/7-days-forecast" exact render={() => sevenDaysMobile} />
  //           <Route
  //             path="/14-days-forecast"
  //             exact
  //             render={() => sevenDaysMobile}
  //           />
  //           <Route
  //             path="/7-days-forecast/:id"
  //             exact
  //             render={() => hourlyDataMobile}
  //           />
  //           <Route
  //             path="/search"
  //             render={() => (
  //               <SearchAndFavouriteMobile
  //                 clicked={props.onOpenMenuHandler}
  //                 searchHandler={props.onSearchHandler}
  //                 onSelectLocation={props.onSelectLocation}
  //                 lastVisited={props.lastVisited}
  //                 searchQuery={props.searchQuery}
  //                 selectLocation={props.onSelectLocation}
  //                 deleteLastVisited={props.handleDeleteLastVisitedFromLocalStorage}
  //                 isMobile={props.isMobile}
  //               />
  //             )}
  //           />
  //           <Route path="/contact" exact render={() => displayContactPage} />
  //           <Route
  //             path="/account"
  //             render={() => (
  //               <>
  //                 {header}
  //                 <LoginRegister isMobile={props.isMobile} />
  //               </>
  //             )}
  //           />
  //         </Switch>
  //       </Suspense>
  //     </>
  //   );

  //const layout = props.isMobile ? mobileLayout : webLayout;

  return webLayout;
};

export default webLayout;
