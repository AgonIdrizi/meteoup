import React, { Component } from 'react';
import classes from './MainContent.module.scss'

class MainContent extends Component {
    render() {
        return (
            <main className={classes.MainContent}>
                <header>Header</header>
                <section>7 day forecast</section>
                <section>selected day forecast</section>
            </main>
        );
    }
}

export default MainContent;
