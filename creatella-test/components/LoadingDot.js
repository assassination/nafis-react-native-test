import React, { Component } from 'react'
import { Text, StyleSheet, Animated } from 'react-native'
import PropTypes from 'prop-types'
import { Colors, Metrics, Images } from 'Config'

/*
* Loading animation showing a sequence of dot
* The dots appeared and disappeared, like it is moving from left to right
*/
export default class LoadingDot extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dot_opacities: this._initializeDots(),  // opacity values for each dot
      target_opacity: 1,      // desired end of fade animation
      should_animate: true,   // trigger start or end of animation
    }
  }

  componentDidMount() {
    this._animateDots.bind(this)(0)     // start fade animation on the first dot
  }

  componentWillUnmount() {
    this.state.should_animate = false   // stop the animation, when dot is removed from the screen
  }

  // initialize opacity number for each dot
  _initializeDots() {
    let opacities = []
    for (let i = 0; i < this.props.numberOfDots; i++) {
      let dot = new Animated.Value(this.props.minOpacity)
      opacities.push(dot)
    }
    return opacities
  }

  // manage a sequence of fading animation between dots
  _animateDots(which_dot) {
    if (!this.state.should_animate) return

    if (which_dot >= this.state.dot_opacities.length) {   // restart fade animation when we hit end of list
      which_dot = 0
      let min = this.props.minOpacity
      this.state.target_opacity = this.state.target_opacity == min ? 1 : min
    }

    Animated.timing(this.state.dot_opacities[which_dot], {  // start fade animation on subsequent dot
      toValue: this.state.target_opacity,
      duration: this.props.animationDelay,
    }).start(this._animateDots.bind(this, which_dot + 1))
  }

  render() {
    return (
      <Text style={[ styles.container, this.props.style ]}>
        { this.state.dot_opacities.map((o, i) =>
            <Animated.Text key={i} style={{ opacity: o }}> . </Animated.Text>
          )
        }
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    color: '#aaa',
    fontSize: 24,
    fontWeight: 'bold',
  }
})

LoadingDot.propTypes = {
  numberOfDots: PropTypes.number,   // number of dots displayed
  animationDelay: PropTypes.number, // duration time for each dot to appear on screen
  minOpacity: PropTypes.number,     // initial opacity for each dot
  style: PropTypes.oneOfType([ PropTypes.array, PropTypes.object, PropTypes.number ]),  // styles of dot
}

LoadingDot.defaultProps = {
  numberOfDots: 3,
  animationDelay: 250,
  minOpacity: 0,
}
