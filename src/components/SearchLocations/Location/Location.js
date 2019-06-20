import React from 'react';
import classes from './Location.module.scss';



const propTypes = {
    
};


const location = (props) => {
    return (
        <div className={classes.Location}>
            <div className={classes.LocationImageInfo}>
                <img src='https://www.meteoblue.com/website/images/flags/mk.svg' style={{height: '15px', width: '15px'}} />
                <p >{props.place}</p>
               
              <span>1314m, {props.longitude} N {props.latitude}</span>
              
            </div>
            <div>
                <span>-></span>
            </div>
            
        </div>
    );
};





export default location;

