import axios from "axios";
import { IOrder } from "../../types/IOrder";

const API_URL = "/api/orders/";

// Submit order
const submit = async (orderData: IOrder) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const response = await axios
        .post(API_URL, orderData, config)
        .then(response => response.data)
        .catch((error) => {
            console.error(error);
        });
    return response;
}

export const orderService = {
    submit
}