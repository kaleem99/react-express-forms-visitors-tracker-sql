import { useCallback, useMemo, useState } from "react";
import { MdSave } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import { MdAddBox } from "react-icons/md";

export function TableComponent({ data }) {
  const [edit, setEdit] = useState(false);
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
    console.log("firstLetterCasing");
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
      {data.length > 0 && (
        <table>
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
                      let deleteButton =
                        document.querySelector(".DeleteAllBtns");

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
                  <button className="EditAndDeleteBtn">
                    <MdDelete style={{ color: "rgb(213, 0, 0)" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="LowerContentBtns">
        <button className="AddNewRow">
          Add Row &nbsp; <MdAddBox />
        </button>
        <button disabled={checked.length === 0} className="DeleteAllBtns">
          Delete
        </button>
      </div>
    </div>
  );
}
