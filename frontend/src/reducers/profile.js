const initialState = {
  isPending: false,
  profileErrorMsg: null,
  modifyProfileErrorMsg: null,
  currentUser: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'PROFILE_PENDING':
      return {
        ...state,
        isPending: true,
        profileErrorMsg: null,
      };
    case 'PROFILE_FULFILLED':
      return {
        ...state,
        currentUser: action.payload,
        isPending: false,
        profileErrorMsg: null,
      };
    case 'PROFILE_REJECTED':
      return {
        ...state,
        isPending: false,
        profileErrorMsg: action.payload
          ? action.payload.data.message
          : 'Server was not found.',
      };
    case 'MODIFY_PROFILE_PENDING':
      return {
        ...state,
        isPending: true,
        modifyProfileErrorMsg: null,
      };
    case 'MODIFY_PROFILE_FULFILLED':
      return {
        ...state,
        isPending: false,
        currentUser: action.payload,
        modifyProfileErrorMsg: null,
      };
    case 'MODIFY_PROFILE_REJECTED':
      return {
        ...state,
        isPending: false,
        modifyProfileErrorMsg: action.payload
          ? action.payload.data.message
          : 'Server was not found.',
      };
    case 'CLEAR_PROFILE':
      return initialState;
    default:
      return state;
  }
}
