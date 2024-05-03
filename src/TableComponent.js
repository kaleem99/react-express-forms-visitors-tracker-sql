import { useCallback, useMemo, useState } from "react";
import { MdSave } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { MdAddBox } from "react-icons/md";
import { CiViewList } from "react-icons/ci";

import deleteARow from "./Helpers/DeleteSingleRow";
import GenerateTable from "./Components/GenerateTable";
import { connect } from "react-redux";
import withLoadingScreen from "./Components/HigherOrderComponent";
import AddNewRow from "./Components/AddNewRow";
const mapStateToProps = (state) => {
  // console.log(state, 100);
  return {
    data: state.data,
  };
};
// const MyComponentContainer = connect(mapStateToProps, {})(GenerateTable);
const MyComponentWithLoading = withLoadingScreen(GenerateTable);
const AddNewRowWithLoading = withLoadingScreen(AddNewRow);

function TableComponent({ data, fetchVisitorsData }) {
  const [addNewData, setAddNewData] = useState(false);
  const [inputValues, setInputValues] = useState(data);
  const [checked, setChecked] = useState([]);
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
  return (
    <div className="TableDiv">
      {addNewData ? (
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
      </div>
    </div>
  );
}

export default connect(mapStateToProps, {})(TableComponent);
