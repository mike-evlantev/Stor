import * as React from "react";
import { Redirect, Route, RouteProps, useHistory } from "react-router-dom";
import { authService } from "../../features/auth/authService";
import { useAppSelector } from "../../hooks/useAppSelector";
import { isExpired } from "../../utils/authUtils";

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

export const ProtectedRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
    const token = rest.computedMatch.params.token;
    const history = useHistory();
    const [decoded, setDecoded] = React.useState<any>({});
    const [tokenExpired, setTokenExpired] = React.useState(true);
    
    React.useEffect(() => {
        const decode = async () => {
            const response = await authService.decodeToken(token);
            if (response?.status === 200) {
                const {data} = await response;
                setDecoded(data);
                setTokenExpired(isExpired(data.exp));
            } else {
                const {status, statusText, data} = response;
                const {message, stack} = data;
                history.push("/error", {status, statusText, message, stack});
            }
        };

        decode();        
    }, [history, token]);

    return (
        <Route
            {...rest}
            render={(props) =>
                decoded || !tokenExpired
                    ? <Component {...props} />
                    : <Redirect to="/login" />
            }
        />
    );
}