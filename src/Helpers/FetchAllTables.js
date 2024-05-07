const fetchAllTables = (dispatch, email) => {
  const urlRoute = process.env.REACT_APP_URL_LINK + "get-all-tables";
  console.log(urlRoute, 3)
  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  };

  fetch(urlRoute, requestData)
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      dispatch({ type: "FETCH_ALL_TABLES", payload: data });
      console.log("DATA UPDATED", data);
    })
    .catch((err) => console.log(err));
};

export default fetchAllTables;
