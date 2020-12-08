import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container className="py-3">
        <hr />
        <Row className="d-flex justify-content-between px-5">
          <Col className="px-5">
            <Fragment>&copy; Stor {currentYear}</Fragment>
          </Col>
          <Col className="px-5 text-right">
            <Fragment>
              <Link to="/privacy">Privacy Policy</Link> |{" "}
              <Link to="/terms">Terms of Use</Link>
            </Fragment>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
