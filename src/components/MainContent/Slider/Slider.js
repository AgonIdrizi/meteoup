import React, { Component } from 'react'
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import WeatherDataInDetail from '../WeatherDataInDetail/WeatherDataInDetail'

class Slider extends Component {
  state= {
      
      galleryItems: [0,1,2,3,4,5,6].map((i) => (<div key={i}><WeatherDataInDetail /></div>)),
  }
  onSlideChange(e) {
   // console.log('Item`s position during a change: ', e.item)
   // console.log('Slide`s position during a change: ', e.slide)
  }
 
  onSlideChanged(e) {
      this.props.changeSlide()
    console.log('Item`s position after changes: ', e.item)
    console.log('Slide`s position after changes: ', e.slide)
  }

  render(){
      return (
          <AliceCarousel 
            items={this.state.galleryItems}
            autoPlayInterval={2000}
            autoPlay={false}
            fadeOutAnimation={true}
            mouseDragEnabled={true}
            onSlideChange={this.onSlideChange}
            onSlideChanged={this.props.changeSlide()}
            buttonsDisabled={true}
            dotsDisabled={true}
           

          />
      )
  }
}

export default Slider