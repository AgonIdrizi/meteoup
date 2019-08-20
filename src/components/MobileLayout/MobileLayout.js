import React from 'react';
import Header from '../MainContent/Header/Header'
import Footer from '../MainContent/Footer/Footer'
import classes from './MobileLayout.module.scss';

const mobileLayout = (props) => {
    return (
        <div className={classes.MobileLayout}>
            <Header current={props.current} location={props.location} />
            <Footer />
        </div>

    )
}

export default mobileLayout