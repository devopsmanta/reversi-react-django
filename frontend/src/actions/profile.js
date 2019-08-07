export function modifyProfile(promise) {
  return {
    type: 'MODIFY_PROFILE',
    payload: promise,
  };
}

export function profile(promise) {
  return {
    type: 'PROFILE',
    payload: promise,
  };
}

export function clearProfile() {
  return {
    type: 'CLEAR_PROFILE',
  };
}