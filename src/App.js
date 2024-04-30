import logo from "./logo.svg";
import "./App.css";
import TableComponent from "./TableComponent";
import { useEffect, useState } from "react";
import fetchData from "./Helpers/FetchData";
import { useDispatch } from "react-redux";

function App() {
  const [state, setState] = useState([]);
  const dispatch = useDispatch();
  const fetchVisitorsData = () => {
    fetchData(dispatch, "get-all-Visitors");
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
      <TableComponent fetchVisitorsData={fetchVisitorsData} />
    </div>
  );
}

export default App;
