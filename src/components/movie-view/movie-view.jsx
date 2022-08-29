import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import "./movie-view.scss";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick, isFavorite, handleFavorite } = this.props;

    if (!movie) return <div></div>;
    return (
      <Col
        className="container p-3 justify-content-center"
        md={9}
        lg={7}
        xl={6}
      >
        <Row className="justify-content-start">
          <Col sm={6}>
            <img
              crossOrigin="anonymous"
              className="img"
              src={movie.ImagePath}
              alt=" Movie Image"
            />
          </Col>
          <Col sm={6}>
            <div className="mt-2">
              <div className="title">{movie.Title} </div>

              <div className="mt-3">
                <span className="fw-bold">Genre: </span>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="outline-dark">{movie.Genre.Name} </Button>
                </Link>
              </div>

              <div className="mt-2">
                <span className="fw-bold">Director: </span>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="outline-dark">{movie.Director.Name}</Button>
                </Link>
              </div>

              <div className="mt-2">
                <span className="fw-bold">Overview</span>
                <span className="value">: {movie.Description}</span>
              </div>

              <Button
                className="my-4"
                variant="warning"
                onClick={() => {
                  onBackClick(null);
                }}
              >
                « Back
              </Button>
              {!isFavorite ? (
                <Button
                  className="my-4 ml-2"
                  variant="outline-primary"
                  onClick={() => handleFavorite(movie._id, "add")}
                >
                  Add to favorite movies
                </Button>
              ) : (
                <div>My favorite movie</div>
              )}
            </div>
          </Col>
        </Row>
      </Col>
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
