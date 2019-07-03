import React, { Component } from 'react';
import classes from './WeatherBuilder.module.scss';
import SideMenu from '../SideMenu/SideMenu'
import MainContent from '../../components/MainContent/MainContent';
import axios from 'axios'
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
        searchInputSelected: false
    }

    onOpenMenuHandler = () =>{
        this.setState({searchInputSelected: true})
    }
    onSearchHandler = (value)=>{
        if(value != ''){
            axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/"+value+".json?access_token=" + process.env.REACT_APP_MAPBOX_TOKEN + "&autocomplete=true")
                    .then(response => {
                        
                        let newSearchQuery=response.data.features.map(elem => {
                            return {id: elem.id, place: elem.text, place_name: elem.place_name, longitude: elem.center[0], latitude: elem.center[1]}
                        })
                        this.setState({searchQuery: newSearchQuery, locationStringFromInput: value})
                    })
        }
    }

    



    onRemoveSearchHandler = () =>{
        this.setState({searchQuery: [], searchInputSelected: false})
    }

    onSelectLocation = (long, lang, e) => {
        
        if (e.type == 'click'){
           return this.setState({longitudeLatitudeSelected: [long, lang], searchInputSelected: false})
        }
        this.setState({longitudeLatitudeSelected: [long, lang]})
    }

    
    
    render() {
        return (
            <div className={classes.WeatherBuilder}>
                <SideMenu 
                inputSelected={this.state.searchInputSelected}
                searchHandler={this.onSearchHandler}
                clicked={this.onOpenMenuHandler}
                clickRemoveSearch={this.onRemoveSearchHandler}
                lastVisited={this.state.lastVisited}
                searchQuery={this.state.searchQuery}
                SelectLocation={this.onSelectLocation} />
                <MainContent
                inputSelected={this.state.searchInputSelected}
                searchQuery={this.state.searchQuery}
                longitudeLatitudeSelected={this.state.longitudeLatitudeSelected}
                locationStringFromInput={this.state.locationStringFromInput}
                />
            </div>
        );
    }
}

export default WeatherBuilder;
