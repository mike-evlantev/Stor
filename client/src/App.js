import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/layout/Header.js";
import { Footer } from "./components/layout/Footer.tsx"
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
