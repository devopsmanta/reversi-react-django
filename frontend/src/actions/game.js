export function addStone(x, y, color) {
  return {
    type: 'ADD_STONE',
    payload: {
      x,
      y,
      color,
    },
  };
}

export function skipTurn() {
  return {
    type: 'SKIP_TURN',
  };
}

export function reset() {
  return {
    type: 'RESET',
  };
}
