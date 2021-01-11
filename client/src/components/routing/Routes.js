import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Message from "../layout/Message";
import Bag from "../pages/Bag";
import Checkout from "../pages/Checkout";
import Home from "../pages/Home";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import Profile from "../pages/Profile";
import SignIn from "../pages/SignIn";
import TermsOfUse from "../pages/TermsOfUse";
import Product from "../pages/Product";
import { PrivateRoute } from "./PrivateRoute";

export const Routes = () => {
  return (
    <Container>
      <Message />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/bag" component={Bag} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/privacy" component={PrivacyPolicy} />
        <Route exact path="/product/:id" component={Product} />
        <Route path="/terms" component={TermsOfUse} />
        <PrivateRoute exact path="/profile" component={Profile} />
      </Switch>
    </Container>
  );
};
