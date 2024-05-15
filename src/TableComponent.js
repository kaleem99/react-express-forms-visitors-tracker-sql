import { useCallback, useMemo, useState, useEffect } from "react";
import { MdSave } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { MdAddBox } from "react-icons/md";
import { CiViewList } from "react-icons/ci";

import deleteARow from "./Helpers/DeleteSingleRow";
import GenerateTable from "./Components/GenerateTable";
import { connect, useDispatch } from "react-redux";
import withLoadingScreen from "./Components/HigherOrderComponent";
import AddNewRow from "./Components/AddNewRow";
import fetchColumns from "./Helpers/FetchColumns";
import ViewTableComponents from "./Components/ViewTablesComponents";
const mapStateToProps = (state) => {
  // console.log(state, 100);
  // console.log(state)
  return {
    data: state.data,
    tables: state.tables,
    email: state.databaseName,
  };
};
// const MyComponentContainer = connect(mapStateToProps, {})(GenerateTable);
const MyComponentWithLoading = withLoadingScreen(GenerateTable);
const AddNewRowWithLoading = withLoadingScreen(AddNewRow);

function TableComponent({ data, fetchVisitorsData, tables, email }) {
  const [addNewData, setAddNewData] = useState(false);
  const [inputValues, setInputValues] = useState(data);
  const [checked, setChecked] = useState([]);
  const dispatch = useDispatch();
  const handleInputChange = useCallback(
    (value, key, index) => {
      console.log("handleInputChange");
      // console.log(data);
      const newDataArray = [...data];
      const resultObj = newDataArray[index];
      resultObj[key] = value;
      newDataArray[index] = resultObj;
      setInputValues(newDataArray);
    },
    [data]
  );
  const firstLetterCasing = useMemo(() => {
    // console.log("firstLetterCasing");
    return (str) => {
      let result = str.split("");
      result[0] = result[0].toUpperCase();
      return result.join("");
    };
  }, []);
  const checkDataType = (key) => {
    switch (key) {
      case "age":
        return "number";
      case "date":
        return "date";
      case "time":
        return "time";
      default:
        return "text";
    }
  };
  useEffect(() => {
    // Fetch all tables when component mounts
    fetchTables();
    // fetchColumns(dispatch, "checkTableColumns", email, );
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const fetchTables = async () => {
    try {
      const response = await fetch("http://localhost:8080/get-all-tables", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Send email in request body
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tables");
      }

      const data = await response.json();
      // setTables(data.tables); // Update state with fetched table names
      console.log(data.tables);
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show error message to user)
    }
  };
  console.log(tables, 100);
  return (
    <div className="TableDiv">
      {/* {addNewData ? (
        <AddNewRow fetchVisitorsData={fetchVisitorsData} />
      ) : (
        <MyComponentWithLoading
          fetchVisitorsData={fetchVisitorsData}
          data={data}
        />
      )}
      <div className="LowerContentBtns">
        <button
          onClick={async () => {
            setAddNewData(!addNewData);
            fetchVisitorsData();
          }}
          className="AddNewRow"
        >
          {!addNewData ? (
            <>
              Add Row &nbsp;
              <MdAddBox />
            </>
          ) : (
            <>
              View Visitors &nbsp;
              <CiViewList />
            </>
          )}
        </button>
        <button disabled={checked.length === 0} className="DeleteAllBtns">
          Delete
        </button>
      </div> */}
      <div className="InnerTableComponent">
        {tables && tables.length !== 0 ? (
          <ViewTableComponents />
        ) : (
          <h1>No Tables add</h1>
        )}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, {})(TableComponent);
