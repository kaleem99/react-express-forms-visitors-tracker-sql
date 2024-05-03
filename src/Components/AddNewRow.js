import { useEffect, useState } from "react";
import fetchColumns from "../Helpers/FetchColumns";
import { connect, useDispatch } from "react-redux";
import withLoadingScreen from "./HigherOrderComponent";
import addARow from "../Helpers/AddARow";
import checkDataType from "../Helpers/CheckDataType";

const AddNewRow = ({ columns, fetchVisitorsData, databaseName }) => {
  // const dispatch = useDispatch();
  const [state, setState] = useState({});
  const [result, setResult] = useState("");
  return (
    <div className="AddNewRowForm">
      <h1>
        Add New Visitor Table{" "}
        <span style={{ fontSize: "11px" }}>{result.message}</span>
      </h1>
      <form className="AddNewVisitorForm">
        {/* {columns} */}
        {columns.map((col) => (
          <>
            <label>{col.name}</label>
            <input
              name={col.name}
              type={checkDataType(col.type)}
              onChange={(e) => {
                const name = e.target.name;
                const value = e.target.value;
                setState((prevState) => ({
                  ...prevState,
                  [name]: value,
                }));
              }}
              disabled={col.pk === 1 ? true : false}
            ></input>
          </>
        ))}
        <br></br>
        <br></br>
      </form>
      <button
        onClick={async () => {
          // setResult(
          await addARow(
            state.name,
            state.assistedBy,
            state.age,
            state.date,
            state.time,
            setResult,
            databaseName
          );
          // console.log(response, "response");
          // );
          await fetchVisitorsData();
        }}
        className="AddNewVisitorButton"
      >
        Submit{" "}
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    columns: state.columns,
    databaseName: state.databaseName,
  };
};

export default connect(mapStateToProps, {})(AddNewRow);
