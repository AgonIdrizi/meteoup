import React, { Component } from 'react';
import classes from './WeatherBuilder.module.scss';
import SideMenu from '../SideMenu/SideMenu'
import MainContent from '../../components/MainContent/MainContent';

import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getMapBoxGeoData }  from '../../services/getMapBoxGeoData';
import { getApiData } from '../../services/getApiData'
import { getParsedItemsFromLocalStorage } from '../../config/localstorage'
import Header from './../../components/MainContent/Header/Header'
import Footer from './../../components/MainContent/Footer/Footer'
import Map from './../../components/MainContent/Map/Map'
import SevenDaysForecast from './../../components/MainContent/SevenDayForecast/SevenDayForecast'
import WeatherDataInDetail from './../../components/MainContent/WeatherDataInDetail/WeatherDataInDetail'
import Contact from './../../components/Contact/Contact'
import OpenWeatherMap from './../../components/MainContent/OpenWeatherMap/OpenWeatherMap'
import Slider from '../../components/MainContent/Slider/Slider'
import VerticalDropDown from '../../components/UI/VerticalDropdown/VerticalDropdown'
import Spinner from '../../components/UI/Spinner/Spinner'
import classesm from '../../components/MainContent/MainContent.module.scss'
import axios from 'axios';
import {location, current, forecast} from '../../data/apixuForecastData'
import { hourlyForecastData } from '../../data/openWeatherData'
import { formatOpenWeatherData } from '../../services/formatOpenWeatherData'
import { database } from '../../config/fire';
class WeatherBuilder extends Component {
    state = {
        lastVisited:getParsedItemsFromLocalStorage('visitedLocation'),
        searchQuery: [],
        longitudeLatitudeSelected: [21.43,41.98],
        locationNameSelected: 'Skopje',
        locationStringFromInput: 'skopje',
        forecastData: null,
        searchInputSelected: false,
        loginDataSelected: false,
        lastSelectedDay: 0,
        location: location,
        current: current,
        forecast: forecast,
        hourlyForecastData: hourlyForecastData,
        isLoading: false
    }

    
    componentDidMount() {
      this.setState({isLoading: true})
      getApiData(this.state.longitudeLatitudeSelected[1], this.state.longitudeLatitudeSelected[0], this.state.locationNameSelected)
      .then(([apixuResponse, openWeatherResponse]) => {
        console.log(apixuResponse.data)
            this.setState({current: apixuResponse.data.current,forecast: apixuResponse.data.forecast, location: apixuResponse.data.location,hourlyForecastData: formatOpenWeatherData(openWeatherResponse.data), isLoading: false})  
      })
      .catch(error => error)
    }

    
    componentDidUpdate(prevProps, prevState) {
      if(prevState.locationNameSelected != this.state.locationNameSelected) {
        getApiData(this.state.longitudeLatitudeSelected[1], this.state.longitudeLatitudeSelected[0], this.state.locationNameSelected)
        .then(([apixuResponse, openWeatherResponse]) => {
          console.log(apixuResponse.data)
          this.setState({current: apixuResponse.data.current,forecast: apixuResponse.data.forecast, location: apixuResponse.data.location, hourlyForecastData: formatOpenWeatherData(openWeatherResponse.data)})  
        })
        .catch(error => error) 
      }
    }
  

    clickOneDayForecastHandler = (e, id) => {
      e.preventDefault()
      this.setState({lastSelectedDay: id}) 
    }

    changeSlideHandler = (index) => {
      this.setState({lastSelectedDay: index})
    }
    
    
    
    onOpenMenuHandler = (historyProp) =>{
      historyProp.push("search")
      this.setState({searchInputSelected: true, loginDataSelected: false})
    }
    onSearchHandler = (value)=>{
      if(value != ''){
        getMapBoxGeoData(value)
          .then(response => {
            let newSearchQuery=response.data.features.map(elem => {
              console.log(elem)
            return {id: elem.id, place: elem.text, place_name: elem.place_name, longitude: parseFloat(elem.center[0].toFixed(2)), latitude: parseFloat(elem.center[1].toFixed(2))}
          })
          this.setState({searchQuery: newSearchQuery, locationStringFromInput: value})
          }).catch(err => console.log( err))
      }
    }

    onRemoveSearchHandler = (historyProp) =>{
      historyProp.push('/')
      this.setState({searchQuery: [], searchInputSelected: false})
    }

