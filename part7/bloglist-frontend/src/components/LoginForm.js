import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";
import { Form, Button } from "react-bootstrap";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
  };

  return (
    <div>
      <h1 className="d-flex justify-content-center">Log in</h1>
      <div className="d-flex justify-content-center align-items-center">
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label htmlFor="username">username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              className="mb-3"
              onChange={({ target }) => setUsername(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              className="mb-3"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Form.Group>
          <Button type="submit">login</Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
