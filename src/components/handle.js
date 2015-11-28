import React, { Component } from 'react';
import './handle.scss';

export default class App extends Component {
  render() {
    const style = {
      width: this.props.size,
      height: this.props.size,
      top: this.props.pos.y,
      left: this.props.pos.x
    }

    const events = {
      onMouseDown: this.props.onMouseDown.bind(this),
    }

    return (
      <div style={ style }
           { ...events }
           className="handle">
      </div>
    );
  }
}
