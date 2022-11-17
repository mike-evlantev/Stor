import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { IOrder } from "../../types/IOrder";
import { IProduct } from "../../types/IProduct";
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
    
        const response = await axios
            .get(API_URL, config)
            .then(response => response.data)
            .catch((error) => {
                console.error(error);
                if (error.response.status === 401 || error.response.status === 403) {
                    dispatch(logout());
                }
            });
        return response;
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

        const response = await axios
            .post("/api/products/create", product, config)
            .then(response => response.data)
            .catch((error) => {
                console.error(error);
                if (error.response.status === 401 || error.response.status === 403) {
                    dispatch(logout());
                }
            });
        return response;
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

        const response = await axios
            .put("/api/products/update", product, config)
            .then(response => response.data)
            .catch((error) => {
                console.error(error);
                if (error.response.status === 401 || error.response.status === 403) {
                    dispatch(logout());
                }
            });
        return response;
    } catch (error) {
        const message = narrowError(error);
        dispatch(alert({text: message, type: "danger"}));
    }        
};

export const adminService = {
    getOrders,
    createProduct,
    updateProduct
}