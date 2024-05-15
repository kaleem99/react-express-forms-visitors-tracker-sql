const FetchDataAction = (data) => {
  console.log(data, 2);
  return {
    type: "FETCH_DATA",
    data: data,
  };
};
const FetchColumnsAction = (data, tableName) => {
  return {
    type: "FETCH_COLUMNS",
    data: data,
    tableName,
  };
};
export { FetchDataAction, FetchColumnsAction };
