
const fetchData = (setState, url) => {
  const urlRoute = process.env.REACT_APP_URL_LINK + url;
  console.log(urlRoute);
  fetch(urlRoute)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setState(data);
    });
};

export default fetchData;
