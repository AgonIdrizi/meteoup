import React, { Component} from 'react';
import ReactMapGL, {Marker,FlyToInterpolator } from 'react-map-gl';
import classes from './Map.module.scss';
import Pin from '../../UI/Pin/Pin'

import {fromJS} from 'immutable'

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

class Map extends Component  {
    
    state = {
        viewport: {
         
         center: [this.props.longitudeLatitudeSelected[0], this.props.longitudeLatitudeSelected[1]],
         zoom: 8,
        },
        longitude: this.props.longitudeLatitudeSelected[0],
         latitude: this.props.longitudeLatitudeSelected[1],
        mapStyle: {
          version: 8,
              sources: {
                points: {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.45, 37.78]}}
                ]
            }
        }
        },
    layers: [
        {
            id: 'my-layer',
            type: 'circle',
            source: 'points',
            paint: {
                'circle-color': '#f00',
                'circle-radius': 4
            }
        }
    ]
        }
      };
      

      onViewportChange = viewport => { 
        const {width, height, ...etc} = viewport
        this.setState({viewport: etc})
      } 

      componentDidUpdate(prevProps) {
        console.log('componentdidUpdate')
        if(prevProps.value !== this.props.value) {
          this.setState({viewport:{
            longitude: this.props.longitudeLatitudeSelected[0],
            latitude: this.props.longitudeLatitudeSelected[1],
            center: [this.props.longitudeLatitudeSelected[0], this.props.longitudeLatitudeSelected[1]],
            zoom: 8
          }})
        }
      }

      onLocationSelectCenterMap = () => {
        return {longitude: this.props.longitudeLatitudeSelected[0], latitude: this.props.longitudeLatitudeSelected[1], zoom: 8 }
      }
      

      /*_updateViewport = viewport => {
        this.setState({viewport: {
          zoom: 8,
         center: [this.props.longitudeLatitudeSelected[0], this.props.longitudeLatitudeSelected[1]],
         longitude: this.props.longitudeLatitudeSelected[0],
         latitude: this.props.longitudeLatitudeSelected[1]
        }});
      };*/

    render(){

    
      let viewstate = this.onLocationSelectCenterMap();
      let markerDefault = (<Marker longitude={this.props.longitudeLatitudeSelected[0]} latitude={this.props.longitudeLatitudeSelected[1]}>
                      <Pin size={20}></Pin>
                    </Marker>)
      let displayMarkersOfSearch = this.props.data.map(elem => {
          return <Marker key={elem.id}  longitude={elem.longitude} latitude={elem.latitude}>
                  <Pin size={20}></Pin>
                </Marker>
      })
      return (
        <div  id='Map' className={classes.Map}>
            <ReactMapGL
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            {...this.state.mapStyle}
            width= '100%'
            height= '100%'
           
            {...viewstate}
            onClick={e => console.log(e.lngLat)}
            transitionDuration={2000}
            transitionInterpolator={new FlyToInterpolator(viewstate.longitude, viewstate.latitude)}
            >
              
              {displayMarkersOfSearch}
            </ReactMapGL>
        </div>
      );
    }
}

export default Map;
