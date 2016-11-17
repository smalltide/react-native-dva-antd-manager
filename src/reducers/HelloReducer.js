export default (state = null, action) => {
  switch (action.type) {
    case 'say_hello':
      return action.payload;
    default:
      return state;
  }
};
