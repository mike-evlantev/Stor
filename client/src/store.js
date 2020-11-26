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
const initialState = {
  bag: {
    bagItems: bagItemsFromLocalStorage
  }
};
const middleware = [thunk];
const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;