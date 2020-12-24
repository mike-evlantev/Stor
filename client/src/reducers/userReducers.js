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
  GET_PROFILE_SUCCESS,
  GET_PROFILE_REQUEST,
  GET_PROFILE_FAIL,
  CLEAR_PROFILE,
  UPDATE_CURRENT_USER,
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

const initialProfileState = {
  userProfile: {},
  getProfileLoading: false,
  getProfileError: null,
};

const initialUpdateProfileState = {
  updateProfileLoading: false,
  updateProfileError: null,
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

export const getProfileReducer = (state = initialProfileState, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return { ...state, getProfileLoading: true };
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        getProfileLoading: false,
        userProfile: action.payload,
      };
    case GET_PROFILE_FAIL:
      return {
        ...state,
        getProfileLoading: false,
        getProfileError: action.payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        userProfile: {},
      };
    default:
      return state;
  }
};

export const updateProfileReducer = (
  state = initialUpdateProfileState,
  action
) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { ...state, updateProfileLoading: true };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileSuccess: true,
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileSuccess: false,
        updateProfileError: action.payload,
      };
    default:
      return state;
  }
};

export const updateCurrentUserReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};
