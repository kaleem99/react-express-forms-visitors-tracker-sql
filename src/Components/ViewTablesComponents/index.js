import { connect, useDispatch } from "react-redux";
import fetchColumns from "../../Helpers/FetchColumns";
import { useState } from "react";
import AddTableRow from "./AddTableRow";
import ViewTableData from "./ViewTableData";
import { CiViewList } from "react-icons/ci";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import deleteATable from "../../Helpers/DeleteATable";
import fetchAllTables from "../../Helpers/FetchAllTables";
import setTimeOutFunction from "../../Helpers/SetTimeOut";

const ViewTableComponents = ({ data, tables, email }) => {
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  switch (state) {
    case "ADD_TABLE_ROW":
      return (
        <div>
          <AddTableRow />
        </div>
      );
    case "VIEW_TABLE_DATA":
      return <ViewTableData />;
    default:
      return (
        <div>
          <h1>Your Tables</h1>
          {tables.map((name) => (
            <button className="YourTables">
              <p> Table Name: {name}</p>
              {/* <p
                onClick={() => {
                  setState("VIEW_TABLE_DATA");
                  fetchColumns(dispatch, "checkTableColumns", email, name);
                }}
              ></p> */}
              <div
                className="indexTableRow"
                // onClick={() => {
                //   setState("ADD_TABLE_ROW");
                //   fetchColumns(dispatch, "checkTableColumns", email, name);
                //   console.log(name);
                // }}
              >
                <CiViewList
                  className="IndexIcon"
                  onClick={() => {
                    setState("VIEW_TABLE_DATA");
                    fetchColumns(dispatch, "checkTableColumns", email, name);
                  }}
                />
                <IoMdAddCircle
                  className="IndexIcon"
                  onClick={() => {
                    setState("ADD_TABLE_ROW");
                    fetchColumns(dispatch, "checkTableColumns", email, name);
                    console.log(name);
                  }}
                />
                <MdDelete
                  onClick={async () => {
                    await deleteATable(`deleteTable/${name}/${email}`, "");
                    setTimeout(async () => {
                      await fetchAllTables(dispatch, email);
                    }, 500);
                  }}
                  className="IndexIcon"
                />
                {/* Add */}
              </div>
            </button>
          ))}
        </div>
      );
  }
};
const mapStateToProps = (state) => {
  // console.log(state, 100);
  // console.log(state)
  return {
    data: state.data,
    tables: state.tables,
    email: state.databaseName,
  };
};
export default connect(mapStateToProps, {})(ViewTableComponents);
