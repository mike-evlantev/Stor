import axios from "axios";
import { IOrder } from "../../types/IOrder";
import { loggedInUserFromStorage, setAuthToken } from "../../utils/authUtils";

const API_URL = "/api/orders/";

// Get orders
const getOrders = async (): Promise<IOrder[]> => {
    setAuthToken(loggedInUserFromStorage?.token);

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };
  
    const { data } = await axios.get(API_URL, config);
    return data;
}

export const adminService = {
    getOrders
}