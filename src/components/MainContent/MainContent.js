import React, { Component } from 'react';
import Header from './Header/Header'
import Map from './Map/Map'
import classes from './MainContent.module.scss'

class MainContent extends Component {
    render() {
        const style = this.props.inputSelected ? {marginLeft: '400px'} : {marginLeft:'200px'}
        let display = this.props.inputSelected ? <Map /> :
                                                <React.Fragment >
                                                    <Header />
                                                    <section>7 day forecast</section>
                                                    <section>selected day forecast</section>
                                                </React.Fragment>
        return (
            <main style={style}  className={classes.MainContent}>
               {display}
            </main>
        );
    }
}

export default MainContent;
