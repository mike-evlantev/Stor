import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { availableShippingOptions } from "../../constants/shippingOptions";
import { IBagItem } from "../../types/IBagItem";
import { IShippingOption } from "../../types/IShippingOption";

const bagItemsFromLocalStorage = localStorage.getItem("bagItems")
    ? JSON.parse(localStorage.getItem("bagItems") as string)
    : [];

const calcSubtotal = (bagItems: IBagItem[]): number => bagItems.reduce((acc: number, item: IBagItem) => acc + item.quantity * item.price, 0);
const calcTax = (subtotal: number): number => subtotal * 0.0775; // CA tax rate
const calcTotal = (subtotal: number, shipping: number, tax: number): number => subtotal + shipping + tax;

const subtotal = bagItemsFromLocalStorage ? calcSubtotal(bagItemsFromLocalStorage) : 0;
const tax = calcTax(subtotal);
const total = calcTotal(subtotal, availableShippingOptions[0].cost ?? 0, tax);

interface BagState {
    bagItems: IBagItem[];
    subtotal: number;
    shipping: IShippingOption;
    tax: number;
    total: number;
}

const initialState: BagState = {
    bagItems: bagItemsFromLocalStorage ?? [],
    subtotal,
    shipping: availableShippingOptions[0],
    tax,
    total
}

export const bagSlice = createSlice({
    name: "bag",
    initialState,
    reducers: {
        addToBag: (state, action: PayloadAction<IBagItem>) => {
            let updatedBagItems: IBagItem[];
            const bagItem = action.payload;
            const existingItem = state.bagItems.some(i => i.id === bagItem.id); // id refers to productId
            if (existingItem) {
                updatedBagItems = state.bagItems.map((i) => i.id === bagItem.id ? bagItem : i);
                const updatedSubtotal = calcSubtotal(updatedBagItems);
                const updatedTax = calcTax(updatedSubtotal);
                state.bagItems = updatedBagItems;
                state.subtotal = updatedSubtotal;
                state.tax = updatedTax;
                state.total = calcTotal(updatedSubtotal, state.shipping.cost, updatedTax);
            } else {
                updatedBagItems = [...state.bagItems, bagItem];
                const updatedSubtotal = state.subtotal + bagItem.quantity * bagItem.price; // new items are added to existing subtotal
                const updatedTax = calcTax(updatedSubtotal);
                state.bagItems = updatedBagItems;
                state.subtotal = updatedSubtotal;
                state.tax = updatedTax;
                state.total = calcTotal(updatedSubtotal, state.shipping.cost, updatedTax);
            }

            localStorage.setItem("bagItems", JSON.stringify(updatedBagItems));
        },
        removeFromBag: (state, action: PayloadAction<IBagItem>) => {
            const bagItem = action.payload;
            const updatedBagItems = state.bagItems.filter((item) => item.id !== bagItem.id);
            const updatedSubtotal = state.subtotal - bagItem.quantity * bagItem.price; // removed items subtracted from existing subtotal
            const updatedTax = calcTax(updatedSubtotal);
            state.bagItems = updatedBagItems;
            state.subtotal = updatedSubtotal;
            state.tax = updatedTax;
            state.total = calcTotal(updatedSubtotal, state.shipping.cost, updatedTax);

            localStorage.setItem("bagItems", JSON.stringify(updatedBagItems));
        },
        updateShipping: (state, action: PayloadAction<IShippingOption>) => {
            state.shipping = action.payload;
            state.total = state.subtotal + action.payload.cost + state.tax;
        },
        clearBag: (state) => { state = initialState; }
    }
});

export const { addToBag, removeFromBag, updateShipping, clearBag } = bagSlice.actions;
export default bagSlice.reducer;