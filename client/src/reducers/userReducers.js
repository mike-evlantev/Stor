import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../constants/userConstants.js";

const initialRegisterState = {
  registerLoading: false,
  registerError: null,
  userToRegister: null,
};

const initialLoginState = {
  isAuthenticated: false,
  loginLoading: false,
  loginError: null,
  loggedInUser: null,
};

export const registerReducer = (state = initialRegisterState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, registerLoading: true };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerLoading: false,
        userToRegister: action.payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        registerLoading: false,
        registerError: action.payload,
      };
    default:
      return state;
  }
};

export const loginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loginLoading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loggedInUser: action.payload,
        isAuthenticated: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginLoading: false,
        loginError: action.payload,
        isAuthenticated: false,
      };
    case LOGOUT:
      return {
        ...state,
        loginLoading: false,
        loggedInUser: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
