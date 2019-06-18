import React from 'react';
import classes from './CloseSpan.module.scss';

const closeSpan = (props) => {
    return(
        <div className={classes.CloseSpan}>
            <a href="#"><span onClick={props.clickedX}>X</span></a>
        </div>
    )
}

export default closeSpan