const handleSubmit2 = async (e, formData, dispatch) => {
  e.preventDefault();
  formData.email = formData.email.toLowerCase();
  console.log(formData, 3, 3);

  try {
    const response = await fetch(`${process.env.REACT_APP_URL_LINK}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      console.log(response);
      throw new Error("Error signing up");
    }

    const data = await response.json();
    console.log(data);
    console.log(response, "SSSS");
    dispatch({
      type: "USER_LOGIN",
      payload: data.message,
      token: data.token,
      database: data.email,
    });
    dispatch({ type: "CHANGE_SECTION", payload: "DASHBOARD" });
  } catch (error) {
    console.error("Error:", error);
  }
};

export default handleSubmit2;
