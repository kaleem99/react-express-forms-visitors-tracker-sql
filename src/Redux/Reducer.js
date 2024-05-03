const defaultState = {};
const Reducer = (state = defaultState, action) => {
  const databaseName = localStorage.getItem("DatabaseName");
  // console.log(databaseName);
  state.databaseName = databaseName;
  switch (action.type) {
    case "FETCH_DATA":
      state.data = action.data;
      return { ...state };
    case "FETCH_COLUMNS":
      state.columns = action.data;
      // console.log(state);
      return { ...state };
    case "UPDATE_DATA":
      state.data = action.data;
      return { ...state };
    default:
      return state;
  }
};

export default Reducer;
