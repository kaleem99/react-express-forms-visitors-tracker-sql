const checkDataType = (input) => {
  //   console.log(input, "INO");
  const newInput = input.toLowerCase();
  switch (newInput) {
    case "integer":
    case "age":
      return "number";
    case "date":
      return "date";
    case "time":
      return "time";
    case "phone":
    case "cell":
    case "cellnumber":
    case "contact":
      return "tel";
    default:
      return "text";
  }
};
export default checkDataType;
