import React from 'react';

import Square from './Square';
import { BOARD_SIZE } from '../constants';

export default class Board extends React.Component {
  render() {
    let cells = [];
    for (let i = 0; i < BOARD_SIZE * 2; i++) {
      for (let j = 0; j < BOARD_SIZE *  2; j++) {
        cells.push(
          <Square
            value={this.props.cells[i][j]}
            key={`square${i * BOARD_SIZE * 2 + j}`}
            onClickCell={() => this.props.onClickCell(i, j)}
          />
        );
      }
      cells.push(<br key={`br${i}`} />);
    }

    return <div id="board-wrapper">{cells}</div>;
  }
}
