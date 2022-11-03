import * as React from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import { Message } from "../layout/Message";
import Order from "../Order";
import Bag from "../pages/Bag";
import { BillingInfoForm } from "../pages/Checkout/BillingInfoForm";
import { Checkout } from "../pages/Checkout/Checkout";
import { ReviewOrder } from "../pages/Checkout/ReviewOrder";
import { ShippingInfoForm } from "../pages/Checkout/ShippingInfoForm";
import { Dashboard } from "../pages/Dashboard";
import Home from "../pages/Home";
import { PageNotFound } from "../pages/PageNotFound";
import { PrivacyPolicy } from "../pages/PrivacyPolicy";
import { ProductDetails } from "../pages/Products/ProductDetails";
import { Profile } from "../pages/Profile";
import { SignIn } from "../pages/SignIn";
import { TermsOfUse } from "../pages/TermsOfUse";
import { WishList } from "../pages/WishList";
import { PrivateRoute } from "./PrivateRoute";

export const Routes: React.FC = () => {
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
                    path="/checkout1"
                    render={(props) => <Checkout><ShippingInfoForm /></Checkout>}
                />
                <Route
                    exact
                    path="/checkout2"
                    render={(props) => <Checkout><BillingInfoForm /></Checkout>}
                />
                <Route
                    exact
                    path="/checkout3"
                    render={(props) => <ReviewOrder />}
                />
                <Route
                    exact
                    path="/confirmation"
                    render={(props) => <Order {...props} orderStage={"confirmation"} />}
                />
                <Route exact path="/login" component={SignIn} />
                <Route exact path="/privacy" component={PrivacyPolicy} />
                <Route exact path="/product/:id" component={ProductDetails} />
                <Route path="/terms" component={TermsOfUse} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/wishlist" component={WishList} />
                <Route path="*" component={PageNotFound} />
            </Switch>
        </Container>
    );
};