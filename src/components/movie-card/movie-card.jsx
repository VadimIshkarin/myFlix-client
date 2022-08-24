import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  addMovie(movie, user) {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log(movie);
    console.log(token);

    axios
      .post(
        `https://movieapishelf.herokuapp.com/users/${username}/movies/${movie._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        this.setState({
          user: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    const { movie } = this.props;

    return (
      <Card className="movie-card">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className="description">{movie.Description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Link to={`/movies/${movie._id}`}>
            <Button className="open" variant="button">
              Open
            </Button>
          </Link>
        </Card.Footer>
      </Card>
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
  onMovieClick: PropTypes.func.isRequired,
};
