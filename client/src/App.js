import React, { Fragment } from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';

const App = () => {
  return (
    <Fragment>
      <Header />
      <main className="py-3">
        <Container>
          <Home />
        </Container>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
