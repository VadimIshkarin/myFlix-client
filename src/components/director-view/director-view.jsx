import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

// Import React Bootstrap Components
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

// Import custom SCSS
import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container>
        <Card className="dir-view">
          <Card.Header className="dir-view-header">Director</Card.Header>
          <Card.Body className="dir-view-title">{director.Name}</Card.Body>
          <Card.Body>Birthday: {director.Birthday}</Card.Body>
          <Card.Body>{director.Bio}</Card.Body>
          <Card.Footer>
            <Button
              className="dir-view-button"
              onClick={() => {
                onBackClick();
              }}
            >
              Back
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    );
  }
}

DirectorView.proptypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string,
    Birthday: PropTypes.number,
  }).isRequired,
};
