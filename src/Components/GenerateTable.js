import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { MdSave } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { MdAddBox } from "react-icons/md";
import deleteARow from "../Helpers/DeleteSingleRow";
import updateARow from "../Helpers/UpdateARow";
import checkDataType from "../Helpers/CheckDataType";
import setTimeOutFunction from "../Helpers/SetTimeOut";

const GenerateTable = ({
  data,
  fetchTableData,
  databaseName,
  selectedTable,
}) => {
  const [columNames, setColumNames] = useState([]);
  // console.log(data)
  const [tableState, setTableState] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const updatedData = [...data].map((obj, i) => {
      obj.delete = (
        <button
          className="iconButtons"
          onClick={async () => {
            await deleteARow(obj.id, databaseName, selectedTable);
            console.log(data, 25);
            setTimeOutFunction(fetchTableData);
            setTableState(data);
          }}
        >
          <MdDelete />
        </button>
      );
      obj.edit = (
        <button
          className="iconButtons"
          id={i}
          onClick={(e) => {
            let x = document.querySelectorAll(
              ".editInput" + e.currentTarget.id
            );
            x.forEach((elem, i) => {
              if (i > 0) {
                elem.disabled = !elem.disabled;
              }
            });
            console.log(x);
          }}
        >
          <FaRegEdit />
        </button>
      );
      obj.save = (
        <button
          id={i}
          className="iconButtons"
          onClick={async (e) => {
            // const result = window.confirm("Are you sure you want to save");
            // if (result) {
            //   console.log("Data saved successfully");
            let x = document.querySelectorAll(
              ".editInput" + e.currentTarget.id
            );
            const resultArr = [];

            x.forEach((elem) => resultArr.push({ [elem.name]: elem.value }));
            x.forEach((elem) => (elem.disabled = true));
            await updateARow(obj.id, databaseName, resultArr);
            // setTimeOutFunction(fetchVisitorsData);
            // }
          }}
        >
          <MdSave />
        </button>
      );
      return obj;
    });
    let obj = {};
    obj.delete = "delete";
    const tableColumns = Object.keys(updatedData[0]);
    // console.log(tableColumns);
    setColumNames(tableColumns);
    console.log(data, 87);
    setTableState(data);
  }, [data]);
  console.log(data, 90);
  return (
    <table>
      <tr>
        {columNames.map((key, i) => (
          <th key={"A" + i}>{key}</th>
        ))}
      </tr>
      {tableState.map((obj, index) => {
        const arr = Object.values(obj);
        // console.log(arr);
        const keys = Object.keys(obj);
        return (
          <tr key={"B" + index}>
            {/* <td>{obj.name}</td> */}
            {arr.map((val, i) => (
              <td key={"C" + i}>
                {i >= arr.length - 3 ? (
                  val
                ) : (
                  <input
                    key={"D" + i}
                    id="GenerateTableInput"
                    className={`editInput${index}`}
                    disabled
                    name={keys[i]}
                    // defaultValue={val}
                    value={val}
                    type={checkDataType(keys[i])}
                    onChange={(e) =>
                      setTableState((prevState) => {
                        const newState = prevState.map((state, idx) => {
                          if (idx === index) {
                            return {
                              ...state,
                              [keys[i]]: e.target.value,
                            };
                          }
                          return state;
                        });
                        dispatch({ type: "UPDATE_DATA", data: newState });
                        return newState;
                      })
                    }
                  />
                )}
              </td>
            ))}
          </tr>
        );
      })}
    </table>
  );
};
const mapStateToProps = (state) => {
  console.log(state, "!!@@@!!");
  return {
    data: state.data,
    databaseName: state.databaseName,
    selectedTable: state.selectedTable,
  };
};
export default connect(mapStateToProps, {})(GenerateTable);

{
  /* <table>
<thead>
  <tr>
    <th>
      Select
      <input
        onChange={() => {
          let allCheckBoxes = document.querySelectorAll(".checkBox");
          let deleteButton = document.querySelector(".DeleteAllBtns");

          for (let i = 0; i < allCheckBoxes.length; i++) {
            if (checked.length > 0) {
              setChecked([]);
              allCheckBoxes[i].checked = false;
              deleteButton.style.opacity = "0.4";
              deleteButton.style.cursor = "default";
            } else {
              setChecked(true);
              setChecked([...checked, i]);
              allCheckBoxes[i].checked = true;
              deleteButton.style.opacity = "1";
              deleteButton.style.cursor = "pointer";
            }
          }
          // allCheckBoxes.map((elem) => (elem.checked = true));
        }}
        type="checkbox"
      />
    </th>
    {Object.keys(data[0]).map((key, i) => (
      <th key={i}>{firstLetterCasing(key)}</th>
    ))}
    <th>Edit</th>
    <th>Save</th>
    <th>Delete</th>
  </tr>
</thead>
<tbody>
  {data.map((entry, index) => (
    <tr key={"a" + index}>
      <td>
        <input
          onChange={(e) => {
            const isChecked = e.target.checked;
            const selectedIndex = index;
            let newChecked = [];
            if (isChecked) {
              newChecked = [...checked, selectedIndex];
              setChecked(newChecked);
            } else {
              newChecked = checked.filter(
                (item) => item !== selectedIndex
              );
              setChecked(newChecked);
            }
            let deleteButton = document.querySelector(".DeleteAllBtns");

            if (newChecked.length > 1) {
              deleteButton.style.opacity = "1";
            } else {
              deleteButton.style.opacity = "0.4";
            }
            console.log(newChecked);
          }}
          key={"b" + index}
          // checked={false}
          className="checkBox"
          type="checkbox"
        />
      </td>
      {Object.entries(entry).map(([key, value], i) => (
        <td key={"c" + i}>
          {console.log(value)}
          {i !== 0 ? (
            <input
              key={"d" + i}
              type={checkDataType(key)}
              className={`TableEditInput${edit}`}
              disabled={!edit}
              value={value}
              onChange={(e) =>
                handleInputChange(e.target.value, key, index)
              }
            />
          ) : (
            <input
              type="number"
              className={`TableNonEdit`}
              defaultValue={value}
              key={"e" + i}
              // value={k}
            />
          )}
        </td>
      ))}

      <td>
        <button
          className="EditAndDeleteBtn"
          onClick={() => setEdit(!edit)}
        >
          {edit ? (
            <FcCancel />
          ) : (
            <FaRegEdit style={{ color: "#0088ff" }} />
          )}
        </button>
      </td>
      <td>
        <button
          onClick={() => {
            const result = window.confirm(
              "Are you sure you want to save"
            );
            if (result) {
              console.log("Data saved successfully");
            }
          }}
          className="EditAndDeleteBtn"
        >
          <MdSave style={{ color: "#069861" }} />
        </button>
      </td>
      <td>
        <button
          onClick={() => console.log()}
          className="EditAndDeleteBtn"
        >
          <MdDelete style={{ color: "rgb(213, 0, 0)" }} />
        </button>
      </td>
    </tr>
  ))}
</tbody>
</table> */
}
