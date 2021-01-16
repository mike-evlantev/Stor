import axios from "axios";
import {
  BAG_ADD_ITEM,
  BAG_REMOVE_ITEM,
  UPDATE_SHIPPING,
  BAG_ERROR,
  CLEAR_BAG,
} from "../constants/bagConstants.js";
import { setMessage } from "./messageActions.js";

export const addToBag = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: BAG_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        qty,
      },
    });

    localStorage.setItem("bagItems", JSON.stringify(getState().bag.bagItems));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setMessage(message, "danger"));
    dispatch({
      type: BAG_ERROR,
      payload: message,
    });
  }
};

export const removeFromBag = (id) => async (dispatch, getState) => {
  dispatch({
    type: BAG_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("bagItems", JSON.stringify(getState().bag.bagItems));
};

export const updateShipping = (shippingOption) => async (dispatch) => {
  dispatch({
    type: UPDATE_SHIPPING,
    payload: shippingOption,
  });
};

export const clearBag = () => async (dispatch) => {
  localStorage.removeItem("bagItems");
  dispatch({ type: CLEAR_BAG });
};
