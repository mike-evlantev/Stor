import axios from "axios";
import {
  BAG_ADD_ITEM,
  BAG_REMOVE_ITEM,
  UPDATE_SHIPPING,
} from "../constants/bagConstants.js";

export const addToBag = (id, qty) => async (dispatch, getState) => {
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
};

export const removeFromBag = (id) => async (dispatch, getState) => {
  dispatch({
    type: BAG_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("bagItems", JSON.stringify(getState().bag.bagItems));
};

export const updateShipping = (shippingCost) => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_SHIPPING,
    payload: shippingCost,
  });
};
