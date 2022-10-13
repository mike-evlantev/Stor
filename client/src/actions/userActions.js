import axios from "axios";
import { setMessage } from "./messageActions.js";
import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL
} from "../constants/userConstants.js";

export const register = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users",
      { email, password },
      config
    );

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    });

    localStorage.setItem("loggedInUser", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setMessage(message, "danger"));
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: data,
    });

    localStorage.setItem("loggedInUser", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setMessage(message, "danger"));
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("loggedInUser");
  dispatch({ type: LOGOUT_USER });
};

export const updateUser = (userData) => async (dispatch, getState) => {
  try {
    const {
      auth: { loggedInUser },
    } = getState();
    const isLoggedInUser = loggedInUser._id === userData._id;
    if (!isLoggedInUser) throw new Error("Failed to update user profile");

    dispatch({ type: UPDATE_USER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    };

    const { data } = await axios.put("/api/users/update", userData, config);

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: { ...data, token: loggedInUser.token },
    });

    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ ...data, token: loggedInUser.token })
    );
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setMessage(message, "danger"));
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: message,
    });
    // Logging user out because something went wrong with using a protected route
    // TODO: There should be a better way to handle this
    dispatch(logout());
  }
};

export const updateCustomer = (customerData) => (dispatch) => {
  try {
    dispatch({ type: UPDATE_CUSTOMER_REQUEST });
    dispatch({
      type: UPDATE_CUSTOMER_SUCCESS,
      payload: customerData,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setMessage(message, "danger"));
    dispatch({
      type: UPDATE_CUSTOMER_FAIL,
      payload: message,
    });
  }  
};

export const updateCustomerError = (customerError) => (dispatch) => {
  try {
    dispatch({
      type: UPDATE_CUSTOMER_FAIL,
      payload: customerError,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(setMessage(message, "danger"));
    dispatch({
      type: UPDATE_CUSTOMER_FAIL,
      payload: message,
    });
  }  
};
