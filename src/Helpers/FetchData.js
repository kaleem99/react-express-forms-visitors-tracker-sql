import { FetchDataAction } from "../Redux/Actions";

const fetchData = (dispatch, url) => {
  const urlRoute = process.env.REACT_APP_URL_LINK + url;
  // console.log(urlRoute);
  fetch(urlRoute)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      dispatch(FetchDataAction(data));
      console.log("DATA UPDATED", data);
    })
    .catch((err) => console.log(err));
};

export default fetchData;
