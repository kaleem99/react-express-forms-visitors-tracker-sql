const deleteATable = (url, result) => {
  const urlRoute = process.env.REACT_APP_URL_LINK + url;
  fetch(urlRoute, {
    method: "DELETE",
    // headers: {
    //   "Content-Type": "application/json",
    // },
    // body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((responseData) => {
      //   dispatch(FetchDataAction(responseData));
      result = responseData;
      console.log("DATA UPDATED", responseData);
    })
    .catch((err) => console.log(err));
};

export default deleteATable;
