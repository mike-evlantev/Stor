import * as React from "react";
import { Container } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import { Message } from "../layout/Message";
import { Bag } from "../pages/bag/Bag";
import { BillingInfoForm } from "../pages/checkout/BillingInfoForm";
import { Checkout } from "../pages/checkout/Checkout";
import { ReviewOrder } from "../pages/checkout/ReviewOrder";
import { ShippingInfoForm } from "../pages/checkout/ShippingInfoForm";
import { Confirmation } from "../pages/checkout/Confirmation";
import { Dashboard } from "../pages/Dashboard";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { Home } from "../pages/Home";
import { PageNotFound } from "../pages/PageNotFound";
import { PrivacyPolicy } from "../pages/PrivacyPolicy";
import { ProductDetails } from "../pages/products/ProductDetails";
import { Profile } from "../pages/Profile";
import { SignIn } from "../pages/SignIn";
import { TermsOfUse } from "../pages/TermsOfUse";
import { WishList } from "../pages/WishList";
import { AdminRoute, PrivateRoute } from "./PrivateRoute";
import { ReturnPolicy } from "../pages/ReturnPolicy";
import { Orders } from "../pages/admin/Orders";
import { Products } from "../pages/admin/Products";
import { Users } from "../pages/admin/Users";
import { OrderDetails } from "../pages/admin/OrderDetails";
import { EditProductDetails } from "../pages/admin/EditProductDetails";

export const Routes: React.FC = () => {
    return (
        <Container>      
            <Message />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/bag" component={Bag} />
                <Route
                    exact
                    path="/checkout1"
                    render={() => <Checkout><ShippingInfoForm /></Checkout>}
                />
                <Route
                    exact
                    path="/checkout2"
                    render={() => <Checkout><BillingInfoForm /></Checkout>}
                />
                <Route
                    exact
                    path="/checkout3"
                    component={() => <Checkout><ReviewOrder /></Checkout>}
                />
                <Route
                    exact
                    path="/confirmation"
                    render={() => <Confirmation />}
                />
                <Route exact path="/login" component={SignIn} />
                <Route exact path="/privacy" component={PrivacyPolicy} />
                <Route exact path="/products/:id" component={ProductDetails} />
                <Route path="/terms" component={TermsOfUse} />
                <Route path="/returns" component={ReturnPolicy} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <PrivateRoute exact path="/wishlist" component={WishList} />
                <AdminRoute 
                    exact 
                    path="/admin/orders" 
                    component={() => <AdminDashboard><Orders /></AdminDashboard>} />
                <AdminRoute 
                    exact 
                    path="/admin/orders/:id" 
                    component={() => <AdminDashboard><OrderDetails /></AdminDashboard>} />
                <AdminRoute 
                    exact 
                    path="/admin/products" 
                    component={() => <AdminDashboard><Products /></AdminDashboard>} />
                <AdminRoute 
                    exact 
                    path="/admin/products/:id" 
                    component={() => <AdminDashboard><EditProductDetails /></AdminDashboard>} />
                <AdminRoute 
                    exact 
                    path="/admin/users" 
                    component={() => <AdminDashboard><Users /></AdminDashboard>} />
                <Route path="*" component={PageNotFound} />
            </Switch>
        </Container>
    );
};