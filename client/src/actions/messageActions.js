import { v4 as uuidv4 } from "uuid";
import { SET_MESSAGE, REMOVE_MESSAGE } from "../constants/messageConstants.js";

export const setMessage = (text, type, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_MESSAGE,
    payload: { id, type, text },
  });

  setTimeout(() => dispatch({ type: REMOVE_MESSAGE, payload: id }), timeout);
};
