import React from "react";
// import { Menu } from "react-bootstrap";
import { Menu, Navbar, Nav, Button } from "react-router-dom";

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
          {isAuth() && <Nav.Link href="/">Home</Nav.Link>}
          {isAuth() && <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}

          {isAuth() && (
            <Button variant="danger" onClick={onLoggedOut}>
              Logout
            </Button>
          )}
          {!isAuth() && <Nav.Link href="/">Sign-in</Nav.Link>}
          {!isAuth() && <Nav.Link href="/register">Sign-up</Nav.Link>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
