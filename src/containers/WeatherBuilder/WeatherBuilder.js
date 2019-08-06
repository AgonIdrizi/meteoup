import React, { Component } from 'react';
import classes from './WeatherBuilder.module.scss';
import SideMenu from '../SideMenu/SideMenu'
import MainContent from '../../components/MainContent/MainContent';

import withErrorHandling from '../../hoc/withErrorHandling/withErrorHandling'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { getApixuData }  from '../../services/apixuApi'

import Header from './../../components/MainContent/Header/Header'
import Map from './../../components/MainContent/Map/Map'
import SevenDaysForecast from './../../components/MainContent/SevenDayForecast/SevenDayForecast'
import WeatherDataInDetail from './../../components/MainContent/WeatherDataInDetail/WeatherDataInDetail'
import WeatherBitWidget from './../../components/MainContent/WeatherBitWidget/WeatherBitWidget'
import Slider from '../../components/MainContent/Slider/Slider'
import LoginRegisterData from '../../containers/LoginRegisterData/index'
import Spinner from '../../components/UI/Spinner/Spinner'
import classesm from '../../components/MainContent/MainContent.module.scss'
import axios from 'axios';
import {location, current, forecast} from '../../data/data'


class WeatherBuilder extends Component {
    state = {
        lastVisited:[
            {id:0, place:'Tetovo', place_name:'Tetovo, Macedonia', longitude:20.96667, latitude:42},
            {id:1, place:'Skopje', place_name:'Skopje, Macedonia', longitude:21.43333, latitude:41.98333}
        ],
        searchQuery: [
            
        ],
        longitudeLatitudeSelected: [21.43333,41.98333],
        locationStringFromInput: 'skopje',
        forecastData: null,
        searchInputSelected: false,
        loginDataSelected: false,
        lastSelectedDay: 0,
        location: location,
        current: current,
        forecast: forecast,
        isLoading: false
    }

    
    componentDidMount() {
        this.setState({isLoading: true})
        axios.get('http://api.apixu.com/v1/forecast.json?key=b5ad4f763c024eb4b14110152191005&q=' + `${this.state.longitudeLatitudeSelected[1]}`+','+`${this.state.longitudeLatitudeSelected[0]}` + '&days=7')
        .then(response => {
            
            this.setState({current: response.data.current,forecast: response.data.forecast, location: response.data.location, isLoading: false})
        })
        
    }

    
    componentDidUpdate(prevProps, prevState) {
        if(prevState.longitudeLatitudeSelected != this.state.longitudeLatitudeSelected) {
            axios.get('http://api.apixu.com/v1/forecast.json?key=b5ad4f763c024eb4b14110152191005&q=' + `${this.state.longitudeLatitudeSelected[1]}`+','+`${this.state.longitudeLatitudeSelected[0]}` + '&days=7')
            .then(response => {
                console.log(response.data)
                this.setState({current: response.data.current,forecast: response.data.forecast, location: response.data.location})
                
            }) 
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
            getApixuData(value)
                .then(response => {
                    let newSearchQuery=response.data.features.map(elem => {
                        return {id: elem.id, place: elem.text, place_name: elem.place_name, longitude: elem.center[0], latitude: elem.center[1]}
                    })
                this.setState({searchQuery: newSearchQuery, locationStringFromInput: value})
                }).catch(err => console.log( err))
        }
    }

    onRemoveSearchHandler = (historyProp) =>{
        historyProp.push('/')
        this.setState({searchQuery: [], searchInputSelected: false})
    }

    onSelectLocation = (long, lang, e, historyProp) => {
        console.log(historyProp)
        if (e.type == 'click'){
            historyProp.push('/')
           return this.setState({longitudeLatitudeSelected: [long, lang], searchInputSelected: false})
        }
        this.setState({longitudeLatitudeSelected: [long, lang]})
    }

    handleLoginLogOutClick = e => {
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
                                                                selectedDay = {this.state.lastSelectedDay} /> 
                                                        </div>
                                                        <WeatherBitWidget />
                                                </React.Fragment>
        let header =<React.Fragment >
                                <Header  current={this.state.current} 
                                        location={this.state.location} /> 
                            
                            </React.Fragment>
        let loginRegisterData = this.state.loginDataSelected   ? <LoginRegisterData /> : null
                                                                 

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
                  handleForecastLinksSelect={this.handleForecastLinksSelect}/>
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
                     <Route path="/" render={() => displayForecastData}/>
                   </Switch>
                   
                </main>
                
              </div>
            </Router>
        );
    }
}

export default withErrorHandling(WeatherBuilder, axios);
