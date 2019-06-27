import React from 'react'
import classes from "./Header.module.scss";
import moment from 'moment'

const header = (props) => {
    return(
     <React.Fragment>
      <header className={classes.mainHeader}>
        <div className={classes.headerInfo}>
            <div>
                <h1 >Weather in {props.location.region} </h1>
                <span>{`${props.location.region}, ${props.location.country}, `}
                    <span >{`${props.location.lat} N ${props.location.lon} E`}</span>
                </span>
            </div>
             <div className={classes.headerImage}>
                <div title={props.current.condition.text}>
                    <img alt={props.current.condition.text} src={props.current.condition.icon} style={{height: '54px'}}/>
                    <span>{`${props.current.temp_c} °C`}</span>
                </div>
                <div>
                    <span>Last Updated {moment(props.current.last_updated).fromNow()}</span>
                </div>
                
            </div>
        </div>
      </header>
      </React.Fragment>
    )
}

export default header
