import React, { Component } from 'react';
import Header from './Header/Header'
import classes from './MainContent.module.scss'

class MainContent extends Component {
    render() {
        const style = this.props.inputSelected ? {marginLeft: '400px'} : {marginLeft:'200px'}
        return (
            <main style={style}  className={classes.MainContent}>
                <Header />
                <section>7 day forecast</section>
                <section>selected day forecast</section>
            </main>
        );
    }
}

export default MainContent;
