
import React from 'react';
import clasees from './Degrees.module.scss'
import classes from './Degrees.module.scss';
const degrees = (props) => {
    const dayStyle= {width:'100%', backgroundColor: 'rgb(252, 172, 5)'}
    const nightStyle = {width: '100%', backgroundColor: 'rgb(216, 247, 161)'}
    return (
        <div style={{width: '100%'}} className={classes.Degrees}>
            <div style={dayStyle} className={classes.DayTemp}> <span>{`${props.tempInfo.maxtemp_c} °C`}</span></div>
            <div style={nightStyle} className="NightTemp"><span>{`${props.tempInfo.mintemp_c} °C`}</span></div>
        </div>
    );
}

export default degrees;
