const defaultState = {};
const Reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      state.data = action.data;
      return { ...state };
    case "FETCH_COLUMNS":
      state.columns = action.data;
      return { ...state };
    default:
      return state;
  }
};

export default Reducer;
