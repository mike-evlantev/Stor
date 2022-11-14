import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { IOrder } from "../../types/IOrder";
import { loggedInUserFromStorage, setAuthToken } from "../../utils/authUtils";
import { logout } from "../auth/authSlice";

const API_URL = "/api/orders/";

// Get orders
const getOrders = async (dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Promise<IOrder[]> => {
    setAuthToken(loggedInUserFromStorage?.token);

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
  
    const response = await axios
        .get(API_URL, config)
        .then(response => response.data)
        .catch((error) => {
            if (error.response.status === 401 || error.response.status === 403) {
                console.error(error);
                dispatch(logout());
            }
        });
    return response;
}

export const adminService = {
    getOrders
}