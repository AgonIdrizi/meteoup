import React, { Component } from 'react';
window.weatherbitWidgetParams = {
    key: 'a2e11962f9f14b819b90ca04b207ab97',
    autocomplete_container: 'city-form',
    forecast_1: 'forecast-1',
    forecast_2: 'forecast-2',
    forecast_3: 'forecast-3',
    cities_file: 'cities-tropical'
    };

class WeatherBitWidget extends Component  {
   
    componentDidMount(){
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = 'https://www.weatherbit.io/static/widgets/forecast-series-widget.min.js';
        document.body.appendChild(script)  
    }
     

    render(){
        
    return (
        <div>
        <form id="city-form" className="pure-form" style={{margin:'30px 0 40px'}} >
        <input id="weatherbit-city-forecast" autoFocus="" name="geo-lookup" placeholder="City,ST or lat,lon" style={{width:'100%', maxWidth: '600px', outline:0}} autoComplete="off" type="text">
            </input>
            <input id="weatherbit-get-data" type="button" value="Get Forecast"></input>
            <label htmlFor="weatherbit-show-metric">Use Metric Units</label>  
        </form>

        <div id="weatherbit-city-name-forecast"></div>
        <div id="forecast-1"></div>
        <div id="forecast-2"></div>
        <div id="forecast-3"></div>
        </div>
    );
    }
}

export default WeatherBitWidget;
