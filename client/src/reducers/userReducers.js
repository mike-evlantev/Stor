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
  UPDATE_CUSTOMER_FAIL,
} from "../constants/userConstants.js";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

export const authReducer = (state = initialState, action) => {
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

const customerInitialState = {
  loading: false,
  success: false,
  errors: {
    first: "", 
    last: "", 
    shippingAddress: {address1: "", address2: "", city: "", state: "", zip: ""}, 
    billingAddress: {address1: "", address2: "", city: "", state: "", zip: ""},
    email: "", 
    phone: ""},
  first: "",
  last: "",
  shippingAddress: {address1: "", address2: "", city: "", state: "", zip: ""},
  billingAddress: {address1: "", address2: "", city: "", state: "", zip: ""},
  phone: "",
  email: "",
  card: {
    number: {elementType: "cardNumber", brand: "unknown", empty: true, complete: false, error: undefined}, 
    expiry: {elementType: "cardExpiry", empty: true, complete: false, error: undefined}, 
    cvc: {elementType: "cardCvc", empty: true, complete: false, error: undefined},
    nameOnCard: ""
  }
}

export const customerReducer = (state = customerInitialState, action) => {
  switch (action.type) {
    case UPDATE_CUSTOMER_REQUEST:
      return { ...state, loading: true };
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        success: true,
      };
    case UPDATE_CUSTOMER_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        success: false
      };
    default:
      return state;
  }
};
