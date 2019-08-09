import React, { Component} from 'react';

import L  from 'leaflet';
import 'leaflet/dist/leaflet.css'



export default class LeafletMap extends Component {
  state = {
    lat: this.props.longitudeLatitudeSelected[0],
    lng: this.props.longitudeLatitudeSelected[1],
    zoom: 13
  }

  componentDidMount() {
    this.map = L.map('map', {
      center: [this.props.longitudeLatitudeSelected[1], this.props.longitudeLatitudeSelected[0]],
      zoom: 5,
      zoomControl: false
    });

    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      detectRetina: true,
      maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxNativeZoom: 17,
    }).addTo(this.map)

    L.tileLayer(`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=a09d1c56233d10c3e4db1dd590968ea6`, {
      detectRetina: true,
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.openweathermap.org/copyright">OpenStreetMap</a> contributors',
      maxNativeZoom: 17,
    }).addTo(this.map)
    
  }

  render() {
    const position = [this.props.longitudeLatitudeSelected[0], this.props.longitudeLatitudeSelected[1]]
    return (
      <div id="map" style={{width: '70vw', height: '70vh', marginLeft: '8%'}} className="OpenWeatherMap">
      
      </div>
    )
  }
}
