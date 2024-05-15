const defaultState = {
  LOGIN: false,
  SECTION: "SIGNUP",
  section: "Create Table",
  columns: [],
  data: [],
};
const Reducer = (state = defaultState, action) => {
  const databaseName = localStorage.getItem("Database");
  // console.log(databaseName);
  state.databaseName = databaseName;
  switch (action.type) {
    case "FETCH_DATA":
      state.data = action.data;
      return { ...state };
    case "FETCH_COLUMNS":
      state.columns = action.data;
      state.selectedTable = action.tableName;
      console.log(action.tableName, "RED");

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
    case "USERLOGOUT":
      localStorage.removeItem("Token");
      // console.log(loginData);
      // if (loginData) {
      // action.setState(false);
      // }
      window.location.reload();
      return { ...state };
    case "USER_EXISTS":
      // console.log("1000".repeat(10));
      state.ErrorMessage = action.payload;
      return { ...state };
    case "CHANGE_SECTION":
      state.SECTION = action.payload;
      return { ...state };
    case "USER_LOGIN":
      console.log(action.payload, action.token, 36);
      localStorage.setItem("Token", action.token);
      localStorage.setItem("Database", action.database);
      console.log(localStorage.getItem("Token"), 19);

      return { ...state };
    case "FETCH_ALL_TABLES":
      console.log(action.payload.tables, 43);
      return { ...state, tables: action.payload.tables };
    case "CHANGE_DASHBOARD":
      state.section = action.payload;
      return { ...state };
    default:
      return state;
  }
};

export default Reducer;
