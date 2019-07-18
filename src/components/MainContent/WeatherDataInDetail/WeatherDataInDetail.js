import React, { Component } from 'react';
import classes from './WeatherDataInDetail.module.scss'
import PropTypes from 'prop-types';


const propTypes = {
    
};


class WeatherDataInDetail extends Component  {
    

    
    render() {
    return (
        <div className={classes.WeatherDataInDetail}>
            <div>Selected Day</div>
            <div>3-00</div>
            <div>6-00</div>
            <div>9-00</div>
            <div>12-00</div>
            <div>15-00</div>
            <div>18-00</div>
            <div>21-00</div>
            <div>24-00</div>
            <div className={classes.Images}></div>
            <div>image</div>
            <div>image</div>
            <div>image</div>
            <div>image</div>
            <div>image</div>
            <div>image</div>
            <div>image</div>
            <div>image</div>
            <div>Temperature</div>
            <div>19</div>
            <div>19</div>
            <div>19</div>
            <div>19</div>
            <div>19</div>
            <div>19</div>
            <div>19</div>
            <div>19</div>
            <div>Felt Temperature</div>
            <div>13</div>
            <div>13</div>
            <div>13</div>
            <div>13</div>
            <div>13</div>
            <div>13</div>
            <div>13</div>
            <div>13</div>
            <div className={classes.windDirection}>Wind direction</div>
            <div>WNW</div>
            <div>WNW</div>
            <div>WNW</div>
            <div>WNW</div>
            <div>WNW</div>
            <div>WNW</div>
            <div>WNW</div>
            <div>WNW</div>
            <div className={classes.WindSpeed}>Wind speed</div>
            <div>6.4</div>
            <div>6.4</div>
            <div>6.4</div>
            <div>6.4</div>
            <div>6.4</div>
            <div>6.4</div>
            <div>6.4</div>
            <div>6.4</div>
            <div className={classes.Precipitation}>Precipitation probability</div>
            <div>1%</div>
            <div>1%</div>
            <div>1%</div>
            <div>1%</div>
            <div>1%</div>
            <div>1%</div>
            <div>1%</div>
            <div>1%</div>
            {this.props.day}
        </div>
    );
    }   
};


WeatherDataInDetail.propTypes = propTypes;


export default WeatherDataInDetail;
