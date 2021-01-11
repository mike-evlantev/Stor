import { SET_MESSAGE, REMOVE_MESSAGE } from "../constants/messageConstants.js";

const initialState = [];

export const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MESSAGE:
      return [...state, payload];
    case REMOVE_MESSAGE:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};
