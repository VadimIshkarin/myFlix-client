import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

function UpdateUser(props) {
  const { handleDelete, user } = props;
  let token = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [values, setValues] = useState({
    usernameErr: "",
    passwordErr: "",
    emailErr: "",
  });

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: "Username required" });
      isReq = false;
    } else if (username.length < 5) {
      setValues({
        ...values,
        usernameErr: "Username must be at least 5 characters long",
      });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: "Password required" });
      isReq = false;
    } else if (password.length < 6) {
      setValues({
        ...values,
        passwordErr: "Password must be at least 6 characters long",
      });
      isReq = false;
    }
    if (!email) {
      setValues({ ...values, emailErr: "Email required" });
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setValues({ ...values, emailErr: "Enter valid email" });
      isReq = false;
    }
    return isReq;
  };

  // Update Profile
  const handleUpdate = () => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .put(
          `https://movieapishelf.herokuapp.com/users/${user}`,
          {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          alert("Your profile has been updated");
          localStorage.setItem("user", response.data.Username),
            console.log(response.data);
          window.open("/", "_self");
        })
        .catch((e) => {
          console.log("Error");
        });
    }
  };

  return (
    <Form className="profile-form">
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          defaultValue={user.Username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter a username"
        />
        {values.usernameErr && <p>{values.usernameErr}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value="*******"
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="6"
          placeholder="Your password must be 6 or more characters"
        />
        {values.passwordErr && <p>{values.passwordErr}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          defaultValue={user.Email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email address"
        />
        {values.emailErr && <p>{values.emailErr}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          defaultValue={user.Birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleUpdate}>
        Update profile
      </Button>
      <Button className="d-block mt-2" variant="danger" onClick={handleDelete}>
        Delete profile
      </Button>
    </Form>
  );
}

export default UpdateUser;
