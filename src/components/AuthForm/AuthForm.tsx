import React, { type FormEvent, type ChangeEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { registerProps } from "../../pages/Register/Register";
import { useLocation } from "react-router-dom";

type AuthFormProps = {
  callback: (props: registerProps) => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ callback }) => {
  const path = useLocation().pathname;

  const initUsername = path === "/login" ? "user1" : "";
  const initPassword = path === "/login" ? "user1pass" : "";

  const [username, setUsername] = useState<string>(initUsername);
  const [password, setPassword] = useState<string>(initPassword);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password) {
      alert("Please enter all fields");
      return;
    }

    const requestBody = {
      username,
      password,
    };

    callback(requestBody);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          name="username"
          placeholder="Enter username"
          onChange={handleChange}
          value={username}
          autoComplete="on"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Enter Password"
          onChange={handleChange}
          value={password}
          autoComplete="on"
        />
      </Form.Group>
      <Button className="w-100" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default AuthForm;
