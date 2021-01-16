import {
  BAG_ADD_ITEM,
  BAG_REMOVE_ITEM,
  UPDATE_SHIPPING,
  BAG_ERROR,
  CLEAR_BAG,
} from "../constants/bagConstants.js";

const initialState = {
  loading: false,
  error: null,
  bagItems: [],
  subtotal: 0,
  shipping: {},
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
          total: updatedSubtotal + state.shipping.cost + updatedTax,
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
          total: updatedSubtotal + state.shipping.cost + updatedTax,
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
        total: updatedSubtotal + state.shipping.cost + updatedTax,
      };
    case UPDATE_SHIPPING:
      return {
        ...state,
        shipping: action.payload,
        total: state.subtotal + action.payload.cost + state.tax,
      };
    case CLEAR_BAG:
      return {
        ...state,
        bagItems: [],
        subtotal: 0,
        shipping: { cost: 0 }, // shipping.cost is referenced in Checkout.js
        tax: 0,
        total: 0,
      };
    case BAG_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
