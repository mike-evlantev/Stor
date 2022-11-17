import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { IOrder } from "../../types/IOrder";
import { narrowError } from "../../utils/errorUtils";
import { alert } from "../messages/messagesSlice";

const API_URL = "/api/orders/";

// Submit order
const submit = async (orderData: IOrder, dispatch: ThunkDispatch<unknown, unknown, AnyAction>) => {
    try {
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
    } catch (error) {
        const message = narrowError(error);
        dispatch(alert({text: message, type: "danger"}));
    }
    
}

export const orderService = {
    submit
}