import { FetchDataAction } from "../Redux/Actions";

const fetchData = (dispatch, url, data) => {
  const urlRoute = process.env.REACT_APP_URL_LINK + url;
  console.log(urlRoute);
  fetch(urlRoute, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((responseData) => {
      dispatch(FetchDataAction(responseData));
      console.log("DATA UPDATED", responseData);
    })
    .catch((err) => console.log(err));
};

export default fetchData;
