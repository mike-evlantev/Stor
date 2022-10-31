import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICustomer, ICustomerErrors } from "../../types/ICustomer";

interface CustomerState extends ICustomer {}

const initialState: CustomerState = {
    errors: {
        first: "", 
        last: "", 
        shippingAddress: {address1: "", address2: "", city: "", state: "", zip: ""}, 
        billingAddress: {address1: "", address2: "", city: "", state: "", zip: ""},
        email: "", 
        phone: "",
        nameOnCard: ""
    },
    first: "",
    last: "",
    shippingAddress: {address1: "", address2: "", city: "", state: "", zip: ""},
    billingAddress: {address1: "", address2: "", city: "", state: "", zip: ""},
    phone: "",
    email: "",
    card: {
        number: {elementType: "cardNumber", brand: "unknown", empty: true, complete: false, error: undefined}, 
        expiry: {elementType: "cardExpiry", empty: true, complete: false, error: undefined}, 
        cvc: {elementType: "cardCvc", empty: true, complete: false, error: undefined},
        nameOnCard: "",
        paymentMethod: undefined,
    }
}

export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        resetCustomer: (state) => initialState,
        updateCustomer: (state, action: PayloadAction<Partial<ICustomer>>) => { 
            return {...state, ...action.payload}; 
        },
        updateCustomerErrors: (state, action: PayloadAction<Partial<ICustomerErrors>>) => {
            return { ...state, errors: {...state.errors, ...action.payload}};
        }
    }
});

export const { updateCustomer, updateCustomerErrors } = customerSlice.actions;
export default customerSlice.reducer;