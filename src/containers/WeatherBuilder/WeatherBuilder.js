import React, { Component } from 'react';
import classes from './WeatherBuilder.module.scss';
import SideMenu from '../SideMenu/SideMenu'
import MainContent from '../../components/MainContent/MainContent';
class WeatherBuilder extends Component {
    state = {
        searchInputSelected: false
    }

    onSearchHandler = ()=>{
        console.log('here')
        this.setState({searchInputSelected: true})
    }

    onRemoveSearchHandler = () =>{
        this.setState({searchInputSelected: false})
    }
    
    render() {
        return (
            <div className={classes.WeatherBuilder}>
                <SideMenu 
                inputSelected={this.state.searchInputSelected}
                clicked={this.onSearchHandler}
                clickRemoveSearch={this.onRemoveSearchHandler} />
                <MainContent
                inputSelected={this.state.searchInputSelected}
                />
            </div>
        );
    }
}

export default WeatherBuilder;
