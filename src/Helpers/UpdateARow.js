const updateARow = (num, name, data) => {
  const TableName = "Visitors";
  const apiUrl = process.env.REACT_APP_URL_LINK + `update-${TableName}${num}/${name}`;
  const updatedData = { ...data }; // Assuming data is an object with column names as keys

  const columnNames = Object.keys(updatedData);
  const updateValues = columnNames
    .map((columnName) => `${columnName} = ?`)
    .join(", ");

  const queryParams = [...Object.values(updatedData)];
  console.log(data, "DARA");
  console.log(data, 111)
  fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Include num in the request body
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // console.log(data); // Log the response from the server
      // Handle success, e.g., update UI or show a success message
      console.log(data, "Working correctly");
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
      // Handle error, e.g., show an error message to the user
    });
};

export default updateARow;
