import React, { Component } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import WeatherDataInDetail from "../WeatherDataInDetail/WeatherDataInDetail";
import classes from "./Slider.module.scss";

class Slider extends Component {
  state = {
    currentIndex: this.props.selectedDay,
    galleryItems: [0, 1, 2, 3, 4, 5, 6].map(i => (
      <div className={classes.Slider} key={i}>
        <WeatherDataInDetail
          dayId={i}
          hourlyForecastData={this.props.hourlyForecastData[i]}
        />
      </div>
    ))
  };

  componentWillUnmount() {
    console.log("slider component did unmount");
  }

  onSlideChanged = e => {
    this.props.changeSlide(e.item);
  };

  render() {
    const { currentIndex, galleryItems } = this.state;
    return (
      <AliceCarousel
        items={this.state.galleryItems}
        autoPlayInterval={2000}
        autoPlay={false}
        fadeOutAnimation={false}
        mouseDragEnabled={true}
        onSlideChanged={this.onSlideChanged}
        buttonsDisabled={true}
        dotsDisabled={true}
        slideToIndex={this.props.selectedDay}
      />
    );
  }
}

export default Slider;
