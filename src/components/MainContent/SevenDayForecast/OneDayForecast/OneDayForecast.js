import React from 'react';
import Image from './Image/Image'
import Degrees from './Degrees/Degrees'
import PropTypes from 'prop-types';
import moment from 'moment'
import classes from './OneDayForecast.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faWind, faCloudRain } from '@fortawesome/free-solid-svg-icons'

const propTypes = {
    
};


const oneDayForecast = (props) => {

    return (
        <div style={props.style} onClick={e => props.clicked(e, props.id)} className={classes.OneDayForecast}>
           <div className='Date'>
              <div>
                  <span>{moment(props.data.date).format('ddd')}</span>
              </div>
              <div>
                  <span>{moment(props.data.date).format('M/D')}</span>
              </div>
           </div>
           <Image condition={props.data.day.condition} />
           <Degrees tempInfo={props.data.day} />
           <div className="WindRainSunInfo">
               <div className="Wind">
                   <span><FontAwesomeIcon  icon={faWind} /></span>
                   <span>{props.data.day.maxwind_kph} km/h</span>
               </div>
               <div className="Rain">
                   <span><FontAwesomeIcon style={{color: '#036f90'}} icon={faCloudRain} /></span>
                   <span>{props.data.day.totalprecip_mm} mm</span>
               </div>
               <div>
                   <span>..</span>
                   <span>3 h</span>
               </div>
           </div>
           <div className="Info-color"></div>
        </div>
    );
};


oneDayForecast.propTypes = propTypes;


export default oneDayForecast;
