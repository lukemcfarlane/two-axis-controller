import React, { Component } from 'react'
import Handle from './handle';

const HANDLE_SIZE = 30
const BORDER_WIDTH = 4

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
    this.setState({
      handlePos: {
        x: this.refs.axisPad.offsetWidth / 2 - (HANDLE_SIZE / 2),
        y: this.refs.axisPad.offsetHeight / 2 - (HANDLE_SIZE / 2)
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mousePos: nextProps.mousePos,
    })
    this.setHandlePos()
  }

  setHandlePos() {
    if(this.props.isDragging && this.refs.axisPad) {
      const halfHandle = HANDLE_SIZE / 2
      const mousePos = {
        x: this.state.mousePos.x - halfHandle,
        y: this.state.mousePos.y - halfHandle
      }
      const axisPad = this.refs.axisPad;

      const width = axisPad.offsetWidth
      const height = axisPad.offsetHeight
      const top = axisPad.offsetTop
      const bottom = axisPad.offsetTop + height - HANDLE_SIZE
      const left = axisPad.offsetLeft
      const right = axisPad.offsetLeft + width - HANDLE_SIZE

      var x = mousePos.x - left
      var y = mousePos.y - top

      if (mousePos.y < top) {
        y = 0;
      } else if (mousePos.y > bottom) {
        y = height - HANDLE_SIZE - BORDER_WIDTH
      } else {
        y = mousePos.y - top
      }

      if (mousePos.x < left) {
        x = 0;
      } else if (mousePos.x > right) {
        x = width - HANDLE_SIZE - BORDER_WIDTH
      } else {
        mousePos.x - left
      }

      this.setState({
        handlePos: { x, y }
      })
    }
  }

  render () {
    const events = {
      onMouseDown: this.props.handleMouseDown
    }

    return (
      <div className="axis-pad" ref="axisPad">

        <Handle size={ HANDLE_SIZE }
                { ...events }
                pos={ this.state.handlePos }/>
      </div>
    )
  }
}
