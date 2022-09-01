import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { Menu } from "../navbar/navbar";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { Row, Col, Container } from "react-bootstrap";

import "./main-view.scss";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
      favoriteMovies: [],
    };
  }

  getMovies(token) {
    axios
      .get("https://movieapishelf.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  handleFavorite = (movieId, action) => {
    const { user, favoriteMovies } = this.state;
    const accessToken = localStorage.getItem("token");
    if (accessToken !== null && user !== null) {
      // Add MovieID to Favorites
      if (action === "add") {
        this.setState({ favoriteMovies: [...favoriteMovies, movieId] });
        axios
          .post(
            `https://movieapishelf.herokuapp.com/users/${user}/movies/${movieId}`,
            {},
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          )
          .then((res) => {
            console.log(`Movie added to ${user} favorite movies`);
          })
          .catch((err) => {
            console.log(err);
          });

        // Remove MovieID from Favorites
      } else if (action === "remove") {
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
  /* When a user successfully logs in, this function updates the `user`
  property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }
  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  render() {
    const { movies, user, favoriteMovies } = this.state;

    return (
      <Router>
        <Menu user={user} />
        <Container fluid>
          <Row className="main-view-width mx-auto justify-content-md-center mt-3">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return movies.map((m) => (
                  <MovieCard key={m._id} movie={m}>
                    {m.title}
                  </MovieCard>
                ));
              }}
            />

            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col lg={8} md={8}>
                    <RegistrationView />
                  </Col>
                );
              }}
            />

            <Route
              path={`/users/${user}`}
              render={({ history }) => {
                if (!user) return <Redirect to="/" />;
                return (
                  <Col>
                    <ProfileView
                      movies={movies}
                      onBackClick={history.goBack}
                      favoriteMovies={favoriteMovies}
                      handleFavorite={this.handleFavorite}
                    />
                  </Col>
                );
              }}
            />

            {/* <Route
              path={`/profile-view/${user}`}
              render={({ history }) => {
                if (!user) return <Redirect to="/" />;
                return (
                  <Col>
                    <EditUser
                      user={user}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            /> */}

            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    isFavorite={favoriteMovies.includes(match.params.movieId)}
                    onBackClick={history.goBack}
                    handleFavorite={this.handleFavorite}
                  />
                );
              }}
            />

            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(
                          (m) => m.Director.Name === match.params.name
                        ).Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birthday: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
