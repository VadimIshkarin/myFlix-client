import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import "./registration-view.scss";

export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [values, setValues] = useState({
    usernameErr: "",
    passwordErr: "",
    emailErr: "",
  });

  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: "Username Required" });
      isReq = false;
    } else if (username.length < 5) {
      setValues({
        ...values,
        usernameErr: "Username must be 5 characters long",
      });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: "Password Required" });
      isReq = false;
    } else if (password.length < 6) {
      setValues({
        ...values,
        passwordErr: "Password must be 6 characters long",
      });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: "Email Required" });
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setValues({ ...values, emailErr: "Email is invalid" });
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post("https://movieapishelf.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration successful, please login!");
          window.open("/", "_self");
        })
        .catch((response) => {
          console.error(response);
          alert("unable to register");
        });
    }
  };

  return (
    <Form>
      <h2 className="mb-3 mx-auto mt-5">Registration</h2>

      <Form.Group className="mb-3 mx-auto mt-4" controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username must be at least 5 characters long"
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
          placeholder="Password must be at least 8 characters"
        />
      </Form.Group>

      <Form.Group className="mb-3 mx-auto mt-4">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
        />
      </Form.Group>

      <Form.Group className="mb-3 mx-auto mt-4">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>

      <Button className="mt-4" type="submit" onClick={handleSubmit}>
        Register
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
  }),
};
