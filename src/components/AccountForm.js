import React, { useState } from "react";
import { registerUser } from "../api";
import { useParams, useNavigate } from "react-router-dom";

const SignUp = ({ setToken }) => {
  const { action } = useParams();
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  console.log("action", action);

  const usernameChangeHandler = (event) => setUserName(event.target.value);
  const passwordChangeHandler = (event) => setPassword(event.target.value);

  const onSubmitHandler = async (event) => {
    console.log("SUBMIT");
    event.preventDefault();
    try {
      console.log("username", username, "password", password);
      const { data } = await registerUser(username, password);

      setToken(data.token);
      navigate("/");

      console.log("data", data);
    } catch (error) {
      console.error(error);
    }
  };
  const title = action === "login" ? "Log In" : "Sign Up";
  return (
    <form className="ui form" onSubmit={onSubmitHandler}>
      <h1>{title}</h1>
      <div className="field">
        <label>Username</label>
        <input
          type="text"
          value={username}
          placeholder="username"
          required
          onChange={usernameChangeHandler}
        />
      </div>
      <div className="field">
        <label>Password</label>
        <input
          type="password"
          value={password}
          placeholder="password"
          minLength="8"
          required
          onChange={passwordChangeHandler}
        />
      </div>
      <button className="ui button" type="submit">
        {title}
      </button>
    </form>
  );
};

export default SignUp;
