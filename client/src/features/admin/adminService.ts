import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { IOrder } from "../../types/IOrder";
import { IProduct } from "../../types/IProduct";
import { IUser } from "../../types/IUser";
import { loggedInUserFromStorage, setAuthToken } from "../../utils/authUtils";
import { narrowError } from "../../utils/errorUtils";
import { logout } from "../auth/authSlice";
import { alert } from "../messages/messagesSlice";

const API_URL = "/api/orders/";

// Get orders
const getOrders = async (dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Promise<IOrder[] | undefined> => {
    try {
        setAuthToken(loggedInUserFromStorage()?.token);

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
    
        const data = await axios
            .get(API_URL, config)
            .then(response => response.data)
            .catch((error) => {
                console.error(error);
                if (error.response.status === 401 || error.response.status === 403) {
                    dispatch(logout());
                }
            });
        return data;
    } catch (error) {
        const message = narrowError(error);
        dispatch(alert({text: message, type: "danger"}));
    }   
}

// Create product
const createProduct = async (product: IProduct, dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Promise<IProduct | undefined> => {
    try {
        setAuthToken(loggedInUserFromStorage()?.token);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const data = await axios
            .post("/api/products/create", product, config)
            .then(response => response.data)
            .catch((error) => {
                console.error(error);
                if (error.response.status === 401 || error.response.status === 403) {
                    dispatch(logout());
                }
            });
        return data;
    } catch (error) {
        const message = narrowError(error);
        dispatch(alert({text: message, type: "danger"}));
    }        
};

// Update product
const updateProduct = async (product: IProduct, dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Promise<IProduct | undefined> => {
    try {
        setAuthToken(loggedInUserFromStorage()?.token);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const data = await axios
            .put("/api/products/update", product, config)
            .then(response => response.data)
            .catch((error) => {
                console.error(error);
                if (error.response.status === 401 || error.response.status === 403) {
                    dispatch(logout());
                }
            });
        return data;
    } catch (error) {
        const message = narrowError(error);
        dispatch(alert({text: message, type: "danger"}));
    }        
};

// Get all users
const getUsers = async (dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => {
    try {
        setAuthToken(loggedInUserFromStorage()?.token);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const data = await axios
            .get("/api/users", config)
            .then(response => response.data)
            .catch((error) => {
                console.error(error);
                if (error.response.status === 401 || error.response.status === 403) {
                    dispatch(logout());
                }
            });

        return data;
    } catch (error) {
        const message = narrowError(error);
        dispatch(alert({text: message, type: "danger"}));
    }
}

// Get user by id
const getUser = async (id: string, dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => {
    try {
        setAuthToken(loggedInUserFromStorage()?.token);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
    
        const data = await axios
            .get("/api/users/" + id, config)
            .then(response => response.data)
            .catch((error) => {
                console.error(error);
                if (error.response.status === 401 || error.response.status === 403) {
                    dispatch(logout());
                }
            });

        return data;
    } catch (error) {
        const message = narrowError(error);
        dispatch(alert({text: message, type: "danger"}));
    }
}

// Create user
const createUser = async (user: IUser, dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Promise<IUser | undefined> => {
    try {
        setAuthToken(loggedInUserFromStorage()?.token);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const data = await axios
            .post("/api/users/create", user, config)
            .then(response => response.data)
            .catch((error) => {
                console.error(error);
                if (error.response.status === 401 || error.response.status === 403) {
                    dispatch(logout());
                }
            });
        return data;
    } catch (error) {
        const message = narrowError(error);
        dispatch(alert({text: message, type: "danger"}));
    }        
};

// Update user
const updateUser = async (user: IUser, dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Promise<IUser | undefined> => {
    try {
        setAuthToken(loggedInUserFromStorage()?.token);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const data = await axios
            .put("/api/users/update", user, config)
            .then(response => response.data)
            .catch((error) => {
                console.error(error);
                if (error.response.status === 401 || error.response.status === 403) {
                    dispatch(logout());
                }
            });
        return data;
    } catch (error) {
        const message = narrowError(error);
        dispatch(alert({text: message, type: "danger"}));
    }        
};

export const adminService = {
    getOrders,
    createProduct,
    updateProduct,
    getUsers,
    getUser,
    createUser,
    updateUser
}