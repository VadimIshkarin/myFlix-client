import React from "react";
import PropTypes from "prop-types";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./movie-view.scss";

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }
  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }
  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="movie-view">
        <Row>
          <Col className="movie-poster">
            <img src={movie.ImagePath} />
          </Col>
        </Row>
        <Row className="movie-title">
          <Col className="label">Title: </Col>
          <Col className="value">{movie.Title}</Col>
        </Row>
        <Row className="movie-description">
          <Col className="label">Description: </Col>
          <Col className="value">{movie.Description}</Col>
        </Row>
        <Row className="movie-genre">
          <Col className="label">Genre: </Col>
          <Col className="value">
            {movie.Genre.Name + " ~ " + movie.Genre.Description}
          </Col>
        </Row>
        <Row className="movie-director">
          <Col className="label">Director: </Col>
          <Col className="value">
            {movie.Director.Name + " ~ " + movie.Director.Bio}
          </Col>
        </Row>
        <Button
          className=""
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
        <Button
          className="button ml-2"
          onClick={() => {
            this.addMovie(movie, user);
          }}
        >
          Add to favorites
        </Button>
        <Button
          className="button ml-2"
          onClick={() => {
            this.delFavMovie(movie, user);
          }}
        >
          Remove from favorites
        </Button>
      </Container>
    );
  }
}

MovieView.propTypes = {
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
