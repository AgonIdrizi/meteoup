import React from 'react';
import { Button } from 'antd'
import {withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub} from '@fortawesome/free-brands-svg-icons'

import classes from './Footer.module.scss';

const footer = (props) =>{
    const handleButtonClick = () =>{
      window.scrollTo(0,0)
      props.history.push('/contact')
    }
  return (
        <>
        <div className={classes.FooterTop}>
          <h4>Questions or comments?</h4>
          <Button onClick={handleButtonClick} ghost>Contact us</Button>
        </div>
        <div className={classes.FooterBody}>
          <h3>MeteoUp gives you real-time weather data</h3>
          <div className={classes.FooterInfo}>
            <div className={classes.divContent}>
              <h2>Weather Data</h2>
              <a href="https://openweather.com" target="_blank">Open Weather</a>
              <a href="https://apixu.com" target="_blank">Apixu</a>
            </div>
            <div className={classes.divContent}>
              <h2>Maps</h2>
              <a href="https://openstreetmap.com" target="_blank">Open Street Map</a>
              <a href="https://mapbox.com" target="_blank">Mapbox</a>
              <a href="https://leaflet.js" target="_blank">Leaflet</a>
            </div>
            
          </div>
          Copyright: <FontAwesomeIcon icon={faGithub} /><a href="https://github.com/agonidrizi" target="_blank"> Agon Idrizi</a>
        </div>
        </>
    )
}

export default withRouter(footer);