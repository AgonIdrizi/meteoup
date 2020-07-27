import React, { Component, Suspense } from "react";
import classes from "./WeatherBuilder.module.scss";

import withErrorHandling from "../../hoc/withErrorHandling/withErrorHandling";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { getMapBoxGeoData } from "../../services/getMapBoxGeoData";
import { getApiData } from "../../services/getApiData";
import { getParsedItemsFromLocalStorage } from "../../config/localstorage";
import Spinner from "../../components/UI/Spinner/Spinner";
import WebLayout from "../../components/Layout/WebLayout/WebLayout";
import axios from "axios";
import { location, current, forecast } from "../../data/apixuForecastData";
import { hourlyForecastData } from "../../data/openWeatherData";
import { formatOpenWeatherData } from "../../services/formatOpenWeatherData";

const MobileNavMenu = React.lazy(() =>
  import("../../components/Layout/MobileLayout/MobileNavMenu/MobileNavMenu")
);
const MobileLayout = React.lazy(() =>
  import("../../components/Layout/MobileLayout/MobileLayout")
);

class WeatherBuilder extends Component {
  state = {
    lastVisited: getParsedItemsFromLocalStorage("visitedLocation"),
    searchQuery: [],
    longitudeLatitudeSelected: [21.43, 41.98],
    locationNameSelected: "Skopje",
    locationStringFromInput: "skopje",
    forecastData: null,
    searchInputSelected: false,
    loginDataSelected: false,
    lastSelectedDay: 0,
    location: location,
    current: current,
    forecast: forecast,
    hourlyForecastData: hourlyForecastData,
    isLoading: false,
    width: window.screen.width
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
    this.setState({ isLoading: true });
    getApiData(
      this.state.longitudeLatitudeSelected[1],
      this.state.longitudeLatitudeSelected[0],
      this.state.locationNameSelected
    )
      .then(([apixuResponse, openWeatherResponse]) => {
        this.setState({
          current: apixuResponse.data.current,
          forecast: apixuResponse.data.daily.slice(0, -1), // remove last element, because we get 8-day forecast-data, but we need only 7
          location: "Agon",
          hourlyForecastData: formatOpenWeatherData(openWeatherResponse.data),
          isLoading: false
        });
      })
      .catch(error => error);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.locationNameSelected !== this.state.locationNameSelected) {
      this.setState({ isLoading: true });
      getApiData(
        this.state.longitudeLatitudeSelected[1],
        this.state.longitudeLatitudeSelected[0],
        this.state.locationNameSelected
      )
        .then(([apixuResponse, openWeatherResponse]) => {
          this.setState({
            current: apixuResponse.data.current,
            forecast: apixuResponse.data.daily.slice(0, -1), // remove last element, because we get 8-day forecast-data, but we need only 7
            location: "Agon",
            hourlyForecastData: formatOpenWeatherData(openWeatherResponse.data),
            isLoading: false
          });
        })
        .catch(error => error);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.screen.width });
  };

  clickOneDayForecastHandler = (e, id, historyProp, isMobile = false) => {
    e.preventDefault();
    if (this.state.loginDataSelected)
      this.setState({ loginDataSelected: false });
    this.setState({ lastSelectedDay: id });
  };

  changeSlideHandler = (index, historyProp) => {
    if (this.state.loginDataSelected)
      this.setState({ loginDataSelected: false });
    this.setState({ lastSelectedDay: index });
  };

  onOpenMenuHandler = historyProp => {
    historyProp.push("search");
    this.setState({ searchInputSelected: true, loginDataSelected: false });
  };
  onSearchHandler = value => {
    if (value !== "") {
      getMapBoxGeoData(value)
        .then(response => {
          let newSearchQuery = response.data.features.map(elem => {
            return {
              id: elem.id,
              place: elem.text,
              place_name: elem.place_name,
              longitude: parseFloat(elem.center[0].toFixed(2)),
              latitude: parseFloat(elem.center[1].toFixed(2))
            };
          });
          this.setState({
            searchQuery: newSearchQuery,
            locationStringFromInput: value
          });
        })
        .catch(err => console.log(err));
    }
  };

  onRemoveSearchHandler = historyProp => {
    historyProp.push("/");
    this.setState({ searchQuery: [], searchInputSelected: false });
  };

  onSelectLocation = (long, lang, place, e, historyProp) => {
    if (e.type === "click") {
      historyProp.push("/");
      this.handleSaveDataToLocalStorage(long, lang, place);
      return this.setState({
        longitudeLatitudeSelected: [long, lang],
        locationNameSelected: place,
        lastVisited: getParsedItemsFromLocalStorage("visitedLocation"),
        searchInputSelected: false
      });
    }
    this.setState({ longitudeLatitudeSelected: [long, lang] });
  };

  handleSaveDataToLocalStorage = (longitude, latitude, place) => {
    const location = {
      id:
        this.state.lastVisited.length != null
          ? this.state.lastVisited.length + 1
          : 1,
      place: place,
      latitude,
      longitude
    };
    const data = this.state.lastVisited.find(
      elem => elem.place === location.place
    );
    if (data === undefined) {
      return localStorage.setItem(
        "visitedLocation",
        JSON.stringify([...this.state.lastVisited, location])
      );
    }
  };

  handleDeleteLastVisitedFromLocalStorage = e => {
    e.preventDefault();
    localStorage.removeItem("visitedLocation");
    this.setState({ lastVisited: [] });
  };

  handleLoginLogOutClick = () => {
    this.setState({ loginDataSelected: !this.state.loginDataSelected });
  };

  handleForecastLinksSelect = () => {
    return this.state.loginDataSelected
      ? this.setState({ loginDataSelected: false })
      : null;
  };

  render() {
    const {
      width,
      searchInputSelected,
      isLoading,
      loginDataSelected
    } = this.state;
    const isMobile = width <= 500;
    const style = searchInputSelected
      ? { marginLeft: "400px" }
      : { marginLeft: "200px" };

    const layout = isMobile ? (
      <Suspense fallback={<Spinner />}>
        <MobileLayout
          inputSelected={this.state.searchInputSelected}
          searchHandler={this.onSearchHandler}
          clicked={this.onOpenMenuHandler}
          clickRemoveSearch={this.onRemoveSearchHandler}
          lastVisited={this.state.lastVisited}
          searchQuery={this.state.searchQuery}
          selectLocation={this.onSelectLocation}
          handleLoginLogOutClick={this.handleLoginLogOutClick}
          handleForecastLinksSelect={this.handleForecastLinksSelect}
          deleteLastVisited={this.handleDeleteLastVisitedFromLocalStorage}
          lastSelectedDay={this.state.lastSelectedDay}
          longitudeLatitudeSelected={this.state.longitudeLatitudeSelected}
          locationNameSelected={this.state.locationNameSelected}
          dayClicked={this.clickOneDayForecastHandler}
          forecast={this.state.forecast}
          current={this.state.current}
          location={this.state.location}
          changeSlide={this.changeSlideHandler}
          selectedDay={this.state.lastSelectedDay}
          hourlyForecastData={this.state.hourlyForecastData}
          width={width}
          style={style}
          isLoading={isLoading}
          loginDataSelected={loginDataSelected}
          isMobile
        />
      </Suspense>
    ) : (
      <WebLayout
        inputSelected={this.state.searchInputSelected}
        searchHandler={this.onSearchHandler}
        clicked={this.onOpenMenuHandler}
        clickRemoveSearch={this.onRemoveSearchHandler}
        lastVisited={this.state.lastVisited}
        searchQuery={this.state.searchQuery}
        selectLocation={this.onSelectLocation}
        handleLoginLogOutClick={this.handleLoginLogOutClick}
        handleForecastLinksSelect={this.handleForecastLinksSelect}
        deleteLastVisited={this.handleDeleteLastVisitedFromLocalStorage}
        lastSelectedDay={this.state.lastSelectedDay}
        longitudeLatitudeSelected={this.state.longitudeLatitudeSelected}
        dayClicked={this.clickOneDayForecastHandler}
        forecast={this.state.forecast}
        current={this.state.current}
        locationInfo={this.state.location}
        locationNameSelected={this.state.locationNameSelected}
        changeSlide={this.changeSlideHandler}
        selectedDay={this.state.lastSelectedDay}
        hourlyForecastData={this.state.hourlyForecastData}
        width={width}
        style={style}
        isLoading={isLoading}
        loginDataSelected={loginDataSelected}
        isMobile
      />
    );
    return (
      <Router basename="/meteoup">
        <div className={classes.WeatherBuilder}>{layout}</div>
        {isMobile ? (
          <Suspense fallback={<Spinner />}>
            <MobileNavMenu isMobile />
          </Suspense>
        ) : null}
      </Router>
    );
  }
}

export default withErrorHandling(WeatherBuilder, axios);
