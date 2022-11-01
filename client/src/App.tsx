import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Routes } from "./components/routing/Routes";

export const App: React.FC = () => {
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