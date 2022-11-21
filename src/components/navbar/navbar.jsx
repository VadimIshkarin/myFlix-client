import React from "react";
// import { Menu } from "react-bootstrap";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./navbar.scss";

export function Menu({ user }) {
  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar className="main-nav" expand="lg">
      <Navbar.Brand className="text-light">MyFlixDB</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {isAuth() && (
            <Link className="nav-link mr-2" to="/">
              Home
            </Link>
          )}
          {isAuth() && (
            <Link className="nav-link mr-2" to={`/users/${user}`}>
              Profile
            </Link>
          )}

          {isAuth() && (
            <Link to="/">
              <Button variant="danger" onClick={onLoggedOut}>
                Logout
              </Button>
            </Link>
          )}
          {!isAuth() && <Nav.Link href="/">Sign-in</Nav.Link>}
          {!isAuth() && <Nav.Link href="/register">Sign-up</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
