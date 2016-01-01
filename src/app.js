import React, { Component } from 'react'
import AxisPad from './components/axis-pad'
import throttle from './utils/throttle'
import './app.scss'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      isDragging: false,
      mousePos: {
        x: 0,
        y: 0,
        motorValues: [ 0, 0 ]
      }
    }
  }

  startDragging () {
    this.setState({ isDragging: true })
  }

  stopDragging () {
    this.setState({ isDragging: false })
  }

  onMouseMove (e) {
    this.setState({
      mousePos: {
        x: e.pageX,
        y: e.pageY
      }
    })
  }

  onMotorsChange = throttle(function(values) {
    this.setState({
      motorValues: values
    })
  }, 100, this)


  render () {
    const events = {
      onMouseMove: this.onMouseMove.bind(this),
      onMouseUp: this.stopDragging.bind(this)
    }

    const props = {
      isDragging: this.state.isDragging,
      handleMouseDown: this.startDragging.bind(this),
      onMotorsChange: throttle(this.onMotorsChange, 1000, this)
    }

    const motorValues = this.state.motorValues || []
    const motor1 = motorValues[0] ? motorValues[0].toFixed(0) : 0
    const motor2 = motorValues[1] ? motorValues[1].toFixed(0) : 0

    return (
      <div { ...events } className="container">
        <div className="header">
          <h1>Beam controller</h1>
        </div>
        <div className="content">
          <div className="output">
            { motor1 }, { motor2 }
          </div>
          <AxisPad { ...props } mousePos={ this.state.mousePos } />
        </div>
      </div>
    )
  }
}
