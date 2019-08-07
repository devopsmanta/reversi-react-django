export function addResult(nBlack, nWhite, finalTime) {
  return {
    type: 'ADD_RESULT',
    nBlack,
    nWhite,
    finalTime,
  };
}

export function getResult(promise) {
  return {
    type: 'GET_RESULT',
    payload: promise,
  };
}

export function postResult(promise) {
  return {
    type: 'POST_RESULT',
    payload: promise,
  };
}

export function clearResult() {
  return {
    type: 'CLEAR_RESULT',
  };
}
