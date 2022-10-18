import React, { useState } from "react";
import { registerUser } from "../api";
import { useParams } from "react-router-dom";

const SignUp = ({ setToken }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const params = useParams();
  console.log("params", params);

  const usernameChangeHandler = (event) => setUserName(event.target.value);
  const passwordChangeHandler = (event) => setPassword(event.target.value);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("username", username, "password", password);
    const { data } = await registerUser(username, password);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    console.log("data", data);
  };

  return (
    <div className="ui form" onSubmit={onSubmitHandler}>
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
        Sign Up
      </button>
    </div>
  );
};

export default SignUp;
