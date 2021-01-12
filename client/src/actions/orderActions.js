import axios from "axios";
import { setMessage } from "./messageActions.js";
import {
  ORDER_SUBMIT_REQUEST,
  ORDER_SUBMIT_SUCCESS,
  ORDER_SUBMIT_FAIL,
} from "../constants/orderConstants.js";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_SUBMIT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post("/api/orders", order, config);

    dispatch({
      type: ORDER_SUBMIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setMessage(message, "danger"));
    dispatch({
      type: ORDER_SUBMIT_FAIL,
      payload: message,
    });
  }
};
