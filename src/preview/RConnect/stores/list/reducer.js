const initialState = {
  list: [],
}

export default (state = initialState, action) => {
  switch(action.type) {
    case "updateList":
      return Object.assign({}, state, {
        list: action.params.list,
      });
    default:
      return state;
  }
}