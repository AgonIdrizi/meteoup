
import React from 'react';
import classes from './Degrees.module.scss';
import colorTemp from 'color-temperature';

function chooseTempColor(celsius){
    
        if (celsius > -6.6 && celsius < -3.8) {
            return '#60abe7';
            
        }
        if (celsius >= -1.1 && celsius < -1.6) {
            return '#36780b';
            
        }

        if (celsius >= 1.6 && celsius < 4.4) {
            return '#48a132';
            
        }

        if (celsius >= 4.4 && celsius < 7.2) {
            return '#5ec91b';
            
        }
        if (celsius >= 7.2 && celsius < 10) {
            return '#67e663';
            
        }
        if (celsius >= 10 && celsius < 12.7) {
            return '#83ea8b';
            
        }
        if (celsius >= 12.7 && celsius < 15.5) {
            return '#b0f0b4';
            
        }
        if (celsius >= 15.5 && celsius < 18.3) {
            return '#f7eb72';
            
        }
        if (celsius >= 18.3 && celsius < 21.1) {
            return '#f7eb72';
            
        }
        if (celsius >= 21.1 && celsius < 23.8) {
            return '#f5dd5a';
            
        }
        if (celsius >= 23.8 && celsius < 26.6) {
            return '#f7b53a';
            
        }
        if (celsius >= 26.6 && celsius < 29.4) {
            return '#f08d37';
            
        }
        if (celsius >= 29.4 && celsius < 32.2) {
            return '#dc5330';
            
        }
        if (celsius >= 32.2 && celsius < 35) {
            return '#b42b26';
            
        }
        if (celsius >= 35 && celsius < 37.7) {
            return '#8c201b';
            
        }
        if (celsius >= 37.7 && celsius < 40.5) {
            return '#f13e3d';
            
        }
        if (celsius >= 40.5 && celsius < 43.3) {
            return '#fac8dc';
            
        }
        if (celsius >= 43.3 && celsius < 110) {
            return '#fdf0f0';
            
        }
        
        
        

        
    
}

const degrees = (props) => {
    
  
    
    const style= {width:'100%', backgroundColor: chooseTempColor(props.degree)}
    return (
        <div style={{width: '100%'}} className={classes.Degrees}>
          <div style={style} className={classes.DayTemp}> <span>{`${props.degree} °C`}</span></div>
        </div>
    );
}

export default degrees;
