import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/layout/Footer.js";
import Header from "./components/layout/Header.js";
import { Routes } from "./components/routing/Routes.js";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Route component={Routes} />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
