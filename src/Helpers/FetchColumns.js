import { FetchColumnsAction } from "../Redux/Actions";

const fetchColumns = (dispatch, url) => {
  const urlRoute = process.env.REACT_APP_URL_LINK + url;
  // console.log(urlRoute);
  fetch(urlRoute)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data);
      dispatch(FetchColumnsAction(data));
      console.log("DATA UPDATED");
    })
    .catch((err) => console.log(err));
};

export default fetchColumns;
