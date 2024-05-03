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
      throw new Error("Error signing up");
    }

    const data = await response.json();
    console.log(data);
    dispatch({ type: data.message, payload: formData });
  } catch (error) {
    console.error("Error:", error);
  }
};

export default handleSubmit;
