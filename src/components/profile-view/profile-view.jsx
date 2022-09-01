import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import "./profile-view.scss";

import { MovieCard } from "../movie-card/movie-card";

import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  getUser(token) {
    const username = localStorage.getItem("user");
    axios
      .get(`https://movieapishelf.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://movieapishelf.herokuapp.com/users/${username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem("user", this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert("Your profile has been updated");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleFavorite = (movieId, action) => {
    const { user, favoriteMovies } = this.state;
    const accessToken = localStorage.getItem("token");
    if (accessToken !== null && user !== null) {
      // Add MovieID to Favorites

      if (action === "remove") {
        this.setState({
          favoriteMovies: favoriteMovies.filter((id) => id !== movieId),
        });
        axios
          .delete(
            `https://movieapishelf.herokuapp.com/users/${user}/movies/${movieId}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie removed from ${user} favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };
  // Delete A User
  onDeleteUser() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    axios
      .delete(`https://movieapishelf.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("The account was successfully deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }

  render() {
    const { onBackClick, movies, handleFavorite } = this.props;

    const FavoriteMovies = movies.filter((m) => {
      return this.state.FavoriteMovies.includes(m._id);
    });

    return (
      <Container className="profile-view">
        <div className="top-elements d-flex flex-row justify-content-end align-items-baseline">
          <Button
            className="backProfileButton"
            variant="danger"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </div>

        <Row>
          <Col>
            <Card className="your-profile">
              <Card.Body>
                <Card.Title>
                  <span className="card-title">YOUR ACCOUNT</span>
                </Card.Title>
                <Card.Text>
                  <div>
                    <span className="username">Username: </span>
                    <span className="value">{this.state.Username}</span>
                  </div>
                </Card.Text>
                <Card.Text>
                  <div>
                    <span className="email">Email: </span>
                    <span className="value">{this.state.Email}</span>
                  </div>
                </Card.Text>
                <Card.Text>
                  <div>
                    <span className="birthday">Birthday: </span>
                    <span className="value">{this.state.Birthday}</span>
                  </div>
                </Card.Text>
                <div className="delete-profile-button">
                  <Button variant="danger" onClick={() => this.onDeleteUser()}>
                    Delete this account
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* UPDATE ACCOUNT */}

        <Row>
          <Col>
            <Card className="update-profile">
              <Card.Body>
                <Card.Title className="text-center">
                  {" "}
                  <span className="update-title">
                    UPDATE YOUR ACCOUNT DETAILS
                  </span>{" "}
                </Card.Title>
                <Form
                  className="formDisplay"
                  onSubmit={(e) => this.editUser(e)}
                >
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username:"
                      placeholder="New Username must be at least 5 characters long"
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password:"
                      placeholder="New Password must be at least 8 characters"
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email:"
                      placeholder="New Email"
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type="date"
                      name="Birthday:"
                      onChange={(e) => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>

                  <div className="update-profile-button">
                    <Button variant="danger" type="submit">
                      Update
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* FAVORITE MOVIES */}

        <div>
          <h3 className="favorite-Movies-title">My Favorite Movies:</h3>
        </div>

        <Row className="favoriteMovie-col">
          {FavoriteMovies.map((movie) => (
            <Col sm={6} md={4} lg={4} key={movie._id}>
              <div className="favoriteMoviediv">
                <MovieCard movie={movie} />

                <Button
                  className="my-4 ml-2"
                  variant="danger"
                  onClick={() => handleFavorite(movie._id, "remove")}
                >
                  Remove
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
};
