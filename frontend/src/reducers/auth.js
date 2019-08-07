import { saveAuthentication, clearAuthentication } from '../utils';

const initialState = {
  token: null,
  isAuthenticated: false,
  isPending: false,
  loginErrorMsg: null,
  registerErrorMsg: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_PENDING':
      return {
        ...state,
        isPending: true,
        loginErrorMsg: null,
      };
    case 'LOGIN_FULFILLED':
      saveAuthentication(action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        isPending: false,
        loginErrorMsg: null,
      };
    case 'LOGIN_REJECTED':
      return {
        ...state,
        isPending: false,
        loginErrorMsg: action.payload
          ? action.payload.data.message
          : 'Server was not found.',
      };
    case 'REGISTER_PENDING':
      return {
        ...state,
        isPending: true,
        registerErrorMsg: null,
      };
    case 'REGISTER_FULFILLED':
      saveAuthentication(action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        isPending: false,
        registerErrorMsg: null,
      };
    case 'REGISTER_REJECTED':
      return {
        ...state,
        isPending: false,
        registerErrorMsg: action.payload
          ? action.payload.data.message
          : 'Server was not found.',
      };
    case 'LOGOUT':
      clearAuthentication();
      return initialState;
    case 'SET_TOKEN':
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
      };
    default:
      return state;
  }
}
