import React, { Component} from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import classes from './Map.module.scss';

import Pin from '../../UI/Pin/Pin'

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

class Map extends Component  {
    
    state = {
        viewport: {
         zoom: 8
        },
        mapStyle: {
          version: 8,
          
        }
        
      };
      

      onViewportChange = viewport => { 
        const {width, height, ...etc} = viewport
        this.setState({viewport: etc})
      } 

    render(){
      
      let markers = (<Marker longitude={21.43333} latitude={41.98333}>
                      <Pin size={20}></Pin>
                    </Marker>)
      let displayMarkersOfSearch = this.props.data.map(elem => {
          return <Marker longitude={elem.longitude} latitude={elem.latitude}>
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
            latitude={41.98333}
            longitude={21.43333}
            {...this.state.viewport}
            onViewportChange={(viewport) => this.setState({viewport})}
            >
              
              {displayMarkersOfSearch}
            </ReactMapGL>
        </div>
      );
    }
}

export default Map;
