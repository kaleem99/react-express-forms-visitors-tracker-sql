const defaultState = { LOGIN: false };
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
    case "User created successfully":
      state.LOGIN = true;
      localStorage.setItem("LOGINDETAILS", JSON.stringify(action.payload));
      return { ...state };
    case "CHECKLOGIN":
      const loginData = localStorage.getItem("LOGINDETAILS");
      // console.log(loginData);
      if (loginData) {
        action.setState(true);
      }
      return { ...state };
    default:
      return state;
  }
};

export default Reducer;
