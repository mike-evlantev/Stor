import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers.js";
import { authReducer } from "./reducers/userReducers.js";
import { bagReducer } from "./reducers/bagReducers.js";
import { messageReducer } from "./reducers/messageReducers.js";
import { submitOrderReducer } from "./reducers/orderReducers.js";

const reducer = combineReducers({
  auth: authReducer,
  bag: bagReducer,
  messages: messageReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  submitOrder: submitOrderReducer,
});

const loggedInUserFromStorage = localStorage.getItem("loggedInUser")
  ? JSON.parse(localStorage.getItem("loggedInUser"))
  : null;

const bagItemsFromLocalStorage = localStorage.getItem("bagItems")
  ? JSON.parse(localStorage.getItem("bagItems"))
  : [];
const subtotal = bagItemsFromLocalStorage.reduce(
  (acc, item) => acc + item.qty * item.price,
  0
);

const calcTax = (subtotal) => subtotal * 0.0775; // CA tax rate

const shipping = 0;
const tax = calcTax(subtotal);
const total = subtotal + shipping + tax;

const initialState = {
  auth: {
    isAuthenticated: loggedInUserFromStorage?.token ? true : false,
    loggedInUser: loggedInUserFromStorage?.token
      ? loggedInUserFromStorage
      : null,
    loading: false,
    error: null,
    success: false,
  },
  bag: {
    bagItems: bagItemsFromLocalStorage,
    subtotal: subtotal,
    shipping: shipping,
    tax: tax,
    total: total,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
