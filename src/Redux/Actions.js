const FetchDataAction = (data) => {
  return {
    type: "FETCH_DATA",
    data: data,
  };
};
const FetchColumnsAction = (data) => {
  return {
    type: "FETCH_COLUMNS",
    data: data,
  };
};
export { FetchDataAction, FetchColumnsAction };
