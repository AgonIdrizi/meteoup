import React from 'react'
import classes from "./Header.module.scss";


const header = (props) => {
    return(
     <React.Fragment>
      <header className={classes.mainHeader}>
        <div className={classes.headerInfo}>
            <div>
                <h1 >Weather in Tetovo</h1>
                <span>"Tetovo, North Macedonia
                    <span>42.010 N 20.089 E,</span>
                    <span>466 m asl</span>
                </span>
            </div>
             <div className={classes.headerImage}>
                <div title="Showers, thunderstorms">
                    <img alt="Showers, thunderstorms" src="https://www.meteoblue.com/website/images/picto/07_iday.svg" style={{height: '54px'}}/>
                </div>
                <span>26 C</span>
            </div>
        </div>
      </header>
      </React.Fragment>
    )
}

export default header
