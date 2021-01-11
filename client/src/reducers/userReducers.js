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
} from "../constants/userConstants.js";

const initialAuthState = {
  loading: false,
  error: null,
  success: false,
};

export const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedInUser: action.payload,
        isAuthenticated: true,
        success: true,
        error: null,
      };
    case REGISTER_USER_FAIL:
    case LOGIN_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        loading: false,
        loggedInUser: null,
        isAuthenticated: false,
        error: null,
      };
    default:
      return state;
  }
};
