import {BAG_ADD_ITEM} from '../constants/bagConstants.js';

export const bagReducer = (state = {bagItems: []}, action) => {
  switch (action.type) {
    case BAG_ADD_ITEM:
      const bagItem = action.payload;
      const existingItem = state.bagItems.find(i => i.product === bagItem.product) // i.product refers to productId
      if (existingItem) {
        return {...state, bagItems: state.bagItems.map(i => i.product === existingItem.product ? bagItem : i) };
      } else {
        return {...state, bagItems: [...state.bagItems, bagItem] };
      }
    default:
      return state;
  }
};