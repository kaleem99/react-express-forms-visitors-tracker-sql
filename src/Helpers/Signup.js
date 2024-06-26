const handleSubmit = async (e, formData, dispatch) => {
  e.preventDefault();
  formData.email = formData.email.toLowerCase();
  console.log(formData, 3, 3);

  try {
    const response = await fetch(`${process.env.REACT_APP_URL_LINK}signup`, {
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
    console.log(response, "S");
    dispatch({ type: "USER_EXISTS", payload: data.message });
  } catch (error) {
    console.error("Error:", error);
  }
};

export default handleSubmit;
