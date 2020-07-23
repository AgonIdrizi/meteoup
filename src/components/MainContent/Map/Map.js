import React, { Component } from "react";
import ReactMapGL, { Marker, FlyToInterpolator } from "react-map-gl";
import classes from "./Map.module.scss";
import Pin from "../../UI/Pin/Pin";

class Map extends Component {
  state = {
    viewport: {
      longitude: 21.43333,
      latitude: 42,
      center: [
        this.props.longitudeLatitudeSelected[0],
        this.props.longitudeLatitudeSelected[1]
      ],
      zoom: 8
    },
    longitude: this.props.longitudeLatitudeSelected[0],
    latitude: this.props.longitudeLatitudeSelected[1],
    mapStyle: {
      style: "mapbox://styles/mapbox/streets-v9",
      version: 9,
      sources: {
        points: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: { type: "Point", coordinates: [21.43333, 41.98333] }
              }
            ]
          }
        }
      },
      layers: [
        {
          id: "my-layer",
          type: "circle",
          source: "points",
          paint: {
            "circle-color": "#f00",
            "circle-radius": 4
          }
        }
      ]
    },
    selectedLocation:
      this.props.longitudeLatitudeSelected.length > 0 ? true : false
  };

  onViewportChange = viewport => {
    const { width, height, ...etc } = viewport;
    this.setState({ viewport: etc, selectedLocation: false });
  };

  onLocationSelectCenterMap = viewport => {
    return {
      longitude: this.props.longitudeLatitudeSelected[0],
      latitude: this.props.longitudeLatitudeSelected[1],
      zoom: 8
    };
  };

  render() {
    console.log("maps rendered");
    let viewstate = this.onLocationSelectCenterMap();
    let viewport = this.state.viewport;

    let displayMarkersOfSearch = this.props.data.map(elem => {
      return (
        <Marker
          key={elem.id}
          longitude={elem.longitude}
          latitude={elem.latitude}
        >
          <Pin size={20}></Pin>
        </Marker>
      );
    });
    return (
      <div id="Map" className={classes.Map}>
        <ReactMapGL
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          width="100%"
          height="100%"
          longitude={this.props.longitudeLatitudeSelected[0]}
          latitude={this.props.longitudeLatitudeSelected[1]}
          {...viewport}
          {...viewstate}
          transitionDuration={100}
          transitionInterpolator={
            new FlyToInterpolator(viewstate.longitude, viewstate.latitude)
          }
        >
          {displayMarkersOfSearch}
        </ReactMapGL>
      </div>
    );
  }
}

export default Map;
