import React, { useState } from "react";
import { registerUser } from "../api";
import { Button, Form } from "semantic-ui-react";

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
    <Form onSubmit={onSubmitHandler}>
      <Form.Field>
        <input
          type="text"
          value={username}
          placeholder="username"
          required
          onChange={usernameChangeHandler}
        />
      </Form.Field>
      <Form.Field>
        <input
          type="password"
          value={password}
          placeholder="password"
          minlength="8"
          required
          onChange={passwordChangeHandler}
        />
      </Form.Field>
      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default SignUp;
