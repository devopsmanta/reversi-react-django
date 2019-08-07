import { BOARD_SIZE } from '../constants';
import { delta } from '../constants';

const initialState = () => {
  const state = {
    cells: Array(BOARD_SIZE * 2)
      .fill(null)
      .map(i => Array(BOARD_SIZE * 2).fill(null)),
    nBlack: 2,
    nWhite: 2,
    turn: 1,
  }
  const pos = BOARD_SIZE - 1;
  state.cells[pos][pos] = 'B';
  state.cells[pos][pos + 1] = 'W';
  state.cells[pos + 1][pos] = 'W';
  state.cells[pos + 1][pos + 1] = 'B';
  return state;
};

const isInBoard = (x, y) => {
  if (x >= BOARD_SIZE * 2 || x < 0 || y >= BOARD_SIZE * 2 || y < 0) {
    return false;
  }
  return true;
};

const flipStone = (x, y, cells, currentStone) => {
  let flippedStones = [];
  let curX, curY;

  const nextStep = dir => {
    curX += dir[0];
    curY += dir[1];
  };

  for (let i = 0; i < delta.length; i++) {
    let buffer = [];
    curX = x;
    curY = y;

    nextStep(delta[i]);

    while (1) {
      if (!isInBoard(curX, curY)) {
        buffer = [];
        break;
      }
      if (cells[curX][curY] === null) {
        buffer = [];
        break;
      }
      if (cells[curX][curY] === currentStone) {
        break;
      }

      buffer.push({ x: curX, y: curY });
      nextStep(delta[i]);
    }

    flippedStones = [...flippedStones, ...buffer];
    flippedStones.forEach(stone => {
      cells[stone.x][stone.y] = currentStone;
    });
  }

  return flippedStones.length;
};

export default function game(state = initialState(), action) {
  switch (action.type) {
    case 'ADD_STONE':
      if (state.cells[action.payload.x][action.payload.y]) {
        return state;
      }
      const currentStone = state.turn ? 'B' : 'W';
      const newCells = [...state.cells];

      const nFlip = flipStone(
        action.payload.x,
        action.payload.y,
        newCells,
        currentStone
      );

      let nBlack = state.nBlack,
        nWhite = state.nWhite;

      if (nFlip) {
        newCells[action.payload.x][action.payload.y] = currentStone;
        if (currentStone === 'B') {
          nBlack = state.nBlack + nFlip + 1;
          nWhite = state.nWhite - nFlip;
        } else {
          nBlack = state.nBlack - nFlip;
          nWhite = state.nWhite + nFlip + 1;
        }
      }

      return {
        ...state,
        cells: newCells,
        turn: nFlip ? !state.turn : state.turn,
        nBlack,
        nWhite,
      };

    case 'SKIP_TURN':
      return {
        ...state,
        turn: !state.turn,
      };

    case 'RESET':
      return initialState();
    default:
      return state;
  }
}
