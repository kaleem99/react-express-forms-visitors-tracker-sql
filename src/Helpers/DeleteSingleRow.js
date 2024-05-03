const deleteARow = (num, name) => {
  const urlRoute =
    process.env.REACT_APP_URL_LINK + "delete-Visitors" + num + "/" + name;
  // console.log(urlRoute);
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
