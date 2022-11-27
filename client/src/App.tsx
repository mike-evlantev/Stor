import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { Header } from "./components/layout/Header";
import { Routes } from "./components/routing/Routes";
import { Loader } from "./components/shared/Loader";

export const App: React.FC = () => {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setLoading(false);
    }, []);

    return (<>
        {loading
            ? <Loader />
            : <Router>
                <Header />
                <main className="py-3">
                    <Route component={Routes} />
                </main>
                <Footer />
            </Router>}
    </>);
};