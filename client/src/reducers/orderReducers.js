import {
  ORDER_SUBMIT_REQUEST,
  ORDER_SUBMIT_SUCCESS,
  ORDER_SUBMIT_FAIL,
} from "../constants/orderConstants.js";

const initialOrderSubmitState = {
  orderSubmitLoading: false,
  orderSubmitSuccess: false,
  orderSubmitError: null,
};

export const submitOrderReducer = (state = initialOrderSubmitState, action) => {
  switch (action.type) {
    case ORDER_SUBMIT_REQUEST:
      return { ...state, orderSubmitLoading: true };
    case ORDER_SUBMIT_SUCCESS:
      return {
        ...state,
        orderSubmitLoading: false,
        orderSubmitSuccess: true,
      };
    case ORDER_SUBMIT_FAIL:
      return {
        ...state,
        orderSubmitLoading: false,
        orderSubmitError: action.payload,
      };
    default:
      return state;
  }
};
