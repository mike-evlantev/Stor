import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../constants/userConstants.js";

const initialState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  loggedInUser: null,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedInUser: action.payload,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        loggedInUser: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
