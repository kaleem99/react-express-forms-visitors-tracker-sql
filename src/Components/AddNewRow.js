import { useEffect } from "react";
import fetchColumns from "../Helpers/FetchColumns";
import { connect, useDispatch } from "react-redux";

const AddNewRow = ({ columns }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    // /get-columns-
    fetchColumns(dispatch, "get-columns-Visitors");
  }, []);
  console.log(columns);
  return (
    <div className="AddNewRowForm">
      <h1>Visitors Table</h1>
      <form action="">
        {columns.slice(1).map((col) => (
          <>
            <label>{col}</label>
            <input></input>
          </>
        ))}
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    columns: state.columns,
  };
};

export default connect(mapStateToProps, {})(AddNewRow);
