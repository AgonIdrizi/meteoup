import React, { Component} from 'react';
import ReactMapGL from 'react-map-gl';
import classes from './Map.module.scss';

class Map extends Component  {
    
    state = {
        viewport: {
          latitude: 41.98333,
          longitude: 21.43333,
          zoom: 8
        }
      };

      onViewportChange = viewport => { 
        const {width, height, ...etc} = viewport
        this.setState({viewport: etc})
      } 

    render(){
        const { 
            viewport,
          } = this.state
      return (
        <div className={classes.Map}>
            
            <ReactMapGL
            width='100%'
            height='100%'
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            {...viewport}
             onViewportChange={(viewport) => this.onViewportChange({viewport})}
      />
        </div>
      );
    }
}

export default Map;
