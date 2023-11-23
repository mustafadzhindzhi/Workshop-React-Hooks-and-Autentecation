const reducer = (state, action) => {
  //action is the object with type and payload
  switch (action?.type) {
    case 'GET_ALL_COMMENTS':
      return [...action.payload];
    case 'ADD_COMMENT':
        return [...state, action.payload];
    default:
      return state;
  }
};

export default reducer;