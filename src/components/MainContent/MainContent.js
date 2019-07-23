import React, { Component } from 'react';
import Header from './Header/Header'
import Map from './Map/Map'
import SevenDaysForecast from './SevenDayForecast/SevenDayForecast'
import WeatherDataInDetail from './WeatherDataInDetail/WeatherDataInDetail'
import WeatherBitWidget from './WeatherBitWidget/WeatherBitWidget'
import Slider from './Slider/Slider'
import LoginRegisterData from '../../containers/LoginRegisterData/LoginRegisterData'
import classes from './MainContent.module.scss'
import axios from 'axios';

class MainContent extends Component {
    state = {
        lastSelectedDay: 0,
        location: {
            "name": "Tetovo",
            "region": "Tetovo",
            "country": "Macedonia",
            "lat": 42.01,
            "lon": 20.97,
            "tz_id": "Europe/Skopje",
            "localtime_epoch": 1561553535,
            "localtime": "2019-06-26 14:52"
        },
        current: {
            "last_updated_epoch": 1561553109,
            "last_updated": "2019-06-26 14:45",
            "temp_c": 31.0,
            "temp_f": 87.8,
            "is_day": 1,
            "condition": {
                "text": "Partly cloudy",
                "icon": "//cdn.apixu.com/weather/64x64/day/116.png",
                "code": 1003
            },
            "wind_mph": 9.4,
            "wind_kph": 15.1,
            "wind_degree": 40,
            "wind_dir": "NE",
            "pressure_mb": 1021.0,
            "pressure_in": 30.6,
            "precip_mm": 0.9,
            "precip_in": 0.04,
            "humidity": 38,
            "cloud": 50,
            "feelslike_c": 31.1,
            "feelslike_f": 88.1,
            "vis_km": 10.0,
            "vis_miles": 6.0,
            "uv": 8.0,
            "gust_mph": 10.5,
            "gust_kph": 16.9
        },
        forecast: {
            "forecastday": [
                {
                    "date": "2019-06-26",
                    "date_epoch": 1561507200,
                    "day": {
                        "maxtemp_c": 24.4,
                        "maxtemp_f": 75.9,
                        "mintemp_c": 14.3,
                        "mintemp_f": 57.7,
                        "avgtemp_c": 20.8,
                        "avgtemp_f": 69.4,
                        "maxwind_mph": 8.1,
                        "maxwind_kph": 13.0,
                        "totalprecip_mm": 8.5,
                        "totalprecip_in": 0.33,
                        "avgvis_km": 9.5,
                        "avgvis_miles": 5.0,
                        "avghumidity": 81.0,
                        "condition": {
                            "text": "Patchy rain possible",
                            "icon": "//cdn.apixu.com/weather/64x64/day/176.png",
                            "code": 1063
                        },
                        "uv": 8.8
                    },
                    "astro": {
                        "sunrise": "05:02 AM",
                        "sunset": "08:16 PM",
                        "moonrise": "01:11 AM",
                        "moonset": "01:34 PM"
                    }
                },
                {
                    "date": "2019-06-27",
                    "date_epoch": 1561593600,
                    "day": {
                        "maxtemp_c": 27.1,
                        "maxtemp_f": 80.8,
                        "mintemp_c": 8.4,
                        "mintemp_f": 47.1,
                        "avgtemp_c": 20.8,
                        "avgtemp_f": 69.5,
                        "maxwind_mph": 4.9,
                        "maxwind_kph": 7.9,
                        "totalprecip_mm": 0.0,
                        "totalprecip_in": 0.0,
                        "avgvis_km": 10.0,
                        "avgvis_miles": 6.0,
                        "avghumidity": 73.0,
                        "condition": {
                            "text": "Partly cloudy",
                            "icon": "//cdn.apixu.com/weather/64x64/day/116.png",
                            "code": 1003
                        },
                        "uv": 9.4
                    },
                    "astro": {
                        "sunrise": "05:02 AM",
                        "sunset": "08:16 PM",
                        "moonrise": "01:36 AM",
                        "moonset": "02:34 PM"
                    }
                },
                {
                    "date": "2019-06-28",
                    "date_epoch": 1561680000,
                    "day": {
                        "maxtemp_c": 25.7,
                        "maxtemp_f": 78.3,
                        "mintemp_c": 10.4,
                        "mintemp_f": 50.7,
                        "avgtemp_c": 19.0,
                        "avgtemp_f": 66.1,
                        "maxwind_mph": 5.4,
                        "maxwind_kph": 8.6,
                        "totalprecip_mm": 0.0,
                        "totalprecip_in": 0.0,
                        "avgvis_km": 10.0,
                        "avgvis_miles": 6.0,
                        "avghumidity": 70.0,
                        "condition": {
                            "text": "Partly cloudy",
                            "icon": "//cdn.apixu.com/weather/64x64/day/116.png",
                            "code": 1003
                        },
                        "uv": 9.3
                    },
                    "astro": {
                        "sunrise": "05:03 AM",
                        "sunset": "08:16 PM",
                        "moonrise": "02:02 AM",
                        "moonset": "03:38 PM"
                    }
                },
                {
                    "date": "2019-06-29",
                    "date_epoch": 1561766400,
                    "day": {
                        "maxtemp_c": 22.3,
                        "maxtemp_f": 72.1,
                        "mintemp_c": 3.8,
                        "mintemp_f": 38.8,
                        "avgtemp_c": 14.4,
                        "avgtemp_f": 58.0,
                        "maxwind_mph": 5.1,
                        "maxwind_kph": 8.3,
                        "totalprecip_mm": 0.2,
                        "totalprecip_in": 0.01,
                        "avgvis_km": 10.0,
                        "avgvis_miles": 6.0,
                        "avghumidity": 72.0,
                        "condition": {
                            "text": "Patchy rain possible",
                            "icon": "//cdn.apixu.com/weather/64x64/day/176.png",
                            "code": 1063
                        },
                        "uv": 9.0
                    },
                    "astro": {
                        "sunrise": "05:03 AM",
                        "sunset": "08:16 PM",
                        "moonrise": "02:31 AM",
                        "moonset": "04:43 PM"
                    }
                },
                {
                    "date": "2019-06-30",
                    "date_epoch": 1561852800,
                    "day": {
                        "maxtemp_c": 21.5,
                        "maxtemp_f": 70.7,
                        "mintemp_c": 7.7,
                        "mintemp_f": 45.9,
                        "avgtemp_c": 16.4,
                        "avgtemp_f": 61.5,
                        "maxwind_mph": 4.9,
                        "maxwind_kph": 7.9,
                        "totalprecip_mm": 0.0,
                        "totalprecip_in": 0.0,
                        "avgvis_km": 10.0,
                        "avgvis_miles": 6.0,
                        "avghumidity": 70.0,
                        "condition": {
                            "text": "Partly cloudy",
                            "icon": "//cdn.apixu.com/weather/64x64/day/116.png",
                            "code": 1003
                        },
                        "uv": 9.2
                    },
                    "astro": {
                        "sunrise": "05:04 AM",
                        "sunset": "08:16 PM",
                        "moonrise": "03:06 AM",
                        "moonset": "05:51 PM"
                    }
                },
                {
                    "date": "2019-07-01",
                    "date_epoch": 1561939200,
                    "day": {
                        "maxtemp_c": 23.8,
                        "maxtemp_f": 74.8,
                        "mintemp_c": 4.7,
                        "mintemp_f": 40.5,
                        "avgtemp_c": 14.8,
                        "avgtemp_f": 58.7,
                        "maxwind_mph": 4.3,
                        "maxwind_kph": 6.8,
                        "totalprecip_mm": 0.0,
                        "totalprecip_in": 0.0,
                        "avgvis_km": 10.0,
                        "avgvis_miles": 6.0,
                        "avghumidity": 71.0,
                        "condition": {
                            "text": "Partly cloudy",
                            "icon": "//cdn.apixu.com/weather/64x64/day/116.png",
                            "code": 1003
                        },
                        "uv": 4.0
                    },
                    "astro": {
                        "sunrise": "05:04 AM",
                        "sunset": "08:15 PM",
                        "moonrise": "03:47 AM",
                        "moonset": "06:58 PM"
                    }
                },
                {
                    "date": "2019-07-02",
                    "date_epoch": 1562025600,
                    "day": {
                        "maxtemp_c": 28.3,
                        "maxtemp_f": 82.9,
                        "mintemp_c": 8.9,
                        "mintemp_f": 48.0,
                        "avgtemp_c": 19.3,
                        "avgtemp_f": 66.7,
                        "maxwind_mph": 4.3,
                        "maxwind_kph": 6.8,
                        "totalprecip_mm": 0.7,
                        "totalprecip_in": 0.03,
                        "avgvis_km": 10.0,
                        "avgvis_miles": 6.0,
                        "avghumidity": 63.0,
                        "condition": {
                            "text": "Patchy rain possible",
                            "icon": "//cdn.apixu.com/weather/64x64/day/176.png",
                            "code": 1063
                        },
                        "uv": 4.0
                    },
                    "astro": {
                        "sunrise": "05:05 AM",
                        "sunset": "08:15 PM",
                        "moonrise": "04:35 AM",
                        "moonset": "08:03 PM"
                    }
                }
            ]
        },
        isLoading: false,
        loginDataSelected: false
    }

