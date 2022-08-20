import axios from "axios";
import { setMessage } from "./messageActions.js";
import {
  PROCESS_PAYMENT_REQUEST,
  PROCESS_PAYMENT_SUCCESS,
  PROCESS_PAYMENT_FAIL,
} from "../constants/paymentConstants.js";

export const processPayment = (payload) => async (dispatch) => {
  try {
    dispatch({ type: PROCESS_PAYMENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/payment", payload, config);

    dispatch({
      type: PROCESS_PAYMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setMessage(message, "danger"));
    dispatch({
      type: PROCESS_PAYMENT_FAIL,
      payload: message,
    });
  }
};
