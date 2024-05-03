import logo from "./logo.svg";
import "./App.css";
import TableComponent from "./TableComponent";
import { useEffect, useState } from "react";
import fetchData from "./Helpers/FetchData";
import { connect, useDispatch } from "react-redux";
import fetchColumns from "./Helpers/FetchColumns";
import SignupForm from "./Components/Signup";
function App({ databaseName }) {
  const [state, setState] = useState([]);
  const dispatch = useDispatch();
  const fetchVisitorsData = () => {
    console.log(databaseName);
    fetchData(dispatch, `get-all-Visitors${databaseName}`);
    fetchColumns(dispatch, `get-columns-Visitors${databaseName}`);
  };
  useEffect(() => {
    fetchVisitorsData();
  }, []);
  // const checkState = () => {
  //   switch(state){
  //     case "Add_Visitor":

  //   }
  // }
  return (
    <div className="App">
      {databaseName == undefined ? (
        <SignupForm />
      ) : (
        <TableComponent fetchVisitorsData={fetchVisitorsData} />
      )}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    databaseName: state.databaseName,
  };
};
export default connect(mapStateToProps, {})(App);
