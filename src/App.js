import logo from "./logo.svg";
import "./App.css";
import TableComponent from "./TableComponent";
import { useEffect, useState } from "react";
import fetchData from "./Helpers/FetchData";
import { connect, useDispatch } from "react-redux";
import fetchColumns from "./Helpers/FetchColumns";
import SignupForm from "./Components/Signup";
function App({ databaseName }) {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();

  const fetchVisitorsData = () => {
    fetchData(dispatch, `get-all-Visitors${databaseName}`);
    fetchColumns(dispatch, `get-columns-Visitors${databaseName}`);
  };
  console.log(state);
  useEffect(() => {
    dispatch({ type: "CHECKLOGIN", setState: setState });
    // fetchVisitorsData();
    // fetch(process.env.REACT_APP_URL_LINK + "create-database/NewDB", {
    //   method: "POST",
    //   // body: JSON.stringify(updatedData),
    // })
    //   // .then((response) => {
    //   //   if (!response.ok) {
    //   //     throw new Error("Network response was not ok");
    //   //   }
    //   //   return response.json();
    //   // })
    //   .then((data) => {
    //     console.log(data, "#".repeat(20)); // Log the response from the server
    //     // Handle success, e.g., update UI or show a success message
    //     // setResult(data);
    //     // fetchVisitorsData();
    //     return data;
    //   })
    //   .catch((error) => {
    //     const resultErr =
    //       ("There was a problem with your fetch operation:", error);
    //     console.error(resultErr);
    //     // setResult(resultErr);
    //     return resultErr;
    //     // Handle error, e.g., show an error message to the user
    //   });
  }, []);
  // const checkState = () => {
  //   switch(state){
  //     case "Add_Visitor":

  //   }
  // }
  return (
    <div className="App">
      {/* {databaseName == undefined ? ( */}
      <SignupForm />
      {/* // ) : (
      //   <TableComponent fetchVisitorsData={fetchVisitorsData} />
      // )} */}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    databaseName: state.databaseName,
  };
};
export default connect(mapStateToProps, {})(App);
