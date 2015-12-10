import React, { Component } from 'react'
import Handle from './handle';

export default class AxisPad extends React.Component {
  constructor() {
    super()
    this.state = {
      mousePos: { x: 0, y: 0 },
      handlePos: { x: 0, y: 0 },
      isDragging: false
    }
  }

  componentDidMount() {
    const axisPad = this.refs.axisPad
    this.width = axisPad.offsetWidth
    this.height = axisPad.offsetHeight
    this.top = axisPad.offsetTop
    this.bottom = axisPad.offsetTop + this.height
    this.left = axisPad.offsetLeft
    this.right = axisPad.offsetLeft + this.width

    this.setState({
      handlePos: {
        x: this.width / 2,
        y: this.height / 2
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.mousePos.x !== nextProps.mousePos.x &&
       this.state.mousePos.y !== nextProps.mousePos.y) {

      this.setState({
        mousePos: nextProps.mousePos,
      })
      this.setHandlePos()
    }
  }

  setHandlePos() {
    if(this.props.isDragging && this.refs.axisPad) {
      var x = this.state.mousePos.x - this.left;
      var y = this.state.mousePos.y - this.top;

      if (y < 0) {
        y = 0;
      } else if (y > this.height) {
        y = this.height
      }

      if (x < 0) {
        x = 0;
      } else if (x > this.width) {
        x = this.width
      }

      console.log(`Mouse pos (x, y) = (${x}, ${y})`);
      this.setState({
        handlePos: { x, y }
      })
      this.updateMotorValues()
    }
  }

  updateMotorValues() {
    const x = this.state.handlePos.x
    const y = this.state.handlePos.y

    const halfHeight = this.height / 2
    const halfWidth = this.width / 2

    var scalar = 2 * 255 * ((-y + halfHeight) / this.height)
    var ratio = (x - halfWidth) / halfWidth

    var m1, m2

    if(x < halfWidth) {
      m1 = scalar * (x / halfWidth)
      m2 = scalar
    } else {
      m1 = scalar
      m2 = scalar * ((this.width - x) / halfWidth)
    }

    this.props.onMotorsChange([ m1, m2 ])
  }

  render () {
    const events = {
      onMouseDown: this.props.handleMouseDown
    }

    return (
      <div className="axis-pad" ref="axisPad">

        <Handle { ...events }
                pos={ this.state.handlePos }/>
      </div>
    )
  }
}
