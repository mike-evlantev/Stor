import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/layout/Header.js";
import Footer from "./components/layout/Footer.js";
import Home from "./components/pages/Home.js";
import Product from "./components/pages/Product.js";
import Bag from "./components/pages/Bag.js";
import SignIn from "./components/pages/SignIn.js";
import PrivacyPolicy from "./components/pages/PrivacyPolicy.js";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={Home} exact />
          <Route path="/product/:id" component={Product} />
          <Route path="/bag" component={Bag} />
          <Route path="/login" component={SignIn} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
