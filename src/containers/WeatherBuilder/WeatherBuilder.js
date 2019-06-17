import React, { Component } from 'react';
import classes from './WeatherBuilder.module.scss';
import SideMenu from '../../components/SideMenu/SideMenu'
import MainContent from '../../components/MainContent/MainContent';
class WeatherBuilder extends Component {
    render() {
        return (
            <div className={classes.WeatherBuilder}>
                <SideMenu />
                <MainContent />
            </div>
        );
    }
}

export default WeatherBuilder;
