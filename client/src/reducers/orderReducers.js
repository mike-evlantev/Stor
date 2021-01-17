import {
  ORDER_SUBMIT_REQUEST,
  ORDER_SUBMIT_SUCCESS,
  ORDER_SUBMIT_FAIL,
} from "../constants/orderConstants.js";

const initialState = {
  loading: false,
  success: false,
  error: null,
  order: null,
};

export const submitOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_SUBMIT_REQUEST:
      return { ...state, loading: true };
    case ORDER_SUBMIT_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        error: null,
        order: action.payload,
      };
    case ORDER_SUBMIT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
