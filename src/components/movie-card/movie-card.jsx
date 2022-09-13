import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

import { Link } from "react-router-dom";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <Card className="movie-card" style={{ width: "15rem", margin: "12px" }}>
        <Card.Body>
          <Link to={`/movies/${movie._id}`}>
            <Card.Img src={movie.ImagePath} style={{ height: "20rem" }} />
          </Link>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Genre.Name}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button className="button">Open</Button>
          </Link>
        </Card.Body>
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
