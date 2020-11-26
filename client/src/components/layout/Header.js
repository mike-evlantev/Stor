import React from 'react';
import {useSelector} from 'react-redux';
import {Navbar, Nav, Container, Form} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Header = () => {
  const bag = useSelector(state => state.bag);
  const {bagItems} = bag;
  return (
    <header>
      <Navbar bg="light" variant='light' expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand><i className="fas fa-burn text-primary"></i>&nbsp;&nbsp;Stor</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to="/login">
                <Nav.Link className="my-auto mr-2">Sign In</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form inline>
              <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
            </Form>
            <LinkContainer to="/bag">
              <Nav.Link>
                <span className="fa-layers fa-fw">
                  <i className="fas fa-shopping-bag fa-2x"></i>
                  {bagItems && bagItems.length > 0 && (
                    <span className="fa-layers-counter fa-4x fa-layers-top-right">{bagItems.length}</span>
                  )}
                </span>
              </Nav.Link>
            </LinkContainer>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
