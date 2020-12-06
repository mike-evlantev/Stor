import { BAG_ADD_ITEM, BAG_REMOVE_ITEM } from "../constants/bagConstants.js";

const initialState = {
  bagItems: [],
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
};

const calcTax = (subtotal) => subtotal * 0.0775; // CA tax rate

export const bagReducer = (state = initialState, action) => {
  switch (action.type) {
    case BAG_ADD_ITEM:
      const bagItem = action.payload;
      const existingItem = state.bagItems.find(
        (i) => i.product === bagItem.product
      ); // i.product refers to productId
      console.log(existingItem);
      if (existingItem) {
        const updatedBagItems = state.bagItems.map((i) =>
          i.product === existingItem.product ? bagItem : i
        );
        // recount the subtotal for existing item based on qty
        const updatedSubtotal = updatedBagItems.reduce(
          (acc, item) => acc + item.qty * item.price,
          0
        );
        const updatedTax = calcTax(updatedSubtotal);
        return {
          ...state,
          bagItems: updatedBagItems,
          subtotal: updatedSubtotal,
          tax: updatedTax,
          total: updatedSubtotal + state.shipping + updatedTax,
        };
      } else {
        const updatedBagItems = [...state.bagItems, bagItem];
        const updatedSubtotal = state.subtotal + bagItem.qty * bagItem.price; // new items are added to existing subtotal
        const updatedTax = calcTax(updatedSubtotal);
        return {
          ...state,
          bagItems: updatedBagItems,
          subtotal: updatedSubtotal,
          tax: updatedTax,
          total: updatedSubtotal + state.shipping + updatedTax,
        };
      }
    case BAG_REMOVE_ITEM:
      const updatedSubtotal =
        state.subtotal - action.payload.qty * action.payload.price; // removed items subtracted from existing subtotal
      const updatedTax = calcTax(updatedSubtotal);
      return {
        ...state,
        bagItems: state.bagItems.filter(
          (item) => item.product !== action.payload.product
        ),
        subtotal: updatedSubtotal,
        tax: updatedTax,
        total: updatedSubtotal + state.shipping + updatedTax,
      };
    default:
      return state;
  }
};
