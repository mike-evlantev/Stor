import React from "react";
import { Navbar, Nav, NavDropdown, Container, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout, reset } from "../../features/auth/authSlice";
import { useHistory } from "react-router-dom";
import { Fragment } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAppSelector } from "../../hooks/useAppSelector";

const Header = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { isAuthenticated, loggedInUser } = useAppSelector((state) => state.auth);
  const { bagItems } = useAppSelector((state) => state.bag);

  const handleRoute = (route) => {
    history.push(route);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    handleRoute("/");
  };

  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <i className="fas fa-burn text-primary"></i>&nbsp;&nbsp;Stor
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {isAuthenticated ? (
                <Fragment>
                  {loggedInUser.isAdmin && (
                    <LinkContainer to="/login">
                      <Nav.Link className="my-auto mr-2">Admin</Nav.Link>
                    </LinkContainer>
                  )}
                  <NavDropdown title="My Account" id="nav-my-account-dropdown">
                    <NavDropdown.Item onClick={() => handleRoute("/dashboard")}>
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleRoute("/profile")}>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleRoute("/wishlist")}>
                      Wish List
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Sign out
                    </NavDropdown.Item>
                  </NavDropdown>
                </Fragment>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="my-auto mr-2">Sign In</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
            </Form>
            <LinkContainer to="/bag">
              <Nav.Link>
                <span className="fa-layers fa-fw">
                  <i className="fas fa-shopping-bag fa-2x"></i>
                  {bagItems && bagItems.length > 0 && (
                    <span className="fa-layers-counter fa-4x fa-layers-top-right">
                      {bagItems.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </span>
              </Nav.Link>
            </LinkContainer>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