    onSelectLocation = (long, lang,place, e, historyProp) => {
      if (e.type == 'click'){
        historyProp.push('/')
        this.handleSaveDataToLocalStorage(long, lang, place)
        return this.setState({longitudeLatitudeSelected: [long, lang], locationNameSelected: place,  lastVisited: getParsedItemsFromLocalStorage('visitedLocation')  , searchInputSelected: false})
      }
      this.setState({longitudeLatitudeSelected: [long, lang]})
    }

    handleSaveDataToLocalStorage = (longitude,latitude, place) => {
      const location ={
        id: this.state.lastVisited.length != null ? this.state.lastVisited.length + 1 : 1,
        place: place,
        latitude,
        longitude
      }
      const data = this.state.lastVisited.find(elem => elem.place == location.place)
      if( data == undefined) {
        return localStorage.setItem('visitedLocation', JSON.stringify([...this.state.lastVisited, location ]))
      }
    }

    handleDeleteLastVisitedFromLocalStorage = (e) =>{
      e.preventDefault()
      localStorage.removeItem('visitedLocation');
      this.setState({lastVisited: []})
    }

    handleLoginLogOutClick = (long, lat,place) => {
      this.setState({loginDataSelected: !this.state.loginDataSelected})
    };

    handleForecastLinksSelect = () => {
      return this.state.loginDataSelected  ? this.setState({loginDataSelected: false}) : null
    }

    
    
    render() {
        const style = this.state.searchInputSelected ? {marginLeft: '400px'} : {marginLeft:'200px'}
        
        let forecastData = this.state.isLoading ? <Spinner large="large" /> : 
                                                 <React.Fragment >
                                                    <SevenDaysForecast 
                                                        lastSelectedDay={this.state.lastSelectedDay}
                                                        clicked={this.clickOneDayForecastHandler}
                                                        forecast={this.state.forecast} />
                                                        <div>
                                                            <Slider 
                                                                changeSlide={this.changeSlideHandler}
                                                                selectedDay = {this.state.lastSelectedDay}
                                                                hourlyForecastData={this.state.hourlyForecastData} /> 
                                                        </div>
                                                        <OpenWeatherMap data={this.state.searchQuery}
                                                              longitudeLatitudeSelected={this.state.longitudeLatitudeSelected} />
                                                        <Footer />
                                                </React.Fragment>
        let header =<React.Fragment >
                                <Header  current={this.state.current} 
                                        location={this.state.location} /> 
                            
                            </React.Fragment>
        let loginRegisterData = this.state.loginDataSelected   ? <VerticalDropDown /> : null
                                                                 
        let displayContactPage = <React.Fragment>
                                   {header}
                                   <Contact handleContactFormSubmit={this.handleContactFormSubmit} />
                                   <Footer />
                                 </React.Fragment>


        let displayForecastData = this.state.searchInputSelected ? null :
                                                <React.Fragment>
                                                  {header}
                                                  {forecastData}
                                                </React.Fragment>
        return (
            <Router>
              <div className={classes.WeatherBuilder}>
                <SideMenu 
                  inputSelected={this.state.searchInputSelected}
                  searchHandler={this.onSearchHandler}
                  clicked={this.onOpenMenuHandler}
                  clickRemoveSearch={this.onRemoveSearchHandler}
                  lastVisited={this.state.lastVisited}
                  searchQuery={this.state.searchQuery}
                  selectLocation={this.onSelectLocation}
                  handleLoginLogOutClick={this.handleLoginLogOutClick}
                  handleForecastLinksSelect={this.handleForecastLinksSelect}
                  deleteLastVisited={this.handleDeleteLastVisitedFromLocalStorage}/>
                 <main style={style}  className={classesm.MainContent}>
                   {loginRegisterData}
                   <Switch>
                     <Route path="/7-days-forecast"  render={()=> displayForecastData}/>
                     <Route path="/14-days-forecast" exact render={()=> displayForecastData}/>
                     <Route path="/air-quality" exact render={()=> displayForecastData}/>
                     <Route path="/search" render={() => <Map data={this.state.searchQuery}
                                                              longitudeLatitudeSelected={this.state.longitudeLatitudeSelected} />} 
                    />
                     <Route path="/account" render={() => displayForecastData}/>
                     <Route path="/contact" exact render={()=> displayContactPage}/>
                     <Route path="/" render={() => displayForecastData}/>
                   </Switch>
                   
                </main>
                
              </div>
            </Router>
        );
    }
}

export default withErrorHandling(WeatherBuilder, axios);
