import * as React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();
    return (
      <footer>
        <Container className="py-3">
          <hr />
          <div className="d-flex px-5">
            <div>&copy; Stor {currentYear}</div>
            <div className="ms-auto">
              <Link to="/privacy">Privacy Policy</Link> |{" "}
              <Link to="/terms">Terms of Use</Link>
            </div>
          </div>
        </Container>
      </footer>
    );
  };