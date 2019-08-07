const initialState = {
  visible: false,
};

export default function spin(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_SPINNER':
      return {
        visible: true,
      };
    case 'HIDE_SPINNER':
      return {
        visible: false,
      };
    default:
      return state;
  }
}
