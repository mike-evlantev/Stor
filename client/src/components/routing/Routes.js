import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import Message from "../layout/Message";
import Bag from "../pages/Bag";
import Home from "../pages/Home";
import { PrivacyPolicy } from "../pages/PrivacyPolicy.tsx";
import { Profile } from "../pages/Profile.tsx";
import { SignIn } from "../pages/SignIn.tsx";
import { TermsOfUse } from "../pages/TermsOfUse.tsx";
import Product from "../pages/Product";
import { PrivateRoute } from "./PrivateRoute";
import { Dashboard } from "../pages/Dashboard.tsx";
import { WishList } from "../pages/WishList.tsx";
import Order from "../Order";
import { PageNotFound } from "../pages/PageNotFound.tsx"

export const Routes = () => {
  return (
    <Container>      
      <Message />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/bag" component={Bag} />
        <Route
          exact
          path="/checkout"
          render={(props) => <Order {...props} orderStage={"checkout"} />}
        />
        <Route
          exact
          path="/confirmation"
          render={(props) => <Order {...props} orderStage={"confirmation"} />}
        />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/privacy" component={PrivacyPolicy} />
        <Route exact path="/product/:id" component={Product} />
        <Route path="/terms" component={TermsOfUse} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/wishlist" component={WishList} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Container>
  );
};
