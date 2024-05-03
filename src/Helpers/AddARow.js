const addARow = (name, assistedBy, age, date, time, setResult, databaseName) => {
  const apiUrl = process.env.REACT_APP_URL_LINK + `add-Visitors${databaseName}`;
  const updatedData = {
    name: name,
    assistedBy: assistedBy,
    age: age,
    date: date,
    time: time,
  };
  console.log(updatedData, "UPDATED DATA");
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data); // Log the response from the server
      // Handle success, e.g., update UI or show a success message
      setResult(data);
      return data;
    })
    .catch((error) => {
      const resultErr =
        ("There was a problem with your fetch operation:", error);
      console.error(resultErr);
      setResult(resultErr);
      return resultErr;

      // Handle error, e.g., show an error message to the user
    });
};

export default addARow;
