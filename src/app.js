import React, { Component } from 'react';
import AxisPad from './components/axis-pad';
import './app.scss';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      isDragging: false,
      mousePos: {
        x: 0,
        y: 0
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
        x: e.clientX,
        y: e.clientY
      }
    })
  }

  render () {
    const events = {
      onMouseMove: this.onMouseMove.bind(this),
      onMouseUp: this.stopDragging.bind(this)
    }

    const props = {
      isDragging: this.state.isDragging,
      handleMouseDown: this.startDragging.bind(this)
    }

    return (
      <div { ...events } className="container">
        <div className="header">
          <h1>Beam controller</h1>
        </div>
        <div className="content">
          <AxisPad { ...props } mousePos={ this.state.mousePos } />
        </div>
      </div>
    );
  }
}
