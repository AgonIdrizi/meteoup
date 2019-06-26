import React from 'react';
import PropTypes from 'prop-types';
import classes from './OneDayForecast.module.scss';


const propTypes = {
    
};


const oneDayForecast = (props) => {

    
    
    return (
        <div style={props.style} onClick={e => props.clicked(e, props.id)} className={classes.OneDayForecast}>
           <div className='Date'>
              <div>
                  <span>Mon</span>
              </div>
              <div>
                  <span>6/24</span>
              </div>
           </div>
           <div className="Image">
               <div title="Showers">
                  <img alt="Showers, thunderstorms likely" src="https://www.meteoblue.com/website/images/picto/08_iday.svg" height="50px" />
               </div>
           </div>
           <div className="Degrees">
               <div className="DayTemp"> <span>27</span></div>
               <div className="NightTemp"><span>18</span></div>
           </div>
           <div className="WindRainSunInfo">
               <div className="Wind">
                   <span>..</span>
                   <span>15 km/h</span>
               </div>
               <div className="Rain">
                   <span>...</span>
                   <span>0-10 mm</span>
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
