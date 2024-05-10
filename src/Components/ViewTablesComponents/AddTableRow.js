import { useState } from "react";
import { connect } from "react-redux";
import addARow from "../../Helpers/AddARow";
const AddTableRow = ({ columns, email, selectedTable }) => {
  //   console.log(columns);
  const [result, setResult] = useState("");
  return (
    <div>
      {columns.map((elem) => (
        <div key={elem.name}>
          <label>{elem.name}</label>
          <input
            onChange={(e) =>
              //   setTableState((prevState) => {
              //     return { ...prevState, [elem.name]: e.target.value };
              //   })
              (elem.value = e.target.value)
            }
            value={elem.value}
            name={elem.name}
          ></input>
        </div>
      ))}
      <button
        onClick={async () => {
          // setResult(
          await addARow(columns, setResult, email, selectedTable);
          // console.log(response, "response");
          // );
          //   await fetchVisitorsData();
        }}
      >
        Submit Data
      </button>
    </div>
  );
};
const mapStateToProps = (state) => {
  // console.log(state, 100);
  console.log(state);

  return {
    data: state.data,
    tables: state.tables,
    email: state.databaseName,
    columns: state.columns,
    selectedTable: state.selectedTable,
  };
};
export default connect(mapStateToProps, {})(AddTableRow);
