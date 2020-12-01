import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {productListReducer, productDetailsReducer} from './reducers/productReducers.js';
import {bagReducer} from './reducers/bagReducers.js';

const reducer = combineReducers({
  bag: bagReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer
});
const bagItemsFromLocalStorage = 
  localStorage.getItem('bagItems')
    ? JSON.parse(localStorage.getItem('bagItems'))
    : [];
const subtotal = bagItemsFromLocalStorage.reduce((acc, item) => acc + (item.qty * item.price), 0);
const shipping = 0;
const tax = 0;
const total = subtotal + shipping + tax;

const initialState = {
  bag: {
    bagItems: bagItemsFromLocalStorage,
    subtotal: subtotal,
    shipping: shipping,
    tax: tax,
    total: total
  }
};
const middleware = [thunk];
const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;