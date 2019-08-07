export function login(promise) {
  return {
    type: 'LOGIN',
    payload: promise,
  };
}

export function register(promise) {
  return {
    type: 'REGISTER',
    payload: promise,
  };
}

export function logout() {
  return {
    type: 'LOGOUT',
  };
}

export function setToken(token) {
  return {
    type: 'SET_TOKEN',
    payload: token,
  }
}
