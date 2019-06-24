import React from 'react';
import classes from './Location.module.scss';



const propTypes = {
    
};


const location = (props) => {
    return (
        <div  className={classes.Location} 
              onMouseOver={e => props.onSelectLocation(props.longitude, props.latitude,e)}
              //here we close the opening sidemenu and update selectedLocation
              onClick={e => props.onSelectLocation(props.longitude, props.latitude,e)} >
            <div className={classes.LocationImageInfo}>
                <img src='https://www.meteoblue.com/website/images/flags/mk.svg' style={{height: '15px', width: '15px'}} />
                <p >{props.place}</p>
               
              <span>1314m, {props.longitude} N {props.latitude}</span>
              
            </div>
            <div >
                <a >
                  <span >-></span>
                </a>
            </div>
            
        </div>
    );
};





export default location;

