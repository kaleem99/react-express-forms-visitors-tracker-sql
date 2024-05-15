const deleteARow = (num, name, selectedTable) => {
  const urlRoute =
    process.env.REACT_APP_URL_LINK +
    "delete-single-row" +
    num +
    "/" +
    name +
    "/" +
    selectedTable;
  // console.log(urlRoute);
  console.log(urlRoute, 5, selectedTable);
  fetch(urlRoute, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // Add any additional headers as needed
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default deleteARow;
