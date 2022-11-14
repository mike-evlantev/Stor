import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";

interface Props {
    component: React.ComponentType<RouteProps>;
    [x: string]: any;
}

export const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
    const { isAuthenticated, loading } = useAppSelector(state => state.auth);
    return (
        <Route
            {...rest}
            render={(props) =>
                !isAuthenticated && !loading 
                    ? <Redirect to="/login" />
                    : <Component {...props} />
            }
        />
    );
}

export const AdminRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
    const { isAuthenticated, loading, loggedInUser } = useAppSelector(state => state.auth);
    return (
        <Route
            {...rest}
            render={(props) =>
                !isAuthenticated && !loading && !loggedInUser?.isAdmin
                    ? <Redirect to="/login" />
                    : <Component {...props} />
            }
        />
    );
}