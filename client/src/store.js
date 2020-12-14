import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers.js";
import { bagReducer } from "./reducers/bagReducers.js";
import {
  getProfileReducer,
  loginReducer,
  registerReducer,
  updateProfileReducer,
} from "./reducers/userReducers.js";

const reducer = combineReducers({
  auth: loginReducer,
  bag: bagReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  register: registerReducer,
  getProfile: getProfileReducer,
  updateProfile: updateProfileReducer,
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
const shipping = 0;
const tax = 0;
const total = subtotal + shipping + tax;

const initialState = {
  auth: {
    isAuthenticated: loggedInUserFromStorage ? true : false,
    loggedInUser: loggedInUserFromStorage,
    loginError: null,
    loginLoading: false,
  },
  bag: {
    bagItems: bagItemsFromLocalStorage,
    subtotal: subtotal,
    shipping: shipping,
    tax: tax,
    total: total,
  },
  register: {
    registerError: null,
    registerLoading: false,
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
