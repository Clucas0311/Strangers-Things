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
    event.preventDefault();

    console.log("username", username, "password", password);
    const { error, token, message } = await registerUser(username, password);
    console.error(error);
    setToken(token);
    if (token) {
      navigate("/");
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
