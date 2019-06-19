import React from 'react';
import classes from './Location.module.scss';



const propTypes = {
    
};


const location = () => {
    return (
        <div className={classes.Location}>
            <div className={classes.LocationImageInfo}>
                <img src='https://www.meteoblue.com/website/images/flags/mk.svg' style={{height: '15px', width: '15px'}} />
                <p >Tetovo</p>
               
              <span>1314m, 42,132 N 20. 842</span>
              
            </div>
            <div>
                <span>-></span>
            </div>
            
        </div>
    );
};





export default location;

