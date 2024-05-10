const setTimeOutFunction = (functionName) => {
  setTimeout(async () => {
    await functionName;
  }, 500);
};

export default setTimeOutFunction;
