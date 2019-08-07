import React from 'react';

import './component.css';

class BoardState extends React.Component {
  render() {
    return (
      <div className="board-state">
        <div className="circle-shape-black">{this.props.black}</div>
        <div className="circle-shape-white">{this.props.white}</div>
      </div>
    );
  }
}

export default BoardState;
