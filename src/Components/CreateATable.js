import React, { useState } from "react";
import "./CreateTable.css"; // Assuming you have a separate CSS file for styling
import { connect, useDispatch } from "react-redux";
import fetchAllTables from "../Helpers/FetchAllTables";
const CreateTable = ({ email }) => {
  const [numColumns, setNumColumns] = useState(1); // State to track the number of columns
  const [tableData, setTableData] = useState(Array(numColumns).fill("")); // Initial table data
  const [tableName, setTableName] = useState("");
  const handleColumnInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumColumns(value);
    setTableData(Array(value).fill("")); // Update table data based on new column count
  };

  const handleDataInputChange = (e, index) => {
    const newData = [...tableData];
    newData[index] = e.target.value;
    setTableData(newData);
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tableData); // You can perform table creation logic here
  };
  const handleCreateTable = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_URL_LINK + "createTable",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, columns: tableData, tableName }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create table");
      }

      alert("Table created successfully");
    } catch (error) {
      alert("Failed to create table");
      console.error(error);
    }
  };
  return (
    <div className="Create-Table-Container">
      <div className="form-container">
        <h2>Create Table</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="numColumns">Table Name:</label>
          <input
            // key={index}
            type="text"
            //   placeholder={`Column ${index + 1}`}
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
            required
          />
          <label htmlFor="numColumns">Number of Columns:</label>
          <input
            type="number"
            id="numColumns"
            name="numColumns"
            value={numColumns}
            onChange={handleColumnInputChange}
            min={1}
            required
          />

          {/* Generate input fields based on numColumns */}

          {tableData.map((data, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Column ${index + 1}`}
              value={data}
              onChange={(e) => handleDataInputChange(e, index)}
              required
            />
          ))}
        </form>
        <button
          onClick={() => {
            handleCreateTable();
            setTimeout(async () => {
              await fetchAllTables(dispatch, email);
            }, 500);
          }}
          type="submit"
        >
          Create Table
        </button>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    email: state.databaseName,
  };
};
export default connect(mapStateToProps, {})(CreateTable);
