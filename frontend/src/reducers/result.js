const initialState = {
  isPending: false,
  results: [],
  getResultErrMsg: null,
};

export default function result(state = initialState, action) {
  switch (action.type) {
    case 'ADD_RESULT':
      return {
        ...state,
        results: [
          ...state.results,
          {
            nBlack: action.nBlack,
            nWhite: action.nWhite,
            finalTime: action.finalTime,
          },
        ],
      };
    case 'GET_RESULT_PENDING':
      return {
        ...state,
        isPending: true,
        getResultErrMsg: null,
      };
    case 'GET_RESULT_FULFILLED':
      return {
        ...state,
        isPending: false,
        getResultErrMsg: null,
        results: [...action.payload],
      };
    case 'GET_RESULT_REJECTED':
      return {
        ...state,
        isPending: false,
        getResultErrMsg: action.payload
          ? action.payload.data.message
          : 'Server was not found.',
      };
    case 'CLEAR_RESULT':
      return initialState;
    default:
      return state;
  }
}