    componentDidMount() {
        this.setState({isLoading: true})
        axios.get('http://api.apixu.com/v1/forecast.json?key=b5ad4f763c024eb4b14110152191005&q=' + `${this.props.longitudeLatitudeSelected[1]}`+','+`${this.props.longitudeLatitudeSelected[0]}` + '&days=7')
        .then(response => {
            
            this.setState({current: response.data.current,forecast: response.data.forecast, location: response.data.location})
            this.setState({isLoading: false})
        })
        
        console.log('componentDidMount')
    }

    componentWillReceiveProps(prevProps, nextProps) {
        if (this.props.longitudeLatitudeSelected != prevProps.longitudeLatitudeSelected) {
            axios.get('http://api.apixu.com/v1/forecast.json?key=b5ad4f763c024eb4b14110152191005&q=' + `${this.props.longitudeLatitudeSelected[1]}`+','+`${this.props.longitudeLatitudeSelected[0]}` + '&days=7')
            .then(response => {
                console.log(response.data)
                
                this.setState({current: response.data.current,forecast: response.data.forecast, location: response.data.location})
                
            })
           console.log('componentwillReceiveProps')
        }
      }

    componentDidUpdate(prevProps, prevState) {
        console.log('componentDidUpdate')
      }


    clickOneDayForecastHandler = (e, id) => {
        e.preventDefault()
        this.setState({lastSelectedDay: id})
        console.log(e.currentTarget)
        
    }

    changeSlideHandler = (index) => {
      this.setState({lastSelectedDay: index})
    }

    
    render() {
        const style = this.props.inputSelected ? {marginLeft: '400px'} : {marginLeft:'200px'}
        
        let loadingData = this.state.isLoading ? <p>Loading data</p> :  <React.Fragment >
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
        let forecastData =<React.Fragment >
                                <Header  current={this.state.current} 
                                        location={this.state.location} /> 
                            
                            </React.Fragment>
        let loginRegisterData = this.props.loginDataSelected ? <LoginRegisterData /> : null

        let display = this.props.inputSelected ? <Map 
                                                data={this.props.searchQuery}
                                                longitudeLatitudeSelected={this.props.longitudeLatitudeSelected} /> :
                                                <React.Fragment>
                                                  {forecastData}
                                                  {loadingData}
                                                </React.Fragment>
        return (
            <main style={style}  className={classes.MainContent}>
               {loginRegisterData}
               {display}
            </main>
        );
    }
}

export default MainContent;
