import axios from "axios";
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  CLEAR_PROFILE,
} from "../constants/userConstants.js";

export const register = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
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
      type: REGISTER_SUCCESS,
      payload: data,
    });

    // also log in user on registration
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });

    // update profile with logged in user
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    });

    localStorage.setItem("loggedInUser", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
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
      type: LOGIN_SUCCESS,
      payload: data,
    });

    // update profile with logged in user
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    });

    localStorage.setItem("loggedInUser", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("loggedInUser");
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};

export const getProfile = (id) => async (dispatch, getState) => {
  try {
    const {
      auth: { loggedInUser },
    } = getState();
    const isLoggedInUser = loggedInUser._id === id;
    if (!isLoggedInUser) throw new Error("Failed to get user profile");

    dispatch({ type: GET_PROFILE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    };

    const { data } = await axios.get("/api/users/profile", config);

    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProfile = (userProfile) => async (dispatch, getState) => {
  try {
    const {
      auth: { loggedInUser },
    } = getState();
    const isLoggedInUser = loggedInUser._id === userProfile._id;
    if (!isLoggedInUser) throw new Error("Failed to update user profile");

    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    };

    const { data } = await axios.put("/api/users/profile", userProfile, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    // update profile as well
    dispatch({
      type: GET_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
