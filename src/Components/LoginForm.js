import React, { useState } from "react";
import handleSubmit2 from "../Helpers/Login";
import { connect, useDispatch } from "react-redux";

const LoginForm = ({ Message }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    // username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Send form data to the server or perform validation here
  //     console.log(formData);
  //     // Reset form after submission
  //     setFormData({ name: "", username: "", email: "", password: "" });
  //   };

  return (
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit2(e, formData, dispatch)}>
        <div>
          {/* <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          /> */}
        </div>
        {/* <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div> */}
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        <p>
          {Message}{" "}
          <a
            onClick={() =>
              dispatch({ type: "CHANGE_SECTION", payload: "SIGNUP" })
            }
            href="#"
          >
            Signup
          </a>
        </p>
      </p>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    Message: state.ErrorMessage,
  };
};
export default connect(mapStateToProps, {})(LoginForm);
