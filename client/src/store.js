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
import { orderReducer } from "./reducers/orderReducers.js";
//import { shippingOptionsReducer } from "./reducers/shippingOptionsReducers.js";

const reducer = combineReducers({
  auth: authReducer,
  bag: bagReducer,
  messages: messageReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  shippingOptions: (state = {}) => state,
  order: orderReducer,
});

const shippingOptions = [
  {
    id: 1,
    icon: "fas fa-truck fa-3x",
    name: "Standard Shipping",
    timeframe: "4-5 business days",
    cost: 0,
  },
  {
    id: 2,
    icon: "fas fa-shipping-fast fa-3x",
    name: "Express Shipping",
    timeframe: "2-4 business days",
    cost: 20,
  },
  {
    id: 3,
    icon: "fas fa-plane fa-3x",
    name: "Priority Shipping",
    timeframe: "2-3 business days",
    cost: 30,
  },
];

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

const shipping = shippingOptions[0].cost;
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
    shipping: shippingOptions[0],
    tax: tax,
    total: total,
  },
  shippingOptions,
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
