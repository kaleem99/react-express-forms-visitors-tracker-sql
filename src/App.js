import logo from "./logo.svg";
import "./App.css";
import TableComponent from "./TableComponent";
import { useEffect, useState } from "react";
import fetchData from "./Helpers/FetchData";
import { connect, useDispatch } from "react-redux";
import fetchColumns from "./Helpers/FetchColumns";
import SignupForm from "./Components/Signup";
import LoginForm from "./Components/LoginForm";
import fetchAllTables from "./Helpers/FetchAllTables";
import Sections from "./Components/Sections";
import Sidebar from "./Components/NavBar";
function App({ databaseName, section }) {
  const [state, setState] = useState(false);
  const [nav, setNav] = useState(true);
  const dispatch = useDispatch();
  console.log(databaseName);
  const fetchVisitorsData = () => {
    fetchData(dispatch, `get-all-tables/${encodeURIComponent(databaseName)}`);
    fetchColumns(dispatch, `checkTableColumns`, databaseName, "TableName");
  };
  useEffect(() => {
    fetchAllTables(dispatch, databaseName);
    const token = localStorage.getItem("Token");
    if (token) {
      dispatch({ type: "CHANGE_SECTION", payload: "DASHBOARD" });
    }
    // dispatch({ type: "CHECKLOGIN", setState: setState });
    // fetch(process.env.REACT_APP_URL_LINK + "dashboard", {
    //   method: "GET",
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       console.log("ERR");
    //       throw new Error("Network response was not ok");
    //     }
    //   })
    //   .then((data) => {
    //     console.log(data, 28);
    //     if (data) {
    //       console.log(100);
    //       dispatch({ type: "CHANGE_SECTION", payload: "DASHBOARD" });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
  const checkSection = () => {
    switch (section) {
      case "SIGNUP":
        return <SignupForm />;
      case "LOGIN":
        return <LoginForm />;
      case "DASHBOARD":
        return (
          <div style={{ width: "100%", height: "100vh", display: "flex" }}>
            <Sidebar />
            <Sections />
          </div>
        );
      default:
        <SignupForm />;
    }
  };
  return (
    <div className="App">
      {/* {databaseName == undefined ? ( */}
      {checkSection()}
      {/* // ) : (
      //   <TableComponent fetchVisitorsData={fetchVisitorsData} />
      // )} */}
    </div>
  );
}
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    databaseName: state.databaseName,
    section: state.SECTION,
  };
};
export default connect(mapStateToProps, {})(App);
