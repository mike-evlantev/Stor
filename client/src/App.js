import React from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";

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
  const authState = useSelector((state) => state.auth);
  const { isAuthenticated } = authState;

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
          <Route
            path="/profile"
            render={(props) =>
              !isAuthenticated ? (
                <Redirect to="/login" />
              ) : (
                <Profile {...props} />
              )
            }
          />
          <Route path="/terms" component={TermsOfUse} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
