import React, { useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import { connect } from "react-redux";
import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Declare hook for each input
  const [setUsernameErr] = useState("");
  const [setPasswordErr] = useState("");

  // // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username must be at least 5 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr("Password must be at least 6 characters long");
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send a request to the server for authentication */
      axios
        .post("https://movieapishelf.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log("no such user");
        });
    }
  };

  return (
    <Form>
      <h2 className="mb-3 mx-auto mt-5">Login to MyFlixDB</h2>
      <Form.Group className="mb-3 mx-auto mt-4" controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter a username"
        />
      </Form.Group>

      <Form.Group className="mb-3 mx-auto mt-4">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="8"
          placeholder="Enter a password"
        />
      </Form.Group>
      <Button className="mt-4" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
// LoginView.PropTypes = {
//   user: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//   }),
//   onLoggedIn: PropTypes.func.isRequired,
// };
const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (username, password) =>
    dispatch(handleSubmit(username, password)),
});

export default connect(null, mapDispatchToProps)(LoginView);
