import { useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import fetchData from "../../Helpers/FetchData";
import GenerateTable from "../GenerateTable";

const ViewTableData = ({ email, selectedTable, data }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const url = `get-all-Visitors`;
    console.log(url, email, selectedTable);
    fetchData(dispatch, url, { email, selectedTable });
  }, [selectedTable]);
  return data && data.length > 0 ? <GenerateTable /> : <h1>Loading</h1>;
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
export default connect(mapStateToProps, {})(ViewTableData);
