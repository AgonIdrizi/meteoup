import React from 'react'
import classes from './Image.module.scss'

import PropTypes from 'prop-types';


const propTypes = {
    
};


const image = (props) => {
    return (
        <div style={{backgroundColor:'#cadbea'}}  className={classes.Image}>
            <div title={props.condition.text}>
                <img alt={props.condition.text} src={props.condition.icon} height="50px" />
            </div>
        </div>
    );
};


image.propTypes = propTypes;


export default image;
