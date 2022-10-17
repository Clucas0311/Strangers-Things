import React, { useState } from "react";
import { registerUser } from "../api";

const SignUp = ({ setToken }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

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
    <form onSubmit={onSubmitHandler}>
      <input
        type="text"
        value={username}
        placeholder="username"
        required
        onChange={usernameChangeHandler}
      />
      <input
        type="password"
        value={password}
        placeholder="password"
        minlength="8"
        required
        onChange={passwordChangeHandler}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
