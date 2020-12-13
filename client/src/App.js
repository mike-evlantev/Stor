import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Bag from "./components/pages/Bag.js";
import Footer from "./components/layout/Footer.js";
import Header from "./components/layout/Header.js";
import Home from "./components/pages/Home.js";
import PrivacyPolicy from "./components/pages/PrivacyPolicy.js";
import Product from "./components/pages/Product.js";
import Profile from "./components/pages/Profile.js";
import SignIn from "./components/pages/SignIn.js";
import TermsOfUse from "./components/pages/TermsOfUse.js";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={Home} exact />
          <Route path="/bag" component={Bag} />
          <Route path="/login" component={SignIn} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/product/:id" component={Product} />
          <Route path="/profile" component={Profile} />
          <Route path="/terms" component={TermsOfUse} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
