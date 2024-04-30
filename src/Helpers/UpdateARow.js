const updateARow = (num, name, assistedBy, age, date, time) => {
  const apiUrl = process.env.REACT_APP_URL_LINK + "update-Visitors" + num;
  const updatedData = {
    name: name,
    assistedBy: assistedBy,
    age: age,
    date: date,
    time: time,
  };

  fetch(apiUrl, {
    method: "PUT",
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
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
      // Handle error, e.g., show an error message to the user
    });
};

export default updateARow;
