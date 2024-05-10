import { FetchColumnsAction } from "../Redux/Actions";

const fetchColumns = async (dispatch, url, email, tableName) => {
  const urlRoute = process.env.REACT_APP_URL_LINK + url;
  // console.log(urlRoute);

  try {
    const response = await fetch(urlRoute, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tableName, email }),
    });

    if (!response.ok) {
      throw new Error("Failed to check columns");
    }

    const data = await response.json();
    // setColumns(data.columns);
    dispatch(FetchColumnsAction(data, tableName));
    console.log("DATA UPDATED", data);
  } catch (error) {
    console.error(error);
    // Handle error (e.g., show error message to user)
  }
};

export default fetchColumns;
